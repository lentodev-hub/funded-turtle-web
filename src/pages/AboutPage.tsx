import PageHeader from "@/components/PageHeader";
import CTA from "@/components/CTA";
import { Users, Globe2, Trophy, Heart } from "lucide-react";

const stats = [
  { icon: Users, label: "Funded traders", value: "12,000+" },
  { icon: Globe2, label: "Countries served", value: "170" },
  { icon: Trophy, label: "Total payouts", value: "$48M+" },
  { icon: Heart, label: "Trader NPS", value: "72" },
];

const AboutPage = () => (
  <>
    <PageHeader
      eyebrow="About us"
      title="Built by traders, for traders"
      description="Funded Ox was founded on one belief: patient, disciplined trading deserves serious capital and a partner that pays out, fast."
    />
    <section className="py-20 bg-background">
      <div className="container max-w-4xl space-y-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="p-6 rounded-xl bg-gradient-card border border-border text-center">
              <s.icon className="w-7 h-7 mx-auto text-primary" />
              <div className="mt-3 font-display font-extrabold text-3xl text-gradient-primary">{s.value}</div>
              <div className="text-sm text-muted-foreground mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="prose prose-invert max-w-none">
          <h2 className="font-display text-3xl font-bold">Our mission</h2>
          <p className="text-muted-foreground">
            We exist to remove the biggest barrier in trading — capital. Talented traders shouldn't have to risk
            their life savings to prove themselves. Pass a fair evaluation, get funded, keep up to 70% of what you make.
          </p>
          <h2 className="font-display text-3xl font-bold mt-10">Our values</h2>
          <ul className="text-muted-foreground space-y-2">
            <li>• <strong className="text-foreground">Transparency</strong> — clear rules, no hidden gotchas.</li>
            <li>• <strong className="text-foreground">Speed</strong> — payouts processed within 24 hours.</li>
            <li>• <strong className="text-foreground">Trader-first</strong> — every product decision starts with the trader's experience.</li>
          </ul>
        </div>
      </div>
    </section>
    <CTA />
  </>
);

export default AboutPage;
