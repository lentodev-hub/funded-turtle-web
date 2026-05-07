import { useState } from "react";
import { Link, useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import AnimatedOx from "@/components/AnimatedOx";
import { z } from "zod";

const schema = z.object({
  email: z.string().email("Enter a valid email").max(255),
  password: z.string().min(6, "At least 6 characters").max(72),
  username: z.string().trim().min(2, "At least 2 characters").max(40).optional(),
});

type Mode = "login" | "signup";

const AuthPage = ({ mode }: { mode: Mode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [params] = useSearchParams();
  const redirectTo = params.get("next") ?? (location.state as { from?: string } | null)?.from ?? "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const parsed = schema.safeParse({
        email,
        password,
        ...(mode === "signup" ? { username } : {}),
      });
      if (!parsed.success) {
        toast.error(parsed.error.issues[0].message);
        return;
      }

      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/`,
            data: { username },
          },
        });
        if (error) throw error;
        toast.success("Account created! You're now signed in.");
        navigate(redirectTo, { replace: true });
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Welcome back, trader 🐢");
        navigate(redirectTo, { replace: true });
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong";
      if (msg.toLowerCase().includes("invalid login")) {
        toast.error("Wrong email or password.");
      } else if (msg.toLowerCase().includes("already registered")) {
        toast.error("That email is already registered. Try logging in.");
      } else {
        toast.error(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-hero text-white flex items-center justify-center px-4 py-24">
      <div className="absolute inset-0 bg-glow opacity-50 pointer-events-none" />
      <div className="relative grid lg:grid-cols-2 gap-10 items-center max-w-5xl w-full">
        <div className="hidden lg:flex flex-col items-center text-center">
          <div className="w-72 h-72"><AnimatedOx className="w-full h-full" /></div>
          <h2 className="mt-4 font-display font-extrabold text-3xl">Slow and steady wins.</h2>
          <p className="mt-2 text-white/70 max-w-sm">Join 12,000+ traders growing funded accounts with Funded Ox.</p>
        </div>

        <div className="bg-card text-card-foreground rounded-2xl p-8 shadow-elegant border border-border animate-fade-in-up">
          <Link to="/" className="flex items-center gap-2 font-display font-bold text-lg justify-center mb-6">
            <span className="text-2xl">🐢</span>
            <span>Funded <span className="text-gradient-gold">Turtle</span></span>
          </Link>
          <h1 className="font-display font-bold text-2xl text-center">
            {mode === "login" ? "Welcome back" : "Create your account"}
          </h1>
          <p className="text-sm text-muted-foreground text-center mt-1">
            {mode === "login" ? "Log in to access your trader dashboard." : "Start your funded trading journey today."}
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {mode === "signup" && (
              <div className="space-y-1.5">
                <Label htmlFor="username">Username</Label>
                <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="oxtrader" required />
              </div>
            )}
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required autoComplete="email" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required minLength={6} autoComplete={mode === "login" ? "current-password" : "new-password"} />
            </div>
            <Button type="submit" variant="hero" className="w-full" size="lg" disabled={loading}>
              {loading ? "Please wait..." : mode === "login" ? "Log in" : "Create account"}
            </Button>
          </form>

          <p className="text-sm text-muted-foreground text-center mt-6">
            {mode === "login" ? (
              <>New here? <Link to="/signup" className="text-primary font-semibold hover:underline">Create an account</Link></>
            ) : (
              <>Already have an account? <Link to="/login" className="text-primary font-semibold hover:underline">Log in</Link></>
            )}
          </p>
        </div>
      </div>
    </section>
  );
};

export default AuthPage;
