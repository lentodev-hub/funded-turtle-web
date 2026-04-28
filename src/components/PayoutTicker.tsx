import { TrendingUp } from "lucide-react";
import { useMemo } from "react";

const FIRST_NAMES = [
  "Marcus", "Aisha", "Diego", "Priya", "Kenji", "Lukas", "Chloe", "Omar",
  "Sofia", "Liam", "Noa", "Ravi", "Mei", "Tomas", "Yuki", "Hassan",
  "Elena", "Jamal", "Ingrid", "Mateo", "Zara", "Hiroshi", "Amara", "Felix",
  "Nadia", "Oscar", "Leila", "Viktor", "Sana", "Ezra", "Maya", "Idris",
  "Clara", "Arjun", "Freya", "Bilal", "Anya", "Niko", "Tariq", "Lena",
  "Pablo", "Rina", "Cyrus", "Greta", "Imani", "Bjorn", "Camila", "Ade",
  "Dmitri", "Soraya", "Theo", "Yara", "Kai", "Mira", "Joaquin", "Selin",
  "Hugo", "Paloma", "Andrei", "Nour", "Eitan", "Kira", "Sami", "Linnea",
];

const LAST_INITIALS = "ABCDEFGHIJKLMNOPRSTVWYZ".split("");

const FLAGS = ["🇺🇸","🇦🇪","🇪🇸","🇮🇳","🇯🇵","🇩🇪","🇬🇧","🇪🇬","🇧🇷","🇫🇷","🇮🇹","🇨🇦","🇦🇺","🇿🇦","🇲🇽","🇳🇬","🇰🇷","🇸🇬","🇳🇱","🇸🇪","🇨🇭","🇵🇹","🇹🇷","🇦🇷"];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const PayoutTicker = () => {
  const payouts = useMemo(() => {
    const names = shuffle(FIRST_NAMES).slice(0, 24);
    const usedHandles = new Set<string>();
    return names.map((first) => {
      let initial = LAST_INITIALS[Math.floor(Math.random() * LAST_INITIALS.length)];
      let handle = `${first} ${initial}.`;
      while (usedHandles.has(handle)) {
        initial = LAST_INITIALS[Math.floor(Math.random() * LAST_INITIALS.length)];
        handle = `${first} ${initial}.`;
      }
      usedHandles.add(handle);
      const amount = Math.floor(800 + Math.random() * 14200);
      return {
        name: handle,
        amount: `$${amount.toLocaleString()}`,
        country: FLAGS[Math.floor(Math.random() * FLAGS.length)],
      };
    });
  }, []);

  return (
    <section className="py-10 bg-ocean-deep text-white border-y border-white/10 overflow-hidden">
      <div className="container mb-6 flex items-center justify-center gap-2">
        <TrendingUp className="w-4 h-4 text-turtle-glow" />
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
          Live payouts this week
        </p>
      </div>
      <div className="relative">
        <div className="flex gap-4 whitespace-nowrap" style={{ animation: "marquee 60s linear infinite" }}>
          {[...payouts, ...payouts].map((p, i) => (
            <div
              key={i}
              className="flex items-center gap-3 px-5 py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm shrink-0"
            >
              <span className="text-xl">{p.country}</span>
              <span className="text-sm text-white/80">{p.name} withdrew</span>
              <span className="text-sm font-bold text-gold">{p.amount}</span>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
};

export default PayoutTicker;
