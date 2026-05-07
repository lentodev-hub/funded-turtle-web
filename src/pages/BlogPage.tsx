import PageHeader from "@/components/PageHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

const posts = [
  {
    tag: "Risk management",
    title: "Why the 1% rule still beats every fancy strategy",
    excerpt: "Drawdown control is the difference between a 3-month funded trader and a 3-year one.",
    date: "Apr 22, 2026",
  },
  {
    tag: "Psychology",
    title: "Trading like a turtle: the patience edge",
    excerpt: "The original Turtle Traders made millions by waiting. Here's how to apply it on a funded account.",
    date: "Apr 15, 2026",
  },
  {
    tag: "Strategy",
    title: "Passing a $200K challenge in 11 days",
    excerpt: "A breakdown of the exact trades, lot sizes and entry logic from one of our top performers.",
    date: "Apr 02, 2026",
  },
  {
    tag: "Platform",
    title: "MT5 vs cTrader for funded accounts in 2026",
    excerpt: "Latency, depth-of-market, automation — which platform actually gives you the edge?",
    date: "Mar 28, 2026",
  },
  {
    tag: "Payouts",
    title: "How we process payouts in under 24 hours",
    excerpt: "A peek behind the curtain at our crypto and wire pipeline.",
    date: "Mar 19, 2026",
  },
  {
    tag: "Education",
    title: "5 mistakes that fail 80% of challenge attempts",
    excerpt: "Avoid these and your odds of getting funded jump dramatically.",
    date: "Mar 10, 2026",
  },
];

const BlogPage = () => (
  <>
    <PageHeader
      eyebrow="Insights"
      title="The Funded Ox blog"
      description="Strategy, psychology and behind-the-scenes from the world of prop trading."
    />
    <section className="py-20 bg-background">
      <div className="container grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((p) => (
          <Card key={p.title} className="bg-gradient-card border-border shadow-soft hover:shadow-elegant hover:-translate-y-1 transition-all cursor-pointer group">
            <CardHeader>
              <div className="text-xs font-semibold text-primary uppercase tracking-wider">{p.tag}</div>
              <CardTitle className="text-xl font-display mt-2 group-hover:text-primary transition-colors">{p.title}</CardTitle>
              <CardDescription>{p.date}</CardDescription>
            </CardHeader>
            <CardContent className="text-muted-foreground text-sm">
              <p>{p.excerpt}</p>
              <div className="mt-4 inline-flex items-center gap-1 text-primary text-sm font-semibold">
                Read more <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  </>
);

export default BlogPage;
