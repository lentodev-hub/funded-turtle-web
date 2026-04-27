// Animated SVG turtle that swims gently with flapping flippers and rising bubbles.
const AnimatedTurtle = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`relative ${className}`}>
      {/* Glow halo */}
      <div className="absolute inset-0 bg-glow animate-pulse-glow rounded-full" aria-hidden />

      {/* Bubbles */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        {[
          { left: "20%", delay: "0s", size: 8 },
          { left: "35%", delay: "1.2s", size: 12 },
          { left: "55%", delay: "2.1s", size: 6 },
          { left: "70%", delay: "0.6s", size: 10 },
          { left: "85%", delay: "2.8s", size: 7 },
        ].map((b, i) => (
          <span
            key={i}
            className="absolute bottom-0 rounded-full bg-turtle-glow/40 border border-turtle-glow/60 animate-bubble"
            style={{
              left: b.left,
              width: b.size,
              height: b.size,
              animationDelay: b.delay,
            }}
          />
        ))}
      </div>

      {/* Swimming turtle */}
      <div className="relative animate-swim origin-center">
        <svg viewBox="0 0 400 320" className="w-full h-full drop-shadow-2xl" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="shellGrad" cx="50%" cy="40%" r="60%">
              <stop offset="0%" stopColor="hsl(var(--turtle-glow))" />
              <stop offset="60%" stopColor="hsl(var(--turtle-shell))" />
              <stop offset="100%" stopColor="hsl(var(--ocean-deep))" />
            </radialGradient>
            <linearGradient id="bodyGrad" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="hsl(158 50% 45%)" />
              <stop offset="100%" stopColor="hsl(158 60% 25%)" />
            </linearGradient>
            <linearGradient id="goldStripe" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="hsl(var(--gold))" />
              <stop offset="100%" stopColor="hsl(var(--gold-soft))" />
            </linearGradient>
          </defs>

          {/* Back flippers */}
          <ellipse cx="110" cy="220" rx="38" ry="18" fill="url(#bodyGrad)"
            style={{ transformOrigin: "140px 215px" }}
            className="animate-flipper-left" />
          <ellipse cx="290" cy="220" rx="38" ry="18" fill="url(#bodyGrad)"
            style={{ transformOrigin: "260px 215px" }}
            className="animate-flipper-right" />

          {/* Tail */}
          <path d="M200 250 L188 285 L212 285 Z" fill="url(#bodyGrad)" />

          {/* Head */}
          <ellipse cx="200" cy="80" rx="45" ry="40" fill="url(#bodyGrad)" />
          {/* Eyes */}
          <circle cx="183" cy="72" r="6" fill="white" />
          <circle cx="217" cy="72" r="6" fill="white" />
          <circle cx="184" cy="73" r="3" fill="hsl(var(--ocean-deep))" />
          <circle cx="218" cy="73" r="3" fill="hsl(var(--ocean-deep))" />
          {/* Smile */}
          <path d="M188 95 Q200 105 212 95" stroke="hsl(var(--ocean-deep))" strokeWidth="2.5" fill="none" strokeLinecap="round" />

          {/* Front flippers */}
          <ellipse cx="120" cy="150" rx="42" ry="22" fill="url(#bodyGrad)"
            style={{ transformOrigin: "150px 145px" }}
            className="animate-flipper-left" />
          <ellipse cx="280" cy="150" rx="42" ry="22" fill="url(#bodyGrad)"
            style={{ transformOrigin: "250px 145px" }}
            className="animate-flipper-right" />

          {/* Shell */}
          <ellipse cx="200" cy="180" rx="105" ry="78" fill="url(#shellGrad)" stroke="hsl(var(--ocean-deep))" strokeWidth="3" />

          {/* Shell hex pattern */}
          <g stroke="hsl(var(--ocean-deep) / 0.5)" strokeWidth="2" fill="hsl(var(--turtle-shell) / 0.4)">
            <polygon points="200,140 230,155 230,185 200,200 170,185 170,155" />
            <polygon points="200,200 230,215 230,245 200,255 170,245 170,215" />
            <polygon points="155,165 180,178 175,205 145,205 130,180" />
            <polygon points="245,165 220,178 225,205 255,205 270,180" />
            <polygon points="155,225 180,235 165,255 140,250 135,230" />
            <polygon points="245,225 220,235 235,255 260,250 265,230" />
          </g>

          {/* Gold accent stripe on shell top */}
          <path d="M150 145 Q200 125 250 145" stroke="url(#goldStripe)" strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.85" />

          {/* Tiny dollar sign on shell - "funded" reference */}
          <text x="200" y="178" textAnchor="middle" fill="hsl(var(--gold))" fontSize="22" fontWeight="900" fontFamily="sans-serif">$</text>
        </svg>
      </div>
    </div>
  );
};

export default AnimatedTurtle;
