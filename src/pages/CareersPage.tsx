import PageHeader from "@/components/PageHeader";
import { MapPin, Briefcase } from "lucide-react";

const jobs = [
  { title: "Senior Backend Engineer", team: "Engineering", location: "Remote (EU)", type: "Full-time" },
  { title: "Risk Analyst", team: "Risk", location: "Dubai, UAE", type: "Full-time" },
  { title: "Product Designer", team: "Design", location: "Remote (Worldwide)", type: "Full-time" },
  { title: "Trader Success Specialist", team: "Support", location: "Remote (Americas)", type: "Full-time" },
  { title: "Performance Marketing Lead", team: "Growth", location: "Dubai, UAE", type: "Full-time" },
  { title: "Content Writer (Trading)", team: "Marketing", location: "Remote", type: "Contract" },
];

const CareersPage = () => (
  <>
    <PageHeader
      eyebrow="Careers"
      title="Join the herd"
      description="We're a remote-first team obsessed with building the best prop trading experience in the world."
    />
    <section className="py-20 bg-background">
      <div className="container max-w-4xl">
        <h2 className="font-display font-bold text-2xl mb-6">Open positions</h2>
        <div className="space-y-3">
          {jobs.map((j) => (
            <div key={j.title} className="p-5 rounded-xl bg-gradient-card border border-border hover:shadow-elegant transition-all flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="font-display font-bold text-lg">{j.title}</h3>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                  <span className="flex items-center gap-1"><Briefcase className="w-3.5 h-3.5" /> {j.team}</span>
                  <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {j.location}</span>
                  <span>{j.type}</span>
                </div>
              </div>
              <a href="/contact" className="text-primary font-semibold text-sm hover:underline">Apply →</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  </>
);

export default CareersPage;
