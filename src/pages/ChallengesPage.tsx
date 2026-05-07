import Challenges from "@/components/Challenges";
import PageHeader from "@/components/PageHeader";

const ChallengesPage = () => (
  <>
    <PageHeader
      eyebrow="Challenges"
      title="Choose your horns"
      description="One-step evaluation. Refundable fee. Same rules, scaled capital up to $200,000."
    />
    <Challenges />
  </>
);

export default ChallengesPage;
