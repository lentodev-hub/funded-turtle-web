import { Button } from "@/components/ui/button";
import AnimatedTurtle from "./AnimatedTurtle";
import { whiteLabel } from "@/config/whiteLabel";

const CTA = () => (
  <section className="py-24 bg-hero text-white relative overflow-hidden">
    <div className="absolute inset-0 bg-glow opacity-60" aria-hidden />
    <div className="container relative grid md:grid-cols-[1fr_auto] items-center gap-10">
      <div>
        <h2 className="font-display font-extrabold text-4xl md:text-5xl leading-tight">
          Ready to swim with the <span className="text-gradient-gold">funded</span>?
        </h2>
        <p className="mt-4 text-white/75 text-lg max-w-xl">Join thousands of traders earning real payouts on simulated capital. Your shell is waiting.</p>
        <div className="mt-8 flex flex-wrap gap-4">
          <a href={whiteLabel.provider.signupUrl}>
            <Button variant="gold" size="xl">Claim your account</Button>
          </a>
          <a href="#challenges">
            <Button variant="glass" size="xl">View plans</Button>
          </a>
        </div>
      </div>
      <div className="hidden md:block w-64 h-64">
        <AnimatedTurtle className="w-full h-full" />
      </div>
    </div>
  </section>
);

export default CTA;
