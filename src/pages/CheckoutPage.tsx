import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { challenges } from "@/config/whiteLabel";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Check, CreditCard, Lock, ShieldCheck } from "lucide-react";

const parsePrice = (p: string) => Number(p.replace(/[^0-9.]/g, ""));
const parseSize = (s: string) => Number(s.replace(/[^0-9.]/g, "")) * 1000;

const CheckoutPage = () => {
  const { user, loading: authLoading } = useAuth();
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const planId = params.get("plan") ?? "snapper";
  const plan = challenges.find((c) => c.id === planId) ?? challenges[1];

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate(`/login?next=${encodeURIComponent(`/checkout?plan=${planId}`)}`, { replace: true });
    }
  }, [user, authLoading, navigate, planId]);

  if (authLoading) return null;
  if (!user) return null;

  const handlePay = async () => {
    setSubmitting(true);
    try {
      const { error } = await supabase.from("challenge_purchases").insert({
        user_id: user.id,
        plan_name: plan.size + " " + plan.id,
        account_size: parseSize(plan.size),
        amount_paid: parsePrice(plan.price),
        currency: "USD",
        status: "active",
      });
      if (error) throw error;
      setSuccess(true);
      toast.success("Challenge purchased! Welcome to the pod 🐂");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Payment failed");
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <section className="min-h-screen bg-hero text-white flex items-center justify-center px-4 py-24">
        <div className="bg-card text-card-foreground rounded-2xl p-10 max-w-md w-full text-center shadow-elegant">
          <div className="w-16 h-16 mx-auto rounded-full bg-primary/15 flex items-center justify-center">
            <Check className="w-8 h-8 text-primary" />
          </div>
          <h1 className="font-display font-bold text-2xl mt-4">You're in!</h1>
          <p className="text-muted-foreground mt-2">
            Your {plan.size} challenge is now active. Check your dashboard for trading credentials.
          </p>
          <div className="mt-6 flex flex-col gap-2">
            <Link to="/"><Button variant="hero" className="w-full">Back to home</Button></Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-hero text-white px-4 py-24">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="font-display font-extrabold text-4xl">Complete your challenge</h1>
          <p className="text-white/70 mt-2">Secure checkout • Instant account access</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-card text-card-foreground rounded-2xl p-6 shadow-elegant">
            <h2 className="font-display font-bold text-xl">Order summary</h2>
            <div className="mt-4 p-4 rounded-xl bg-secondary/40">
              <div className="text-sm text-muted-foreground uppercase tracking-wider">{plan.size} Account</div>
              <div className="font-display font-extrabold text-3xl mt-1">{plan.price}</div>
              <ul className="mt-4 space-y-2 text-sm">
                <li className="flex gap-2"><Check className="w-4 h-4 mt-0.5 text-primary" /> Profit target {plan.profitTarget}</li>
                <li className="flex gap-2"><Check className="w-4 h-4 mt-0.5 text-primary" /> Max daily loss {plan.maxDailyLoss}</li>
                <li className="flex gap-2"><Check className="w-4 h-4 mt-0.5 text-primary" /> Max loss {plan.maxLoss}</li>
                <li className="flex gap-2"><Check className="w-4 h-4 mt-0.5 text-primary" /> {plan.profitSplit} profit split</li>
                <li className="flex gap-2"><Check className="w-4 h-4 mt-0.5 text-primary" /> No time limit</li>
              </ul>
            </div>
            <div className="mt-4 flex justify-between font-semibold">
              <span>Total</span><span>{plan.price}</span>
            </div>
          </div>

          <div className="bg-card text-card-foreground rounded-2xl p-6 shadow-elegant">
            <h2 className="font-display font-bold text-xl flex items-center gap-2">
              <CreditCard className="w-5 h-5" /> Payment
            </h2>
            <p className="text-sm text-muted-foreground mt-2">
              Logged in as <span className="font-medium text-foreground">{user.email}</span>
            </p>

            <div className="mt-5 p-4 rounded-xl border border-dashed border-border bg-secondary/30 text-sm text-muted-foreground">
              <div className="flex items-center gap-2 text-foreground font-medium">
                <Lock className="w-4 h-4" /> Demo checkout
              </div>
              Real Stripe payments can be enabled by your admin. Clicking pay will activate this challenge instantly for testing.
            </div>

            <Button variant="hero" size="lg" className="w-full mt-5" onClick={handlePay} disabled={submitting}>
              {submitting ? "Processing..." : `Pay ${plan.price}`}
            </Button>

            <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="w-4 h-4 text-primary" /> Secured & encrypted • Refundable on first payout
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CheckoutPage;
