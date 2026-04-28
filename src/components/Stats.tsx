import { TrendingUp, Users, Percent, Zap } from "lucide-react";
import Reveal from "./Reveal";

const stats = [
  { value: "$48M+", label: "Paid to traders", icon: TrendingUp },
  { value: "12,400", label: "Funded accounts", icon: Users },
  { value: "90%", label: "Max profit split", icon: Percent },
  { value: "<24h", label: "Payout speed", icon: Zap },
];

const Stats = () => (
  <section className="py-20 bg-background">
    <div className="container grid grid-cols-2 md:grid-cols-4 gap-6">
      {stats.map((s, i) => (
        <Reveal key={s.label} delay={i * 100}>
          <div className="group text-center p-7 rounded-2xl bg-gradient-card shadow-soft border border-border hover-lift h-full">
            <div className="mx-auto w-12 h-12 rounded-xl bg-gradient-primary text-primary-foreground flex items-center justify-center shadow-elegant group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
              <s.icon className="w-6 h-6" />
            </div>
            <div className="mt-4 text-3xl md:text-4xl font-display font-extrabold text-gradient-primary">
              {s.value}
            </div>
            <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
          </div>
        </Reveal>
      ))}
    </div>
  </section>
);

export default Stats;
