const stats = [
  { value: "$48M+", label: "Paid to traders" },
  { value: "12,400", label: "Funded accounts" },
  { value: "90%", label: "Max profit split" },
  { value: "<24h", label: "Payout speed" },
];

const Stats = () => (
  <section className="py-16 bg-background">
    <div className="container grid grid-cols-2 md:grid-cols-4 gap-6">
      {stats.map((s) => (
        <div key={s.label} className="text-center p-6 rounded-2xl bg-gradient-card shadow-soft border border-border">
          <div className="text-3xl md:text-4xl font-display font-extrabold text-gradient-primary">{s.value}</div>
          <div className="mt-2 text-sm text-muted-foreground">{s.label}</div>
        </div>
      ))}
    </div>
  </section>
);

export default Stats;
