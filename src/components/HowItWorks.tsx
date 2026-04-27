const steps = [
  { n: "01", title: "Choose your shell", desc: "Pick a challenge size from $10K to $200K. One-time fee, refunded on first payout." },
  { n: "02", title: "Hit the target", desc: "Reach 8% profit while respecting the 5% daily / 10% max drawdown. No time limit." },
  { n: "03", title: "Get funded", desc: "Trade a live-simulated account. Withdraw up to 90% of profits — same day." },
];

const HowItWorks = () => (
  <section id="how" className="py-24 bg-background relative overflow-hidden">
    <div className="absolute -top-40 -right-40 w-96 h-96 bg-glow opacity-50" aria-hidden />
    <div className="container relative">
      <div className="max-w-2xl mx-auto text-center mb-16">
        <p className="text-sm font-semibold text-primary uppercase tracking-wider">How it works</p>
        <h2 className="mt-3 font-display font-bold text-4xl md:text-5xl">Three steps to a funded account</h2>
      </div>
      <div className="grid md:grid-cols-3 gap-8 relative">
        {steps.map((s, i) => (
          <div key={s.n} className="relative p-8 rounded-2xl bg-gradient-card border border-border shadow-soft">
            <div className="text-6xl font-display font-extrabold text-gradient-primary opacity-90">{s.n}</div>
            <h3 className="mt-3 font-display font-bold text-2xl">{s.title}</h3>
            <p className="mt-3 text-muted-foreground">{s.desc}</p>
            {i < steps.length - 1 && (
              <div className="hidden md:block absolute top-1/2 -right-4 text-3xl text-primary/40">→</div>
            )}
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks;
