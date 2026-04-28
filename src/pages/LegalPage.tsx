import PageHeader from "@/components/PageHeader";
import { useParams } from "react-router-dom";

const content: Record<string, { title: string; eyebrow: string; sections: { h: string; p: string }[] }> = {
  terms: {
    eyebrow: "Legal",
    title: "Terms of Service",
    sections: [
      { h: "1. Acceptance of terms", p: "By accessing Funded Turtle, you agree to these terms. All trading accounts are simulated demo environments unless explicitly stated otherwise." },
      { h: "2. Eligibility", p: "You must be 18+ and legally able to enter into contracts in your jurisdiction. Funded Turtle is not available in restricted countries." },
      { h: "3. Challenge fees", p: "Fees are non-refundable except as part of the first-payout refund policy described on the challenges page." },
      { h: "4. Prohibited conduct", p: "Latency arbitrage, hedging across accounts, and any abuse of simulated execution will result in immediate disqualification." },
      { h: "5. Limitation of liability", p: "Funded Turtle is not a broker. Nothing on this site constitutes financial advice. Trading involves substantial risk." },
    ],
  },
  privacy: {
    eyebrow: "Legal",
    title: "Privacy Policy",
    sections: [
      { h: "1. Data we collect", p: "Account info (name, email), KYC documents where required, trading activity on simulated accounts, and standard analytics." },
      { h: "2. How we use it", p: "To deliver the service, process payouts, prevent fraud, and improve the platform. We never sell your data." },
      { h: "3. Cookies", p: "We use essential cookies and privacy-friendly analytics. You can opt out of non-essential tracking at any time." },
      { h: "4. Your rights", p: "Access, export, correct, or delete your data anytime by contacting support." },
      { h: "5. Contact", p: "Privacy questions? Reach our DPO via the contact page." },
    ],
  },
  risk: {
    eyebrow: "Legal",
    title: "Risk Disclosure",
    sections: [
      { h: "Trading involves risk", p: "CFD and forex trading carry significant risk and may not be suitable for all investors. You can lose more than your initial investment." },
      { h: "Simulated environment", p: "Funded Turtle accounts are simulated. Past simulated performance does not guarantee future results in live markets." },
      { h: "No advice", p: "Nothing published by Funded Turtle constitutes investment, legal or tax advice. Consult a licensed professional." },
    ],
  },
};

const LegalPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const data = (slug && content[slug]) || content.terms;

  return (
    <>
      <PageHeader eyebrow={data.eyebrow} title={data.title} />
      <section className="py-20 bg-background">
        <div className="container max-w-3xl space-y-8">
          {data.sections.map((s) => (
            <div key={s.h}>
              <h2 className="font-display font-bold text-xl mb-2">{s.h}</h2>
              <p className="text-muted-foreground leading-relaxed">{s.p}</p>
            </div>
          ))}
          <p className="text-xs text-muted-foreground pt-8 border-t border-border">Last updated: April 2026</p>
        </div>
      </section>
    </>
  );
};

export default LegalPage;
