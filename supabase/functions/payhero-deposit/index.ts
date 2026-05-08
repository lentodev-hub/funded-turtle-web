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

    const external_reference = `dep_${user.id.slice(0, 8)}_${Date.now()}`;
    const callback_url = `${Deno.env.get("SUPABASE_URL")}/functions/v1/payhero-callback`;

    // Insert pending transaction
    const { error: txErr } = await supabase.from("transactions").insert({
      user_id: user.id,
      type: "deposit",
      amount,
      phone_number,
      external_reference,
      status: "pending",
    });
    if (txErr) return json({ error: txErr.message }, 500);

    const username = Deno.env.get("PAYHERO_USERNAME")!;
    const password = Deno.env.get("PAYHERO_PASSWORD")!;
    const basic = btoa(`${username}:${password}`);

    const phRes = await fetch("https://api.payhero.africa/api/v2/payments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${basic}`,
      },
      body: JSON.stringify({
        amount,
        phone_number,
        provider: "m-pesa",
        network_code: "63902",
        channel_id: Number(Deno.env.get("PAYHERO_CHANNEL_ID")),
        account_id: Deno.env.get("PAYHERO_ACCOUNT_ID"),
        external_reference,
        callback_url,
      }),
    });
    const phData = await phRes.json();
    console.log("PayHero deposit response:", phData);

    if (!phRes.ok) {
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
    console.error("deposit error", e);
    return json({ error: e instanceof Error ? e.message : "Unknown" }, 500);
  }
});

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
