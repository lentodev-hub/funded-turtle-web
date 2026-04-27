import { TrendingUp } from "lucide-react";

const payouts = [
  { name: "Marcus T.", amount: "$4,283", country: "🇺🇸" },
  { name: "Aisha R.", amount: "$2,140", country: "🇦🇪" },
  { name: "Diego L.", amount: "$8,910", country: "🇪🇸" },
  { name: "Priya S.", amount: "$1,675", country: "🇮🇳" },
  { name: "Kenji M.", amount: "$5,402", country: "🇯🇵" },
  { name: "Lukas B.", amount: "$3,221", country: "🇩🇪" },
  { name: "Chloe W.", amount: "$6,780", country: "🇬🇧" },
  { name: "Omar K.", amount: "$2,950", country: "🇪🇬" },
];

const PayoutTicker = () => (
  <section className="py-10 bg-ocean-deep text-white border-y border-white/10 overflow-hidden">
    <div className="container mb-6 flex items-center justify-center gap-2">
      <TrendingUp className="w-4 h-4 text-turtle-glow" />
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
        Live payouts this week
      </p>
    </div>
    <div className="relative">
      <div className="flex gap-4 animate-[shimmer_30s_linear_infinite] whitespace-nowrap" style={{ animation: "marquee 40s linear infinite" }}>
        {[...payouts, ...payouts, ...payouts].map((p, i) => (
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
        100% { transform: translateX(-33.333%); }
      }
    `}</style>
  </section>
);

export default PayoutTicker;
