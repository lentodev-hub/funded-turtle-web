import { Check, X } from "lucide-react";

const rows = [
  { label: "Profit split up to 90%", us: true, them: false },
  { label: "Same-day payouts", us: true, them: false },
  { label: "No minimum trading days", us: true, them: false },
  { label: "Refundable challenge fee", us: true, them: false },
  { label: "Weekend & news trading", us: true, them: true },
  { label: "Hidden consistency rules", us: false, them: true },
];

const Comparison = () => (
  <section className="py-24 bg-background">
    <div className="container">
      <div className="max-w-2xl mx-auto text-center mb-14">
        <p className="text-sm font-semibold text-primary uppercase tracking-wider">The difference</p>
        <h2 className="mt-3 font-display font-bold text-4xl md:text-5xl">
          Why traders pick <span className="text-gradient-primary">Funded Turtle</span>
        </h2>
      </div>

      <div className="max-w-3xl mx-auto rounded-2xl border border-border bg-gradient-card shadow-elegant overflow-hidden">
        <div className="grid grid-cols-3 bg-secondary/60 text-sm font-semibold">
          <div className="p-4 md:p-5">Feature</div>
          <div className="p-4 md:p-5 text-center text-primary">Funded Turtle</div>
          <div className="p-4 md:p-5 text-center text-muted-foreground">Other firms</div>
        </div>
        {rows.map((r, i) => (
          <div
            key={r.label}
            className={`grid grid-cols-3 items-center text-sm ${
              i % 2 === 0 ? "bg-background/40" : ""
            }`}
          >
            <div className="p-4 md:p-5 font-medium">{r.label}</div>
            <div className="p-4 md:p-5 flex justify-center">
              {r.us ? (
                <Check className="w-5 h-5 text-primary" />
              ) : (
                <X className="w-5 h-5 text-destructive/70" />
              )}
            </div>
            <div className="p-4 md:p-5 flex justify-center">
              {r.them ? (
                <Check className="w-5 h-5 text-muted-foreground" />
              ) : (
                <X className="w-5 h-5 text-destructive/70" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Comparison;
