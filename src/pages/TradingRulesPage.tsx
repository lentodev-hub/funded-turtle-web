import PageHeader from "@/components/PageHeader";
import CTA from "@/components/CTA";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck, AlertTriangle, Clock, TrendingDown, Newspaper, Layers } from "lucide-react";

const rules = [
  { icon: TrendingDown, title: "Maximum Daily Loss", desc: "5% of the initial account balance. Calculated at 00:00 server time." },
  { icon: ShieldCheck, title: "Maximum Overall Loss", desc: "10% of the initial account balance — a hard equity floor that never moves." },
  { icon: Clock, title: "No Minimum Trading Days", desc: "Hit your profit target whenever you're ready. There's no clock." },
  { icon: Newspaper, title: "News & Weekend Trading", desc: "Allowed on every plan. Trade NFP, CPI and hold over the weekend freely." },
  { icon: Layers, title: "EAs & Copy Trading", desc: "Expert Advisors are welcome. Copy trading allowed between your own accounts." },
  { icon: AlertTriangle, title: "Prohibited Strategies", desc: "No latency arbitrage, no tick scalping abuse, no hedging across accounts." },
];

const TradingRulesPage = () => (
  <>
    <PageHeader
      eyebrow="Trading rules"
      title="Simple rules. Serious capital."
      description="Clear, fair and trader-first. Everything you need to know to keep your funded account in good standing."
    />
    <section className="py-20 bg-background">
      <div className="container grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rules.map((r) => (
          <Card key={r.title} className="bg-gradient-card border-border shadow-soft hover:shadow-elegant transition-all">
            <CardHeader>
              <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center text-primary-foreground shadow-elegant mb-3">
                <r.icon className="w-6 h-6" />
              </div>
              <CardTitle className="text-xl font-display">{r.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">{r.desc}</CardContent>
          </Card>
        ))}
      </div>
    </section>
    <CTA />
  </>
);

export default TradingRulesPage;
