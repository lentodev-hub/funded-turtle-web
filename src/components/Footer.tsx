import { whiteLabel } from "@/config/whiteLabel";

const Footer = () => (
  <footer className="bg-ocean-deep text-white/70 py-12 border-t border-white/10">
    <div className="container grid md:grid-cols-4 gap-8">
      <div className="md:col-span-2">
        <div className="flex items-center gap-2 font-display font-bold text-lg text-white">
          <span className="text-2xl">🐢</span>
          <span>Funded <span className="text-gradient-gold">Turtle</span></span>
        </div>
        <p className="mt-3 text-sm max-w-sm">{whiteLabel.brand.tagline}</p>
        <p className="mt-4 text-xs text-white/50">Powered by <span className="text-white/80">{whiteLabel.provider.name}</span></p>
      </div>
      <div>
        <h4 className="text-white font-semibold mb-3 text-sm">Product</h4>
        <ul className="space-y-2 text-sm">
          <li><a href="#challenges" className="hover:text-white">Challenges</a></li>
          <li><a href="#how" className="hover:text-white">How it works</a></li>
          <li><a href="#features" className="hover:text-white">Features</a></li>
        </ul>
      </div>
      <div>
        <h4 className="text-white font-semibold mb-3 text-sm">Company</h4>
        <ul className="space-y-2 text-sm">
          <li><a href="#faq" className="hover:text-white">FAQ</a></li>
          <li><a href={`mailto:${whiteLabel.brand.supportEmail}`} className="hover:text-white">Contact</a></li>
          <li><a href="#" className="hover:text-white">Terms</a></li>
        </ul>
      </div>
    </div>
    <div className="container mt-10 pt-6 border-t border-white/10 text-xs text-white/50 flex flex-wrap justify-between gap-3">
      <p>© {new Date().getFullYear()} {whiteLabel.brand.name}. All rights reserved.</p>
      <p>All accounts are demo / simulated. Trading involves risk.</p>
    </div>
  </footer>
);

export default Footer;
