import PageHeader from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, Medal, Award } from "lucide-react";

type Trader = {
  rank: number;
  name: string;
  country: string;
  flag: string;
  profit: number;
  winRate: number;
  trades: number;
};

const monthly: Trader[] = [
  { rank: 1, name: "Kwame A.", country: "Ghana", flag: "🇬🇭", profit: 184250, winRate: 78, trades: 412 },
  { rank: 2, name: "Amani O.", country: "Kenya", flag: "🇰🇪", profit: 162800, winRate: 75, trades: 389 },
  { rank: 3, name: "Liam C.", country: "United Kingdom", flag: "🇬🇧", profit: 154300, winRate: 73, trades: 356 },
  { rank: 4, name: "Sofia R.", country: "Spain", flag: "🇪🇸", profit: 142900, winRate: 71, trades: 401 },
  { rank: 5, name: "Hiroshi T.", country: "Japan", flag: "🇯🇵", profit: 138400, winRate: 69, trades: 322 },
  { rank: 6, name: "Chiamaka E.", country: "Nigeria", flag: "🇳🇬", profit: 129750, winRate: 68, trades: 298 },
  { rank: 7, name: "Noah M.", country: "United States", flag: "🇺🇸", profit: 121300, winRate: 66, trades: 345 },
  { rank: 8, name: "Aaliyah S.", country: "South Africa", flag: "🇿🇦", profit: 115600, winRate: 65, trades: 287 },
  { rank: 9, name: "Mateo G.", country: "Argentina", flag: "🇦🇷", profit: 108900, winRate: 64, trades: 312 },
  { rank: 10, name: "Priya N.", country: "India", flag: "🇮🇳", profit: 102450, winRate: 62, trades: 276 },
  { rank: 11, name: "Lukas B.", country: "Germany", flag: "🇩🇪", profit: 96800, winRate: 61, trades: 254 },
  { rank: 12, name: "Fatima H.", country: "UAE", flag: "🇦🇪", profit: 91200, winRate: 60, trades: 241 },
];

const weekly: Trader[] = [
  { rank: 1, name: "Amani O.", country: "Kenya", flag: "🇰🇪", profit: 48200, winRate: 82, trades: 96 },
  { rank: 2, name: "Sofia R.", country: "Spain", flag: "🇪🇸", profit: 42150, winRate: 79, trades: 88 },
  { rank: 3, name: "Kwame A.", country: "Ghana", flag: "🇬🇭", profit: 39800, winRate: 76, trades: 102 },
  { rank: 4, name: "Noah M.", country: "United States", flag: "🇺🇸", profit: 35400, winRate: 72, trades: 81 },
  { rank: 5, name: "Hiroshi T.", country: "Japan", flag: "🇯🇵", profit: 32900, winRate: 70, trades: 74 },
  { rank: 6, name: "Mateo G.", country: "Argentina", flag: "🇦🇷", profit: 29750, winRate: 68, trades: 79 },
  { rank: 7, name: "Chiamaka E.", country: "Nigeria", flag: "🇳🇬", profit: 27300, winRate: 67, trades: 71 },
  { rank: 8, name: "Liam C.", country: "United Kingdom", flag: "🇬🇧", profit: 24800, winRate: 65, trades: 68 },
  { rank: 9, name: "Aaliyah S.", country: "South Africa", flag: "🇿🇦", profit: 22100, winRate: 64, trades: 62 },
  { rank: 10, name: "Lukas B.", country: "Germany", flag: "🇩🇪", profit: 19850, winRate: 62, trades: 58 },
];

const daily: Trader[] = [
  { rank: 1, name: "Sofia R.", country: "Spain", flag: "🇪🇸", profit: 12400, winRate: 88, trades: 18 },
  { rank: 2, name: "Hiroshi T.", country: "Japan", flag: "🇯🇵", profit: 10850, winRate: 84, trades: 16 },
  { rank: 3, name: "Amani O.", country: "Kenya", flag: "🇰🇪", profit: 9720, winRate: 81, trades: 14 },
  { rank: 4, name: "Priya N.", country: "India", flag: "🇮🇳", profit: 8650, winRate: 78, trades: 17 },
  { rank: 5, name: "Kwame A.", country: "Ghana", flag: "🇬🇭", profit: 7980, winRate: 75, trades: 15 },
  { rank: 6, name: "Fatima H.", country: "UAE", flag: "🇦🇪", profit: 7240, winRate: 73, trades: 13 },
  { rank: 7, name: "Noah M.", country: "United States", flag: "🇺🇸", profit: 6580, winRate: 71, trades: 12 },
  { rank: 8, name: "Chiamaka E.", country: "Nigeria", flag: "🇳🇬", profit: 5920, winRate: 69, trades: 14 },
  { rank: 9, name: "Mateo G.", country: "Argentina", flag: "🇦🇷", profit: 5210, winRate: 67, trades: 11 },
  { rank: 10, name: "Liam C.", country: "United Kingdom", flag: "🇬🇧", profit: 4680, winRate: 65, trades: 10 },
];

const rankIcon = (rank: number) => {
  if (rank === 1) return <Trophy className="h-5 w-5 text-gold" />;
  if (rank === 2) return <Medal className="h-5 w-5 text-muted-foreground" />;
  if (rank === 3) return <Award className="h-5 w-5 text-amber-700" />;
  return <span className="font-mono text-muted-foreground">#{rank}</span>;
};

const Board = ({ traders }: { traders: Trader[] }) => {
  const podium = traders.slice(0, 3);
  return (
    <>
      <div className="grid md:grid-cols-3 gap-4 md:gap-6 mb-10">
        {podium.map((t) => (
          <Card key={t.rank} className="p-6 text-center bg-gradient-to-b from-card to-muted/30">
            <div className="flex justify-center mb-3">{rankIcon(t.rank)}</div>
            <div className="text-5xl mb-2" aria-label={t.country}>{t.flag}</div>
            <h3 className="font-display font-bold text-xl">{t.name}</h3>
            <p className="text-sm text-muted-foreground mb-3">{t.country}</p>
            <p className="text-2xl font-bold text-primary">${t.profit.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground mt-1">{t.winRate}% win • {t.trades} trades</p>
          </Card>
        ))}
      </div>

      <Card className="overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">Rank</TableHead>
              <TableHead>Trader</TableHead>
              <TableHead>Country</TableHead>
              <TableHead className="text-right">Profit</TableHead>
              <TableHead className="text-right hidden sm:table-cell">Win Rate</TableHead>
              <TableHead className="text-right hidden md:table-cell">Trades</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {traders.map((t) => (
              <TableRow key={t.rank}>
                <TableCell>{rankIcon(t.rank)}</TableCell>
                <TableCell className="font-medium">{t.name}</TableCell>
                <TableCell>
                  <span className="inline-flex items-center gap-2">
                    <span className="text-xl" aria-label={t.country}>{t.flag}</span>
                    <span className="hidden sm:inline text-muted-foreground">{t.country}</span>
                  </span>
                </TableCell>
                <TableCell className="text-right font-semibold text-primary">
                  ${t.profit.toLocaleString()}
                </TableCell>
                <TableCell className="text-right hidden sm:table-cell">
                  <Badge variant="secondary">{t.winRate}%</Badge>
                </TableCell>
                <TableCell className="text-right hidden md:table-cell text-muted-foreground">
                  {t.trades}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </>
  );
};

const LeaderboardPage = () => (
  <>
    <PageHeader
      eyebrow="Hall of Fame"
      title="Top Traders Leaderboard"
      description="The funded traders crushing it — ranked by net profit across daily, weekly, and monthly windows."
    />
    <section className="container py-12 md:py-16">
      <Tabs defaultValue="monthly" className="w-full">
        <TabsList className="mb-8">
          <TabsTrigger value="daily">Daily</TabsTrigger>
          <TabsTrigger value="weekly">Weekly</TabsTrigger>
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
        </TabsList>
        <TabsContent value="daily"><Board traders={daily} /></TabsContent>
        <TabsContent value="weekly"><Board traders={weekly} /></TabsContent>
        <TabsContent value="monthly"><Board traders={monthly} /></TabsContent>
      </Tabs>
    </section>
  </>
);

export default LeaderboardPage;
