import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Wallet as WalletIcon, ArrowDownToLine, ArrowUpFromLine } from "lucide-react";

type Tx = {
  id: string;
  type: string;
  amount: number;
  phone_number: string;
  status: string;
  provider_reference: string | null;
  failure_reason: string | null;
  created_at: string;
};

const WalletPage = () => {
  const { user, loading } = useAuth();
  const [balance, setBalance] = useState<number>(0);
  const [currency, setCurrency] = useState("KES");
  const [txs, setTxs] = useState<Tx[]>([]);
  const [amount, setAmount] = useState("");
  const [phone, setPhone] = useState("");
  const [busy, setBusy] = useState<"" | "deposit" | "withdraw">("");

  const loadData = async () => {
    if (!user) return;
    const { data: w } = await supabase
      .from("wallets").select("balance,currency").eq("user_id", user.id).maybeSingle();
    if (w) { setBalance(Number(w.balance)); setCurrency(w.currency); }
    const { data: t } = await supabase
      .from("transactions").select("*")
      .eq("user_id", user.id).order("created_at", { ascending: false }).limit(20);
    setTxs((t ?? []) as Tx[]);
  };

  useEffect(() => { loadData(); }, [user]);

  // Realtime updates on transactions + wallet
  useEffect(() => {
    if (!user) return;
    const ch = supabase
      .channel(`wallet-${user.id}`)
      .on("postgres_changes", { event: "*", schema: "public", table: "transactions", filter: `user_id=eq.${user.id}` }, loadData)
      .on("postgres_changes", { event: "*", schema: "public", table: "wallets", filter: `user_id=eq.${user.id}` }, loadData)
      .subscribe();
    return () => { supabase.removeChannel(ch); };
  }, [user]);

  if (loading) return null;
  if (!user) return <Navigate to="/login?next=/wallet" replace />;

  const callFn = async (name: "payhero-deposit" | "payhero-withdraw") => {
    const amt = Number(amount);
    if (!amt || amt <= 0) return toast.error("Enter a valid amount");
    if (!/^\d{9,15}$/.test(phone)) return toast.error("Enter phone in international format e.g. 2547XXXXXXXX");
    setBusy(name === "payhero-deposit" ? "deposit" : "withdraw");
    try {
      const { data, error } = await supabase.functions.invoke(name, {
        body: { amount: amt, phone_number: phone },
      });
      if (error) throw error;
      if ((data as any)?.error) throw new Error((data as any).error);
      toast.success(name === "payhero-deposit" ? "STK push sent. Check your phone." : "Withdrawal initiated.");
      setAmount("");
      loadData();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Request failed");
    } finally {
      setBusy("");
    }
  };

  return (
    <section className="min-h-screen bg-hero text-white px-4 py-24">
      <div className="max-w-3xl mx-auto">
        <div className="bg-card text-card-foreground rounded-2xl p-6 shadow-elegant">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary/15 flex items-center justify-center">
              <WalletIcon className="w-6 h-6 text-primary" />
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Wallet balance</div>
              <div className="font-display font-extrabold text-3xl">
                {currency} {balance.toLocaleString()}
              </div>
            </div>
          </div>

          <div className="mt-6 grid sm:grid-cols-2 gap-4">
            <div>
              <Label>Amount ({currency})</Label>
              <Input type="number" min="1" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="100" />
            </div>
            <div>
              <Label>M-Pesa phone</Label>
              <Input value={phone} onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))} placeholder="2547XXXXXXXX" />
            </div>
          </div>

          <div className="mt-4 grid sm:grid-cols-2 gap-3">
            <Button onClick={() => callFn("payhero-deposit")} disabled={!!busy} variant="hero">
              <ArrowDownToLine className="w-4 h-4 mr-2" />
              {busy === "deposit" ? "Sending..." : "Deposit (STK Push)"}
            </Button>
            <Button onClick={() => callFn("payhero-withdraw")} disabled={!!busy} variant="outline">
              <ArrowUpFromLine className="w-4 h-4 mr-2" />
              {busy === "withdraw" ? "Sending..." : "Withdraw to M-Pesa"}
            </Button>
          </div>
        </div>

        <div className="bg-card text-card-foreground rounded-2xl p-6 shadow-elegant mt-6">
          <h2 className="font-display font-bold text-xl mb-4">Recent transactions</h2>
          {txs.length === 0 ? (
            <p className="text-sm text-muted-foreground">No transactions yet.</p>
          ) : (
            <div className="divide-y divide-border">
              {txs.map((t) => (
                <div key={t.id} className="py-3 flex justify-between items-start gap-4 text-sm">
                  <div>
                    <div className="font-semibold capitalize">{t.type} • {currency} {Number(t.amount).toLocaleString()}</div>
                    <div className="text-muted-foreground text-xs">
                      {new Date(t.created_at).toLocaleString()} • {t.phone_number}
                    </div>
                    {t.provider_reference && (
                      <div className="text-xs text-muted-foreground">Receipt: {t.provider_reference}</div>
                    )}
                    {t.failure_reason && (
                      <div className="text-xs text-destructive">{t.failure_reason}</div>
                    )}
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    t.status === "success" ? "bg-primary/15 text-primary" :
                    t.status === "failed" ? "bg-destructive/15 text-destructive" :
                    "bg-secondary text-foreground"
                  }`}>
                    {t.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default WalletPage;
