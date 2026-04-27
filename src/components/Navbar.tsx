import { Button } from "@/components/ui/button";
import { whiteLabel } from "@/config/whiteLabel";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Challenges", href: "#challenges" },
  { label: "How it works", href: "#how" },
  { label: "Why us", href: "#features" },
  { label: "FAQ", href: "#faq" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-ocean-deep/70 backdrop-blur-xl border-b border-white/10">
      <div className="container flex items-center justify-between h-16">
        <a href="#" className="flex items-center gap-2 font-display font-bold text-lg text-white">
          <span className="text-2xl">🐢</span>
          <span>Funded <span className="text-gradient-gold">Turtle</span></span>
        </a>
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm text-white/80 hover:text-white transition-colors">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-3">
          <a href={whiteLabel.provider.loginUrl}>
            <Button variant="ghost" className="text-white hover:bg-white/10 hover:text-white">Login</Button>
          </a>
          <a href={whiteLabel.provider.signupUrl}>
            <Button variant="hero">Get Funded</Button>
          </a>
        </div>
        <button className="md:hidden text-white" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-white/10 bg-ocean-deep/95 px-6 py-4 flex flex-col gap-4 animate-fade-in">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-white/90">{l.label}</a>
          ))}
          <a href={whiteLabel.provider.signupUrl}>
            <Button variant="hero" className="w-full">Get Funded</Button>
          </a>
        </div>
      )}
    </header>
  );
};

export default Navbar;
