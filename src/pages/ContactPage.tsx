import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MessageCircle, MapPin } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { whiteLabel } from "@/config/whiteLabel";

const ContactPage = () => {
  const [loading, setLoading] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      toast.success("Message sent! We'll get back to you within 24 hours.");
      (e.target as HTMLFormElement).reset();
      setLoading(false);
    }, 700);
  };

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="We're here to help"
        description="Questions about challenges, payouts or partnerships — our team replies within 24 hours."
      />
      <section className="py-20 bg-background">
        <div className="container grid lg:grid-cols-3 gap-10 max-w-5xl">
          <div className="space-y-6 lg:col-span-1">
            {[
              { icon: Mail, title: "Email", value: whiteLabel.brand.supportEmail },
              { icon: MessageCircle, title: "Live chat", value: "24/7 in-app" },
              { icon: MapPin, title: "HQ", value: "Dubai, UAE" },
            ].map((c) => (
              <div key={c.title} className="p-5 rounded-xl bg-gradient-card border border-border flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center text-primary-foreground shrink-0">
                  <c.icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-semibold">{c.title}</div>
                  <div className="text-sm text-muted-foreground">{c.value}</div>
                </div>
              </div>
            ))}
          </div>
          <form onSubmit={onSubmit} className="lg:col-span-2 p-8 rounded-2xl bg-gradient-card border border-border shadow-soft space-y-5">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" required className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" required className="mt-1.5" />
              </div>
            </div>
            <div>
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" required className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" required rows={6} className="mt-1.5" />
            </div>
            <Button type="submit" variant="hero" size="lg" disabled={loading}>
              {loading ? "Sending..." : "Send message"}
            </Button>
          </form>
        </div>
      </section>
    </>
  );
};

export default ContactPage;
