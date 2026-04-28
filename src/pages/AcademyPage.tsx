import PageHeader from "@/components/PageHeader";
import CTA from "@/components/CTA";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BookOpen, Video, Award, Brain, LineChart, Target } from "lucide-react";

const courses = [
  { icon: BookOpen, level: "Beginner", title: "Trading Foundations", lessons: "12 lessons", desc: "Markets, instruments, order types and your first trade plan." },
  { icon: LineChart, level: "Intermediate", title: "Technical Analysis Mastery", lessons: "18 lessons", desc: "Price action, structure, supply & demand and high-probability setups." },
  { icon: Brain, level: "Intermediate", title: "Trading Psychology", lessons: "10 lessons", desc: "Discipline, journaling and managing tilt under live capital." },
  { icon: Target, level: "Advanced", title: "Risk & Position Sizing", lessons: "8 lessons", desc: "Kelly, fixed fractional and surviving the drawdown that ends careers." },
  { icon: Video, level: "Advanced", title: "Pass the Challenge", lessons: "14 lessons", desc: "Session-by-session breakdown of how funded traders pass evaluations." },
  { icon: Award, level: "Pro", title: "Scaling to $1M", lessons: "9 lessons", desc: "Compounding, account management and the journey from $10K to seven figures." },
];

const AcademyPage = () => (
  <>
    <PageHeader
      eyebrow="Academy"
      title="Free education for serious traders"
      description="Six structured courses, hours of video, and the same playbook our top funded traders use."
    />
    <section className="py-20 bg-background">
      <div className="container grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((c) => (
          <Card key={c.title} className="bg-gradient-card border-border shadow-soft hover:shadow-elegant hover:-translate-y-1 transition-all">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="w-11 h-11 rounded-xl bg-gradient-primary flex items-center justify-center text-primary-foreground">
                  <c.icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold px-2 py-1 rounded-full bg-secondary text-secondary-foreground">{c.level}</span>
              </div>
              <CardTitle className="text-xl font-display mt-3">{c.title}</CardTitle>
              <CardDescription>{c.lessons}</CardDescription>
            </CardHeader>
            <CardContent className="text-muted-foreground text-sm">{c.desc}</CardContent>
          </Card>
        ))}
      </div>
    </section>
    <CTA />
  </>
);

export default AcademyPage;
