import PageHeader from "@/components/PageHeader";
import CTA from "@/components/CTA";

const phases = [
  {
    name: "Phase 1 — Challenge",
    rows: [
      ["Profit target", "8%"],
      ["Max daily loss", "5%"],
      ["Max overall loss", "10%"],
      ["Minimum trading days", "None"],
      ["Time limit", "Unlimited"],
    ],
  },
  {
    name: "Phase 2 — Verification",
    rows: [
      ["Profit target", "5%"],
      ["Max daily loss", "5%"],
      ["Max overall loss", "10%"],
      ["Minimum trading days", "None"],
      ["Time limit", "Unlimited"],
    ],
  },
  {
    name: "Funded Turtle Account",
    rows: [
      ["Profit target", "—"],
      ["Max daily loss", "5%"],
      ["Max overall loss", "10%"],
      ["Profit split", "Up to 90%"],
      ["Payout cycle", "On-demand (24h)"],
    ],
  },
];

const TradingObjectivesPage = () => (
  <>
    <PageHeader
      eyebrow="Trading objectives"
      title="What it takes to get funded"
      description="A straightforward two-phase evaluation. Same rules across both phases — no surprises."
    />
    <section className="py-20 bg-background">
      <div className="container grid md:grid-cols-3 gap-6">
        {phases.map((p) => (
          <div key={p.name} className="rounded-2xl border border-border bg-gradient-card shadow-soft overflow-hidden">
            <div className="p-5 bg-secondary/60 font-display font-bold">{p.name}</div>
            <div className="divide-y divide-border">
              {p.rows.map(([k, v]) => (
                <div key={k} className="flex justify-between p-4 text-sm">
                  <span className="text-muted-foreground">{k}</span>
                  <span className="font-semibold">{v}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
    <CTA />
  </>
);

export default TradingObjectivesPage;
