import { ArrowDownUp, FilePlus2, MoreHorizontal, Wallet, TrendingUp, ArrowUpRight } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

type Position = {
  symbol: string;
  side: "buy" | "sell";
  lots: string;
  entry: string;
  current: string;
  pnl: number;
};

const positions: Position[] = [
  { symbol: "USDJPY", side: "buy",  lots: "0.50", entry: "156.867", current: "156.910", pnl: 13.70 },
  { symbol: "USDJPY", side: "buy",  lots: "0.50", entry: "156.909", current: "156.910", pnl: 0.32 },
  { symbol: "GOLD",   side: "sell", lots: "0.50", entry: "4 585.48", current: "4 578.76", pnl: 336.00 },
  { symbol: "GOLD",   side: "sell", lots: "0.50", entry: "4 585.18", current: "4 578.76", pnl: 321.00 },
];

const TradesPage = () => {
  const equity = 9249.43;
  const balance = 8578.41;
  const margin = 558.53;
  const freeMargin = 8690.90;
  const marginLevel = 1656.03;
  const totalPnl = positions.reduce((s, p) => s + p.pnl, 0);
  const availableForWithdrawal = Math.max(0, equity - balance); // floating profit available

  return (
    <>
      <PageHeader
        eyebrow="Live account"
        title="My trades"
        description="A real-time snapshot of open positions, account equity, and how much you can withdraw right now."
      />

      {/* Top widget: Available for withdrawals */}
      <section className="bg-background -mt-10 relative z-10">
        <div className="container">
          <div className="rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/15 via-background to-background shadow-elegant p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/15 text-primary flex items-center justify-center shrink-0">
                  <Wallet className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    Available for withdrawal
                  </p>
                  <div className="mt-1 flex items-baseline gap-2">
                    <span className="font-display font-extrabold text-4xl md:text-5xl text-foreground">
                      ${availableForWithdrawal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                    <span className="text-sm text-muted-foreground">USD</span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5 text-primary" />
                    70% profit split applied · cleared in &lt; 24h
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button variant="hero" size="lg">
                  Request withdrawal
                  <ArrowUpRight className="w-4 h-4 ml-1" />
                </Button>
                <Link to="/scaling-plan">
                  <Button variant="outline" size="lg">View scaling plan</Button>
                </Link>
              </div>
            </div>

            {/* mini stats row */}
            <div className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-3">
              {[
                { label: "Balance", value: `$${balance.toLocaleString(undefined,{minimumFractionDigits:2})}` },
                { label: "Equity", value: `$${equity.toLocaleString(undefined,{minimumFractionDigits:2})}`, accent: true },
                { label: "Margin", value: `$${margin.toLocaleString(undefined,{minimumFractionDigits:2})}` },
                { label: "Free margin", value: `$${freeMargin.toLocaleString(undefined,{minimumFractionDigits:2})}` },
                { label: "Margin level", value: `${marginLevel.toLocaleString(undefined,{minimumFractionDigits:2})}%` },
              ].map((s) => (
                <div key={s.label} className="rounded-xl border border-border bg-secondary/40 px-4 py-3">
                  <p className="text-[11px] uppercase tracking-wider text-muted-foreground">{s.label}</p>
                  <p className={`mt-1 font-display font-bold ${s.accent ? "text-primary" : "text-foreground"}`}>{s.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trade panel */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="rounded-2xl border border-border bg-card shadow-elegant overflow-hidden">
            {/* header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Trade</p>
                <p className="font-display font-bold text-2xl text-primary">
                  {totalPnl.toFixed(2)} <span className="text-sm text-muted-foreground font-normal">USD</span>
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon"><ArrowDownUp className="w-4 h-4" /></Button>
                <Button variant="ghost" size="icon"><FilePlus2 className="w-4 h-4" /></Button>
              </div>
            </div>

            {/* positions header */}
            <div className="flex items-center justify-between px-5 py-3 bg-secondary/40 border-b border-border">
              <p className="text-sm font-semibold text-foreground">Positions</p>
              <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
            </div>

            {/* positions list */}
            <ul className="divide-y divide-border">
              {positions.map((p, i) => (
                <li key={i} className="flex items-center justify-between px-5 py-4 hover:bg-secondary/30 transition-colors">
                  <div>
                    <p className="font-bold text-foreground">
                      {p.symbol},{" "}
                      <span className={p.side === "buy" ? "text-primary" : "text-destructive"}>
                        {p.side} {p.lots}
                      </span>
                    </p>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      {p.entry} <span className="mx-1">→</span> {p.current}
                    </p>
                  </div>
                  <p className={`font-display font-bold text-xl ${p.pnl >= 0 ? "text-primary" : "text-destructive"}`}>
                    {p.pnl.toFixed(2)}
                  </p>
                </li>
              ))}
            </ul>

            {/* footer */}
            <div className="px-5 py-4 border-t border-border flex items-center justify-between bg-secondary/30">
              <p className="text-sm text-muted-foreground">{positions.length} open positions</p>
              <p className="text-sm">
                <span className="text-muted-foreground">Floating P&amp;L: </span>
                <span className="font-bold text-primary">${totalPnl.toFixed(2)}</span>
              </p>
            </div>
          </div>

          <p className="mt-6 text-xs text-muted-foreground text-center max-w-2xl mx-auto">
            Data shown is an example of a funded account. Trade on MT4, MT5, cTrader or TradeLocker — your live
            positions sync here automatically once your account is connected.
          </p>
        </div>
      </section>
    </>
  );
};

export default TradesPage;
