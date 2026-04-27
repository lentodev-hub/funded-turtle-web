import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "What platforms can I trade on?", a: "MT4, MT5, cTrader and TradeLocker — depending on the white-label provider you connect. Web, desktop and mobile are all supported." },
  { q: "How fast are payouts?", a: "Payouts are processed within 24 hours via crypto (USDT, BTC) or international wire transfer." },
  { q: "Are there any consistency or minimum-day rules?", a: "No. Hit the profit target whenever you're ready while respecting the drawdown rules — that's it." },
  { q: "What's the refund policy?", a: "Your challenge fee is fully refunded on your first successful payout from the funded account." },
  { q: "Can I trade news and hold positions overnight?", a: "Yes. News trading, weekend holds and EAs are all permitted on every plan." },
  { q: "How does Funded Turtle integrate with my brokerage?", a: "We're a fully white-label-ready front end. Plug in any compatible provider via the configuration file and you're live in minutes." },
];

const FAQ = () => (
  <section id="faq" className="py-24 bg-background">
    <div className="container max-w-3xl">
      <div className="text-center mb-12">
        <p className="text-sm font-semibold text-primary uppercase tracking-wider">FAQ</p>
        <h2 className="mt-3 font-display font-bold text-4xl md:text-5xl">Questions, answered</h2>
      </div>
      <Accordion type="single" collapsible className="space-y-3">
        {faqs.map((f, i) => (
          <AccordionItem key={i} value={`item-${i}`} className="bg-gradient-card border border-border rounded-xl px-5 shadow-soft">
            <AccordionTrigger className="text-left font-display font-semibold text-lg hover:no-underline">{f.q}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </section>
);

export default FAQ;
