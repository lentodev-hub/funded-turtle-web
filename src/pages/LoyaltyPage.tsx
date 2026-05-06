import PageHeader from "@/components/PageHeader";
import CTA from "@/components/CTA";
import ReferralTracker from "@/components/ReferralTracker";
import { Gift, Users, RefreshCw, ShieldCheck, Trophy, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const steps = [
  {
    icon: Users,
    title: "Refer 2 traders",
    desc: "Share your unique referral link with friends or your audience.",
  },
  {
    icon: ShieldCheck,
    title: "They pass a challenge",
    desc: "Both referrals must successfully purchase and pass an evaluation.",
  },
  {
    icon: RefreshCw,
    title: "You unlock a free retry",
    desc: "If you ever fail your funded account, claim 1 free retry of the same plan.",
  },
];

const perks = [
  { icon: Gift, title: "1 Free Retry", desc: "Same account size as the one you failed — on us." },
  { icon: Trophy, title: "Stackable Rewards", desc: "Every 2 successful referrals = +1 free retry credit." },
  { icon: Sparkles, title: "Lifetime Credits", desc: "Retry credits never expire. Use them whenever you need." },
];

const LoyaltyPage = () => (
  <>
    <PageHeader
      eyebrow="Loyalty Program"
      title="Refer 2 friends. Get a free retry on us."
      description="Our way of saying thanks. Every two successful referrals unlocks a free retry of the funded account you bought — perfect insurance if you ever fail."
    />

    <ReferralTracker />

    <section className="py-20 bg-background">
      <div className="container max-w-5xl">
        <div className="grid md:grid-cols-3 gap-5">
          {steps.map((s, i) => (
            <div key={s.title} className="relative p-6 rounded-2xl bg-gradient-card border border-border hover-lift">
              <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-gradient-gold text-accent-foreground font-bold text-sm flex items-center justify-center shadow-gold">
                {i + 1}
              </div>
              <div className="w-11 h-11 rounded-lg bg-gradient-primary flex items-center justify-center text-primary-foreground mb-3">
                <s.icon className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold">{s.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{s.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-5">
          {perks.map((p) => (
            <div key={p.title} className="p-6 rounded-xl border border-border bg-secondary/30">
              <p.icon className="w-6 h-6 text-primary mb-3" />
              <h4 className="font-semibold">{p.title}</h4>
              <p className="text-sm text-muted-foreground mt-1">{p.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 rounded-2xl border border-border bg-gradient-card p-8 md:p-10 shadow-elegant text-center">
          <h3 className="font-display text-2xl md:text-3xl font-bold">Ready to start earning retries?</h3>
          <p className="text-muted-foreground mt-2 max-w-xl mx-auto">
            Sign in to grab your unique referral link and track every successful referral in real time.
          </p>
          <div className="flex flex-wrap gap-3 justify-center mt-6">
            <Link to="/signup"><Button variant="hero" size="lg">Get my referral link</Button></Link>
            <Link to="/affiliates"><Button variant="outline" size="lg">See affiliate program</Button></Link>
          </div>
        </div>

        <div className="mt-12 text-xs text-muted-foreground text-center max-w-2xl mx-auto">
          A "successful referral" is defined as a new user who purchases and passes a challenge evaluation. Free retry is granted for the same plan/account size you originally purchased and is non-transferable. Funded Turtle reserves the right to update program terms.
        </div>
      </div>
    </section>

    <CTA />
  </>
);

export default LoyaltyPage;
