import { Star } from "lucide-react";
import meeting1 from "@/assets/forex-meeting-1.jpg";
import meeting2 from "@/assets/forex-meeting-2.jpg";
import meeting3 from "@/assets/forex-meeting-3.jpg";

const reviews = [
  {
    name: "Marcus T.",
    role: "Funded Trader · $100K",
    avatar: "M",
    text: "Passed the challenge in 11 days and got my first $4,200 payout the same week. The rules actually let you trade.",
  },
  {
    name: "Aisha R.",
    role: "Funded Trader · $50K",
    avatar: "A",
    text: "I've tried four other prop firms. Funded Ox is the only one where the payout came faster than promised.",
  },
  {
    name: "Diego L.",
    role: "Funded Trader · $200K",
    avatar: "D",
    text: "70% profit split + no minimum days = a serious trader's dream. Already scaled to my second account.",
  },
  {
    name: "Priya S.",
    role: "Funded Trader · $25K",
    avatar: "P",
    text: "Smooth onboarding, clear dashboard, and real humans on support. Slow and steady, just like the turtle.",
  },
];

const Reviews = () => (
  <section className="py-24 bg-secondary/40">
    <div className="container">
      {/* Reviews */}
      <div className="max-w-2xl mx-auto text-center mb-14">
        <p className="text-sm font-semibold text-primary uppercase tracking-wider">Trader stories</p>
        <h2 className="mt-3 font-display font-bold text-4xl md:text-5xl">Loved by traders worldwide</h2>
        <p className="mt-4 text-muted-foreground text-lg">Real people, real payouts.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {reviews.map((r) => (
          <div key={r.name} className="p-6 rounded-2xl bg-gradient-card border border-border shadow-soft hover:shadow-elegant transition-all">
            <div className="flex gap-1 text-gold">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-gold" />
              ))}
            </div>
            <p className="mt-4 text-foreground/80 text-sm leading-relaxed">"{r.text}"</p>
            <div className="mt-5 flex items-center gap-3 pt-4 border-t border-border">
              <div className="w-10 h-10 rounded-full bg-gradient-primary text-primary-foreground flex items-center justify-center font-bold">
                {r.avatar}
              </div>
              <div>
                <div className="font-semibold text-sm">{r.name}</div>
                <div className="text-xs text-muted-foreground">{r.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Trust gallery — forex meetings */}
      <div className="mt-20 max-w-2xl mx-auto text-center mb-10">
        <p className="text-sm font-semibold text-primary uppercase tracking-wider">Inside the community</p>
        <h3 className="mt-3 font-display font-bold text-3xl md:text-4xl">A real community of traders</h3>
        <p className="mt-3 text-muted-foreground">From global meetups to working sessions — Funded Ox traders connect, learn and grow together.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        {[
          { src: meeting1, alt: "Forex traders attending a live trading conference" },
          { src: meeting2, alt: "Two forex traders shaking hands at a networking event" },
          { src: meeting3, alt: "Group of forex traders collaborating around trading screens" },
        ].map((img) => (
          <div key={img.src} className="relative overflow-hidden rounded-2xl shadow-soft group">
            <img
              src={img.src}
              alt={img.alt}
              loading="lazy"
              width={1024}
              height={640}
              className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ocean-deep/70 via-transparent to-transparent" />
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Reviews;
