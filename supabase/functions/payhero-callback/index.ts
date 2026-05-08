import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// PayHero callback handler — public (no JWT). Verifies API secret if provided.
Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const payload = await req.json();
    console.log("PayHero callback payload:", JSON.stringify(payload));

    // PayHero may wrap data in { response: {...} } or send flat
    const r = payload.response ?? payload;
    const external_reference: string | undefined =
      r.ExternalReference ?? r.external_reference ?? payload.external_reference;
    const status_raw: string = String(r.Status ?? r.status ?? "").toLowerCase();
    const provider_reference: string | undefined =
      r.MpesaReceiptNumber ?? r.provider_reference ?? r.receipt;
    const payhero_reference: string | undefined = r.CheckoutRequestID ?? r.reference;
    const failure_reason: string | undefined = r.ResultDesc ?? r.failure_reason;

    if (!external_reference) return json({ error: "Missing external_reference" }, 400);

    const { data: tx } = await supabase
      .from("transactions")
      .select("*")
      .eq("external_reference", external_reference)
      .maybeSingle();
    if (!tx) return json({ error: "Transaction not found" }, 404);
    if (tx.status !== "pending") return json({ ok: true, note: "already finalized" });

    const success = ["success", "completed", "paid", "successful"].includes(status_raw) ||
      Number(r.ResultCode) === 0;

    if (success) {
      await supabase.from("transactions").update({
        status: "success",
        provider_reference: provider_reference ?? null,
        payhero_reference: payhero_reference ?? tx.payhero_reference,
      }).eq("external_reference", external_reference);

      if (tx.type === "deposit") {
        const { data: w } = await supabase.from("wallets")
          .select("balance").eq("user_id", tx.user_id).maybeSingle();
        const newBal = Number(w?.balance ?? 0) + Number(tx.amount);
        await supabase.from("wallets").upsert({
          user_id: tx.user_id, balance: newBal,
        }, { onConflict: "user_id" });
      }
      // For withdrawals: balance was already deducted at initiation.
    } else {
      await supabase.from("transactions").update({
        status: "failed",
        failure_reason: failure_reason ?? "Provider reported failure",
        payhero_reference: payhero_reference ?? tx.payhero_reference,
      }).eq("external_reference", external_reference);

      // Refund withdrawal
      if (tx.type === "withdrawal") {
        const { data: w } = await supabase.from("wallets")
          .select("balance").eq("user_id", tx.user_id).maybeSingle();
        const newBal = Number(w?.balance ?? 0) + Number(tx.amount);
        await supabase.from("wallets").upsert({
          user_id: tx.user_id, balance: newBal,
        }, { onConflict: "user_id" });
      }
    }

    return json({ ok: true });
  } catch (e) {
    console.error("callback error", e);
    return json({ error: e instanceof Error ? e.message : "Unknown" }, 500);
  }
});

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
