import { Zap, Shield, TrendingUp, Wallet, Clock, Globe } from "lucide-react";

const features = [
  { icon: Zap, title: "Lightning execution", desc: "Sub-30ms order routing on every major asset class." },
  { icon: Shield, title: "Trader-friendly rules", desc: "No minimum trading days. No restrictive lot caps." },
  { icon: TrendingUp, title: "Up to 90% profit split", desc: "Keep more of what you make. Scale to $2M total allocation." },
  { icon: Wallet, title: "Same-day payouts", desc: "Withdraw via crypto or wire — processed in under 24 hours." },
  { icon: Clock, title: "Instant funding", desc: "Skip the challenge with our Express plans and trade today." },
  { icon: Globe, title: "Trade anywhere", desc: "MT4, MT5, cTrader & TradeLocker — desktop, web, mobile." },
];

const Features = () => (
  <section id="features" className="py-24 bg-secondary/40">
    <div className="container">
      <div className="max-w-2xl mx-auto text-center mb-16">
        <p className="text-sm font-semibold text-primary uppercase tracking-wider">Why Funded Turtle</p>
        <h2 className="mt-3 font-display font-bold text-4xl md:text-5xl">Built for traders who play the long game</h2>
        <p className="mt-4 text-muted-foreground text-lg">Patience pays. Our rules, payouts and platform are designed to reward disciplined, consistent trading.</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((f) => (
          <div key={f.title} className="group p-8 rounded-2xl bg-gradient-card border border-border shadow-soft hover:shadow-elegant hover:-translate-y-1 transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center text-primary-foreground shadow-elegant group-hover:scale-110 transition-transform">
              <f.icon className="w-6 h-6" />
            </div>
            <h3 className="mt-5 font-display font-bold text-xl">{f.title}</h3>
            <p className="mt-2 text-muted-foreground">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Features;
