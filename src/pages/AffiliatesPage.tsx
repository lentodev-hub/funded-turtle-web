import PageHeader from "@/components/PageHeader";
import CTA from "@/components/CTA";
import { DollarSign, Users, BarChart3, Gift } from "lucide-react";

const perks = [
  { icon: DollarSign, title: "Up to 20% commission", desc: "On every challenge fee from referrals — recurring on retries." },
  { icon: Users, title: "Lifetime attribution", desc: "Once a trader is yours, every future purchase counts." },
  { icon: BarChart3, title: "Real-time dashboard", desc: "Track clicks, conversions and earnings live." },
  { icon: Gift, title: "Exclusive promo codes", desc: "Custom discount codes for your audience to drive higher conversion." },
];

const tiers = [
  { name: "Starter", refs: "1 – 10 / mo", rate: "10%" },
  { name: "Growth", refs: "11 – 50 / mo", rate: "15%" },
  { name: "Elite", refs: "50+ / mo", rate: "20%" },
];

const AffiliatesPage = () => (
  <>
    <PageHeader
      eyebrow="Affiliates"
      title="Earn with every funded trader you refer"
      description="Join 800+ creators, educators and communities monetizing their audience with Funded Turtle."
    />
    <section className="py-20 bg-background">
      <div className="container max-w-5xl">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {perks.map((p) => (
            <div key={p.title} className="p-6 rounded-xl bg-gradient-card border border-border">
              <div className="w-11 h-11 rounded-lg bg-gradient-primary flex items-center justify-center text-primary-foreground mb-3">
                <p.icon className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold">{p.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{p.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 rounded-2xl border border-border bg-gradient-card shadow-elegant overflow-hidden">
          <div className="grid grid-cols-3 bg-secondary/60 text-sm font-semibold">
            <div className="p-5">Tier</div>
            <div className="p-5">Referrals / month</div>
            <div className="p-5 text-right">Commission</div>
          </div>
          {tiers.map((t, i) => (
            <div key={t.name} className={`grid grid-cols-3 items-center text-sm ${i % 2 === 0 ? "bg-background/40" : ""}`}>
              <div className="p-5 font-medium">{t.name}</div>
              <div className="p-5 text-muted-foreground">{t.refs}</div>
              <div className="p-5 text-right text-primary font-semibold">{t.rate}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
    <CTA />
  </>
);

export default AffiliatesPage;
