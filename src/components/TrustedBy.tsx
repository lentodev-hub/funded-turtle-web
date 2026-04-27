const logos = [
  "MetaTrader 5",
  "MT4",
  "cTrader",
  "TradeLocker",
  "TradingView",
  "Trustpilot",
];

const TrustedBy = () => (
  <section className="py-12 bg-background border-y border-border">
    <div className="container">
      <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-8">
        Trusted platforms & integrations
      </p>
      <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5 opacity-70">
        {logos.map((l) => (
          <div
            key={l}
            className="font-display font-bold text-lg md:text-xl text-foreground/60 hover:text-foreground transition-colors"
          >
            {l}
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default TrustedBy;
