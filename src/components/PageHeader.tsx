import AnimatedTurtle from "./AnimatedTurtle";

type Props = { eyebrow: string; title: string; description?: string };

const PageHeader = ({ eyebrow, title, description }: Props) => (
  <section className="relative overflow-hidden bg-hero text-white pt-32 pb-20">
    <div className="absolute inset-0 opacity-40 pointer-events-none">
      <div className="absolute -top-20 left-1/4 w-32 h-[500px] bg-turtle-glow/20 blur-3xl rotate-12" />
      <div className="absolute -top-20 right-1/3 w-40 h-[500px] bg-gold/10 blur-3xl -rotate-12" />
    </div>
    <div className="container relative grid md:grid-cols-[1fr_auto] gap-8 items-center">
      <div className="animate-fade-in-up">
        <p className="text-sm font-semibold uppercase tracking-wider text-gold">{eyebrow}</p>
        <h1 className="mt-3 font-display font-extrabold text-4xl md:text-5xl lg:text-6xl leading-tight">{title}</h1>
        {description && <p className="mt-4 text-lg text-white/75 max-w-2xl">{description}</p>}
      </div>
      <div className="hidden md:block w-48 h-48">
        <AnimatedTurtle className="w-full h-full" />
      </div>
    </div>
    <svg className="absolute bottom-0 inset-x-0 w-full" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden>
      <path d="M0 40 Q360 80 720 40 T1440 40 V80 H0 Z" fill="hsl(var(--background))" />
    </svg>
  </section>
);

export default PageHeader;
