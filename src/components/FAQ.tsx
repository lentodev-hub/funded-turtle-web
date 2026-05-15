import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const fallback = [
  { question: "What platforms can I trade on?", answer: "MT4, MT5, cTrader and TradeLocker — depending on the white-label provider you connect. Web, desktop and mobile are all supported." },
  { question: "How fast are payouts?", answer: "Payouts are processed within 24 hours via crypto (USDT, BTC) or international wire transfer." },
  { question: "Are there any consistency or minimum-day rules?", answer: "No. Hit the profit target whenever you're ready while respecting the drawdown rules — that's it." },
  { question: "What's the refund policy?", answer: "Your challenge fee is fully refunded on your first successful payout from the funded account." },
  { question: "Can I trade news and hold positions overnight?", answer: "Yes. News trading, weekend holds and EAs are all permitted on every plan." },
  { question: "How does Funded Ox integrate with my brokerage?", answer: "We're a fully white-label-ready front end. Plug in any compatible provider via the configuration file and you're live in minutes." },
];

type Item = { question: string; answer: string };

const FAQ = () => {
  const [items, setItems] = useState<Item[]>(fallback);

  useEffect(() => {
    supabase.from("faq_items").select("question, answer").eq("published", true)
      .order("sort_order").order("created_at", { ascending: true })
      .then(({ data }) => {
        if (data && data.length) setItems(data as Item[]);
      });
  }, []);

  return (
    <section id="faq" className="py-24 bg-background">
      <div className="container max-w-3xl">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider">FAQ</p>
          <h2 className="mt-3 font-display font-bold text-4xl md:text-5xl">Questions, answered</h2>
        </div>
        <Accordion type="single" collapsible className="space-y-3">
          {items.map((f, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="bg-gradient-card border border-border rounded-xl px-5 shadow-soft">
              <AccordionTrigger className="text-left font-display font-semibold text-lg hover:no-underline">{f.question}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground prose prose-invert max-w-none" >
                <div dangerouslySetInnerHTML={{ __html: f.answer }} />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;
