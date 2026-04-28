import PageHeader from "@/components/PageHeader";
import CTA from "@/components/CTA";
import { Check } from "lucide-react";

const tiers = [
  { size: "$10K → $25K", trigger: "10% profit in 4 months (2 payouts)", split: "80%" },
  { size: "$25K → $50K", trigger: "10% profit in 4 months (2 payouts)", split: "85%" },
  { size: "$50K → $100K", trigger: "10% profit in 4 months (2 payouts)", split: "85%" },
  { size: "$100K → $200K", trigger: "10% profit in 4 months (2 payouts)", split: "90%" },
  { size: "$200K → $500K", trigger: "Performance review", split: "90%" },
  { size: "$500K → $2M", trigger: "Performance review", split: "90%" },
];

const ScalingPlanPage = () => (
  <>
    <PageHeader
      eyebrow="Scaling plan"
      title="Grow your account up to $2,000,000"
      description="Consistency is rewarded. Hit your scaling targets and we double your buying power — automatically."
    />
    <section className="py-20 bg-background">
      <div className="container max-w-4xl">
        <div className="rounded-2xl border border-border bg-gradient-card shadow-elegant overflow-hidden">
          <div className="grid grid-cols-3 bg-secondary/60 text-sm font-semibold">
            <div className="p-5">Account size</div>
            <div className="p-5">Trigger</div>
            <div className="p-5 text-right">Profit split</div>
          </div>
          {tiers.map((t, i) => (
            <div key={t.size} className={`grid grid-cols-3 items-center text-sm ${i % 2 === 0 ? "bg-background/40" : ""}`}>
              <div className="p-5 font-medium">{t.size}</div>
              <div className="p-5 text-muted-foreground">{t.trigger}</div>
              <div className="p-5 text-right text-primary font-semibold">{t.split}</div>
            </div>
          ))}
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {[
            "Automatic upgrades — no application required",
            "Drawdown limits scale with the account",
            "Keep all profits earned along the way",
          ].map((b) => (
            <div key={b} className="p-6 rounded-xl bg-gradient-card border border-border flex gap-3">
              <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <p className="text-sm">{b}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
    <CTA />
  </>
);

export default ScalingPlanPage;
