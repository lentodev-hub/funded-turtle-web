import HowItWorks from "@/components/HowItWorks";
import PageHeader from "@/components/PageHeader";
import CTA from "@/components/CTA";

const HowItWorksPage = () => (
  <>
    <PageHeader
      eyebrow="How it works"
      title="Three steps to a funded account"
      description="From challenge purchase to your first payout — here's the full journey."
    />
    <HowItWorks />
    <CTA />
  </>
);

export default HowItWorksPage;
