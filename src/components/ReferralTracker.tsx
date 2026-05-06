import { useEffect, useMemo, useState } from "react";
import { Copy, Check, Users, Target, TrendingUp, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { toast } from "@/hooks/use-toast";

const ReferralTracker = () => {
  const { user } = useAuth();
  const [copied, setCopied] = useState(false);

  // Mock data — replace with real data once referrals table exists
  const total = 5;
  const successful = 1;
  const pending = total - successful;
  const goal = 2;
  const successRate = total > 0 ? Math.round((successful / total) * 100) : 0;
  const progressPct = Math.min(100, (successful / goal) * 100);
  const remaining = Math.max(0, goal - successful);
  const credits = Math.floor(successful / goal);

  const code = useMemo(() => {
    const base = user?.id?.slice(0, 6) || "TURTLE";
    return base.toUpperCase();
  }, [user]);

  const link = `${typeof window !== "undefined" ? window.location.origin : ""}/signup?ref=${code}`;

  const copy = async () => {
    await navigator.clipboard.writeText(link);
    setCopied(true);
    toast({ title: "Referral link copied", description: link });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-16 bg-background">
      <div className="container max-w-5xl">
        <div className="rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 via-background to-background shadow-elegant p-6 md:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-primary">Your Referral Tracker</p>
              <h3 className="font-display text-2xl md:text-3xl font-bold mt-1">
                {remaining === 0
                  ? "🎉 Free retry unlocked!"
                  : `${remaining} more successful referral${remaining === 1 ? "" : "s"} to unlock your free retry`}
              </h3>
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-border bg-secondary/40 px-3 py-2">
              <code className="text-sm font-mono truncate max-w-[180px] md:max-w-xs">{link}</code>
              <Button size="sm" variant="ghost" onClick={copy} className="h-7 px-2">
                {copied ? <Check className="w-4 h-4 text-primary" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-6">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">Progress to free retry</span>
              <span className="font-semibold">
                {successful} / {goal}
              </span>
            </div>
            <div className="h-3 rounded-full bg-secondary overflow-hidden">
              <div
                className="h-full bg-gradient-gold transition-all duration-700"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>

          {/* Stats grid */}
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
            <Stat icon={Users} label="Total referrals" value={total} />
            <Stat icon={Check} label="Successful" value={successful} accent />
            <Stat icon={Target} label="Pending" value={pending} />
            <Stat icon={TrendingUp} label="Success rate" value={`${successRate}%`} />
          </div>

          <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
            <Gift className="w-4 h-4 text-primary" />
            Retry credits earned: <span className="font-semibold text-foreground">{credits}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

const Stat = ({
  icon: Icon,
  label,
  value,
  accent,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: number | string;
  accent?: boolean;
}) => (
  <div className="rounded-xl border border-border bg-secondary/30 p-4">
    <Icon className={`w-4 h-4 mb-2 ${accent ? "text-primary" : "text-muted-foreground"}`} />
    <p className="text-xs text-muted-foreground">{label}</p>
    <p className={`font-display font-extrabold text-2xl ${accent ? "text-gradient-gold" : "text-foreground"}`}>
      {value}
    </p>
  </div>
);

export default ReferralTracker;
