// Animated SVG ox/bull that snorts and stomps with a swaying tail and dust puffs.
const AnimatedOx = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`relative ${className}`}>
      {/* Glow halo */}
      <div className="absolute inset-0 bg-glow animate-pulse-glow rounded-full" aria-hidden />

      {/* Snort puffs */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        {[
          { left: "62%", top: "30%", delay: "0s", size: 10 },
          { left: "70%", top: "28%", delay: "0.8s", size: 14 },
          { left: "78%", top: "32%", delay: "1.6s", size: 8 },
        ].map((p, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-turtle-glow/40 border border-turtle-glow/60 animate-bubble"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              animationDelay: p.delay,
            }}
          />
        ))}
      </div>

      {/* Stomping ox */}
      <div className="relative animate-float origin-center">
        <svg viewBox="0 0 400 320" className="w-full h-full drop-shadow-2xl" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="oxBodyGrad" cx="50%" cy="40%" r="65%">
              <stop offset="0%" stopColor="hsl(var(--turtle-glow))" />
              <stop offset="60%" stopColor="hsl(var(--turtle-shell))" />
              <stop offset="100%" stopColor="hsl(var(--ocean-deep))" />
            </radialGradient>
            <linearGradient id="oxLegGrad" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="hsl(158 55% 30%)" />
              <stop offset="100%" stopColor="hsl(215 60% 12%)" />
            </linearGradient>
            <linearGradient id="hornGrad" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="hsl(var(--gold-soft))" />
              <stop offset="100%" stopColor="hsl(var(--gold))" />
            </linearGradient>
          </defs>

          {/* Tail */}
          <path
            d="M95 175 Q60 175 55 215 Q52 240 70 248"
            stroke="url(#oxLegGrad)"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            style={{ transformOrigin: "95px 175px" }}
            className="animate-flipper-left"
          />
          <circle cx="70" cy="250" r="8" fill="hsl(var(--gold))" />

          {/* Back legs */}
          <rect x="135" y="220" width="22" height="60" rx="6" fill="url(#oxLegGrad)"
            style={{ transformOrigin: "146px 225px" }}
            className="animate-flipper-right" />
          <rect x="170" y="220" width="22" height="60" rx="6" fill="url(#oxLegGrad)" />
          {/* Hooves back */}
          <rect x="133" y="275" width="26" height="10" rx="3" fill="hsl(var(--ocean-deep))" />
          <rect x="168" y="275" width="26" height="10" rx="3" fill="hsl(var(--ocean-deep))" />

          {/* Body */}
          <ellipse cx="200" cy="180" rx="115" ry="62" fill="url(#oxBodyGrad)" stroke="hsl(var(--ocean-deep))" strokeWidth="3" />
          {/* Belly highlight */}
          <ellipse cx="200" cy="210" rx="80" ry="20" fill="hsl(var(--turtle-glow) / 0.25)" />
          {/* Gold flank stripe */}
          <path d="M130 165 Q200 145 270 165" stroke="url(#hornGrad)" strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.85" />

          {/* Front legs */}
          <rect x="240" y="220" width="22" height="60" rx="6" fill="url(#oxLegGrad)" />
          <rect x="275" y="220" width="22" height="60" rx="6" fill="url(#oxLegGrad)"
            style={{ transformOrigin: "286px 225px" }}
            className="animate-flipper-left" />
          {/* Hooves front */}
          <rect x="238" y="275" width="26" height="10" rx="3" fill="hsl(var(--ocean-deep))" />
          <rect x="273" y="275" width="26" height="10" rx="3" fill="hsl(var(--ocean-deep))" />

          {/* Head */}
          <ellipse cx="305" cy="135" rx="55" ry="48" fill="url(#oxBodyGrad)" stroke="hsl(var(--ocean-deep))" strokeWidth="3" />
          {/* Snout */}
          <ellipse cx="335" cy="160" rx="28" ry="22" fill="hsl(158 40% 22%)" />
          <circle cx="328" cy="158" r="3" fill="hsl(var(--ocean-deep))" />
          <circle cx="345" cy="158" r="3" fill="hsl(var(--ocean-deep))" />
          {/* Mouth */}
          <path d="M325 172 Q335 178 348 172" stroke="hsl(var(--ocean-deep))" strokeWidth="2.5" fill="none" strokeLinecap="round" />

          {/* Eyes */}
          <circle cx="295" cy="120" r="6" fill="white" />
          <circle cx="320" cy="120" r="6" fill="white" />
          <circle cx="296" cy="121" r="3" fill="hsl(var(--ocean-deep))" />
          <circle cx="321" cy="121" r="3" fill="hsl(var(--ocean-deep))" />

          {/* Ears */}
          <ellipse cx="265" cy="110" rx="14" ry="9" fill="url(#oxBodyGrad)" transform="rotate(-30 265 110)" />
          <ellipse cx="345" cy="105" rx="14" ry="9" fill="url(#oxBodyGrad)" transform="rotate(30 345 105)" />

          {/* Horns */}
          <path d="M275 95 Q250 70 235 80 Q245 92 268 105 Z" fill="url(#hornGrad)" stroke="hsl(var(--ocean-deep))" strokeWidth="2" />
          <path d="M335 95 Q360 70 375 80 Q365 92 342 105 Z" fill="url(#hornGrad)" stroke="hsl(var(--ocean-deep))" strokeWidth="2" />

          {/* Nose ring */}
          <circle cx="335" cy="170" r="6" fill="none" stroke="hsl(var(--gold))" strokeWidth="2.5" />

          {/* Dollar brand on flank */}
          <text x="200" y="195" textAnchor="middle" fill="hsl(var(--gold))" fontSize="26" fontWeight="900" fontFamily="sans-serif">$</text>
        </svg>
      </div>
    </div>
  );
};

export default AnimatedOx;
