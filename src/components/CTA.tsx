import { Button } from "@/components/ui/button";
import AnimatedTurtle from "./AnimatedTurtle";
import { whiteLabel } from "@/config/whiteLabel";
import { Link } from "react-router-dom";

const CTA = () => (
  <section className="py-24 bg-hero text-white relative overflow-hidden">
    <div className="absolute inset-0 bg-glow opacity-60 animate-blob" aria-hidden />
    <div className="absolute -top-20 left-1/4 w-72 h-72 rounded-full bg-gold/10 blur-3xl animate-float-slow" aria-hidden />
    <div className="container relative grid md:grid-cols-[1fr_auto] items-center gap-10">
      <div className="animate-fade-in-up">
        <h2 className="font-display font-extrabold text-4xl md:text-5xl leading-tight">
          Ready to swim with the <span className="text-gradient-animated">funded</span>?
        </h2>
        <p className="mt-4 text-white/75 text-lg max-w-xl">Join thousands of traders earning real payouts on simulated capital. Your shell is waiting.</p>
        <div className="mt-8 flex flex-wrap gap-4">
          <a href={whiteLabel.provider.signupUrl}>
            <Button variant="gold" size="xl" className="hover:scale-105 transition-transform">Claim your account</Button>
          </a>
          <Link to="/challenges">
            <Button variant="glass" size="xl" className="hover:scale-105 transition-transform">View plans</Button>
          </Link>
        </div>
      </div>
      <div className="hidden md:block w-64 h-64 animate-float">
        <AnimatedTurtle className="w-full h-full" />
      </div>
    </div>
  </section>
);

export default CTA;
