import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import AnimatedOx from "./AnimatedOx";

const greeting = () => {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
};

const WelcomeBanner = ({ compact = false }: { compact?: boolean }) => {
  const { user } = useAuth();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 10000);
    return () => clearTimeout(t);
  }, []);

  if (!user || !visible) return null;

  const name =
    (user.user_metadata?.username as string) ||
    (user.user_metadata?.full_name as string) ||
    user.email?.split("@")[0] ||
    "trader";

  const created = user.created_at ? new Date(user.created_at) : new Date();
  const days = Math.max(
    0,
    Math.floor((Date.now() - created.getTime()) / (1000 * 60 * 60 * 24))
  );

  return (
    <section className={compact ? "pt-24 pb-4 bg-background" : "pt-28 pb-6 bg-background"}>
      <div className="container">
        <div className="rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/15 via-background to-background shadow-elegant px-5 py-4 md:px-7 md:py-5 flex items-center gap-4 md:gap-6 animate-fade-in">
          <div className="w-16 h-16 md:w-20 md:h-20 shrink-0">
            <AnimatedOx className="w-full h-full" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              {greeting()}
            </p>
            <h2 className="font-display font-extrabold text-xl md:text-3xl text-foreground truncate">
              Hello <span className="text-gradient-gold">{name}</span>, welcome to the pod
            </h2>
            <p className="text-sm text-muted-foreground mt-0.5">
              <span className="text-primary font-semibold">{days}</span> day{days === 1 ? "" : "s"} since you got your account · keep stacking those payouts 🐢
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WelcomeBanner;
