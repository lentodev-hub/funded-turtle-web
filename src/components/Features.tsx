import { Zap, Shield, TrendingUp, Wallet, Clock, Globe } from "lucide-react";
import Reveal from "./Reveal";

const features = [
  { icon: Zap, title: "Lightning execution", desc: "Sub-30ms order routing on every major asset class." },
  { icon: Shield, title: "Trader-friendly rules", desc: "No minimum trading days. No restrictive lot caps." },
  { icon: TrendingUp, title: "Up to 90% profit split", desc: "Keep more of what you make. Scale to $2M total allocation." },
  { icon: Wallet, title: "Same-day payouts", desc: "Withdraw via crypto or wire — processed in under 24 hours." },
  { icon: Clock, title: "Instant funding", desc: "Skip the challenge with our Express plans and trade today." },
  { icon: Globe, title: "Trade anywhere", desc: "MT4, MT5, cTrader & TradeLocker — desktop, web, mobile." },
];

const Features = () => (
  <section id="features" className="py-24 bg-secondary/40 relative overflow-hidden">
    <div className="absolute top-0 right-0 w-96 h-96 bg-glow opacity-30 animate-blob" aria-hidden />
    <div className="container relative">
      <Reveal>
        <div className="max-w-2xl mx-auto text-center mb-16">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider">Why Funded Turtle</p>
          <h2 className="mt-3 font-display font-bold text-4xl md:text-5xl">Built for traders who play the long game</h2>
          <p className="mt-4 text-muted-foreground text-lg">Patience pays. Our rules, payouts and platform are designed to reward disciplined, consistent trading.</p>
        </div>
      </Reveal>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((f, i) => (
          <Reveal key={f.title} delay={i * 80}>
            <div className="group p-8 rounded-2xl bg-gradient-card border border-border shadow-soft hover-lift h-full">
              <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center text-primary-foreground shadow-elegant group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                <f.icon className="w-6 h-6" />
              </div>
              <h3 className="mt-5 font-display font-bold text-xl group-hover:text-primary transition-colors">{f.title}</h3>
              <p className="mt-2 text-muted-foreground">{f.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default Features;
