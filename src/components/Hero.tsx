import { Button } from "@/components/ui/button";
import AnimatedTurtle from "./AnimatedTurtle";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const Hero = () => {
  const { user } = useAuth();
  const startHref = user ? "/challenges" : "/signup?next=/challenges";
  return (
    <section className="relative overflow-hidden bg-hero text-white pt-28 pb-24 md:pt-36 md:pb-32">
      {/* Underwater light rays */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <div className="absolute -top-20 left-1/4 w-32 h-[700px] bg-turtle-glow/20 blur-3xl rotate-12" />
        <div className="absolute -top-20 right-1/3 w-40 h-[700px] bg-gold/10 blur-3xl -rotate-12" />
      </div>

      <div className="container relative grid lg:grid-cols-2 gap-12 items-center">
        <div className="animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-turtle-glow animate-pulse" />
            Trusted by 12,000+ funded traders
          </div>
          <h1 className="font-display font-extrabold text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight">
            Trade big.<br />
            <span className="text-gradient-gold">Move smart.</span><br />
            Get funded.
          </h1>
          <p className="mt-6 text-lg md:text-xl text-white/75 max-w-xl">
            Funded Turtle gives ambitious traders up to <span className="text-gold font-semibold">$200,000</span> in
            simulated capital. Pass our challenge, keep up to <span className="text-gold font-semibold">90%</span> of
            the profits. Slow and steady wins.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link to={startHref}>
              <Button variant="hero" size="xl" className="group">
                Start now
                <ArrowRight className="ml-1 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/how-it-works">
              <Button variant="glass" size="xl">How it works</Button>
            </Link>
          </div>
          <div className="mt-8 flex items-center gap-6 text-sm text-white/60">
            <div className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-turtle-glow" /> Instant funding options</div>
            <div className="hidden sm:flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-turtle-glow" /> Same-day payouts</div>
          </div>
        </div>

        <div className="relative h-[380px] md:h-[480px] animate-scale-in">
          <AnimatedTurtle className="w-full h-full" />
        </div>
      </div>

      {/* Wave divider */}
      <svg className="absolute bottom-0 inset-x-0 w-full" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden>
        <path d="M0 40 Q360 80 720 40 T1440 40 V80 H0 Z" fill="hsl(var(--background))" />
      </svg>
    </section>
  );
};

export default Hero;
