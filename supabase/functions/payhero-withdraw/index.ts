import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) return json({ error: "Unauthorized" }, 401);

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );
    const { data: userData } = await supabase.auth.getUser(authHeader.replace("Bearer ", ""));
    const user = userData.user;
    if (!user) return json({ error: "Unauthorized" }, 401);

    const body = await req.json();
    const amount = Number(body.amount);
    const phone_number = String(body.phone_number || "").trim();
    if (!amount || amount <= 0) return json({ error: "Invalid amount" }, 400);
    if (!/^\d{9,15}$/.test(phone_number)) return json({ error: "Invalid phone" }, 400);

    // Check wallet balance
    const { data: wallet } = await supabase
      .from("wallets").select("balance").eq("user_id", user.id).maybeSingle();
    if (!wallet || Number(wallet.balance) < amount) {
      return json({ error: "Insufficient balance" }, 400);
    }

    const external_reference = `wd_${user.id.slice(0, 8)}_${Date.now()}`;
    const callback_url = `${Deno.env.get("SUPABASE_URL")}/functions/v1/payhero-callback`;

    // Reserve funds: deduct now, refund on failure
    const { error: balErr } = await supabase
      .from("wallets")
      .update({ balance: Number(wallet.balance) - amount })
      .eq("user_id", user.id);
    if (balErr) return json({ error: balErr.message }, 500);

    const { error: txErr } = await supabase.from("transactions").insert({
      user_id: user.id,
      type: "withdrawal",
      amount,
      phone_number,
      external_reference,
      status: "pending",
    });
    if (txErr) {
      // refund
      await supabase.from("wallets")
        .update({ balance: Number(wallet.balance) }).eq("user_id", user.id);
      return json({ error: txErr.message }, 500);
    }

    const username = Deno.env.get("PAYHERO_USERNAME")!;
    const password = Deno.env.get("PAYHERO_PASSWORD")!;
    const basic = btoa(`${username}:${password}`);

    const phRes = await fetch("https://backend.payhero.co.ke/api/v2/withdraw", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${basic}`,
      },
      body: JSON.stringify({
        external_reference,
        account_id: Deno.env.get("PAYHERO_ACCOUNT_ID"),
        channel_id: Number(Deno.env.get("PAYHERO_CHANNEL_ID")),
        amount,
        phone_number,
        network_code: "63902",
        channel: "mobile",
        callback_url,
      }),
    });
    const phData = await phRes.json();
    console.log("PayHero withdraw response:", phData);

    if (!phRes.ok) {
      // refund on immediate failure
      await supabase.from("wallets")
        .update({ balance: Number(wallet.balance) }).eq("user_id", user.id);
      await supabase.from("transactions")
        .update({ status: "failed", failure_reason: JSON.stringify(phData) })
        .eq("external_reference", external_reference);
      return json({ error: "PayHero error", details: phData }, 400);
    }

    if (phData.reference) {
      await supabase.from("transactions")
        .update({ payhero_reference: phData.reference })
        .eq("external_reference", external_reference);
    }

    return json({ success: true, external_reference, payhero: phData });
  } catch (e) {
    console.error("withdraw error", e);
    return json({ error: e instanceof Error ? e.message : "Unknown" }, 500);
  }
});

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
