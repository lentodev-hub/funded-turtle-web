import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";
import { toast } from "sonner";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    toast.success("You're in! Check your inbox for trader insights.");
    setEmail("");
  };

  return (
    <section className="py-20 bg-background">
      <div className="container">
        <div className="max-w-3xl mx-auto rounded-3xl bg-gradient-primary text-primary-foreground p-10 md:p-14 shadow-elegant relative overflow-hidden">
          <div className="absolute inset-0 bg-glow opacity-40" aria-hidden />
          <div className="relative grid md:grid-cols-[auto_1fr] gap-6 items-center">
            <div className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur flex items-center justify-center shrink-0">
              <Mail className="w-7 h-7" />
            </div>
            <div>
              <h3 className="font-display font-bold text-2xl md:text-3xl">
                Weekly trader insights, straight to your inbox
              </h3>
              <p className="mt-2 text-primary-foreground/80 text-sm md:text-base">
                Market analysis, payout stories, and exclusive challenge discounts. No spam.
              </p>
              <form onSubmit={submit} className="mt-5 flex flex-col sm:flex-row gap-3">
                <Input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@trader.com"
                  className="bg-white/15 border-white/30 placeholder:text-white/60 text-white"
                />
                <Button type="submit" variant="gold" size="lg">Subscribe</Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
