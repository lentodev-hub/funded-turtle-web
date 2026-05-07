import { Button } from "@/components/ui/button";
import { challenges } from "@/config/whiteLabel";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const Challenges = () => {
  const { user } = useAuth();
  return (
  <section id="challenges" className="py-24 bg-secondary/40">
    <div className="container">
      <div className="max-w-2xl mx-auto text-center mb-16">
        <p className="text-sm font-semibold text-primary uppercase tracking-wider">Challenges</p>
        <h2 className="mt-3 font-display font-bold text-4xl md:text-5xl">Choose your horns</h2>
        <p className="mt-4 text-muted-foreground text-lg">One-step evaluation. Refundable fee. Same rules, scaled capital.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
        {challenges.map((c) => (
          <div
            key={c.id}
            className={`relative p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-2 ${
              c.popular
                ? "bg-gradient-primary text-primary-foreground border-primary shadow-elegant scale-105"
                : "bg-gradient-card border-border shadow-soft hover:shadow-elegant"
            }`}
          >
            {c.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-gold text-accent-foreground text-xs font-bold px-3 py-1 rounded-full shadow-gold">
                MOST POPULAR
              </div>
            )}
            <div className={`text-sm uppercase tracking-wider ${c.popular ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
              {c.size} Account
            </div>
            <div className="mt-2 font-display font-extrabold text-3xl">{c.price}</div>
            <ul className={`mt-5 space-y-2.5 text-sm ${c.popular ? "text-primary-foreground/90" : "text-foreground/80"}`}>
              <li className="flex gap-2"><Check className="w-4 h-4 mt-0.5 shrink-0" /> Profit target {c.profitTarget}</li>
              <li className="flex gap-2"><Check className="w-4 h-4 mt-0.5 shrink-0" /> Daily loss {c.maxDailyLoss}</li>
              <li className="flex gap-2"><Check className="w-4 h-4 mt-0.5 shrink-0" /> Max loss {c.maxLoss}</li>
              <li className="flex gap-2"><Check className="w-4 h-4 mt-0.5 shrink-0" /> {c.profitSplit} profit split</li>
              <li className="flex gap-2"><Check className="w-4 h-4 mt-0.5 shrink-0" /> No time limit</li>
            </ul>
            <Link
              to={user ? `/checkout?plan=${c.id}` : `/login?next=${encodeURIComponent(`/checkout?plan=${c.id}`)}`}
              className="block mt-6"
            >
              <Button variant={c.popular ? "gold" : "default"} className="w-full">Start now</Button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  </section>
  );
};

export default Challenges;
