import { whiteLabel } from "@/config/whiteLabel";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-ocean-deep text-white/70 py-12 border-t border-white/10">
    <div className="container grid md:grid-cols-4 gap-8">
      <div className="md:col-span-2">
        <Link to="/" className="flex items-center gap-2 font-display font-bold text-lg text-white">
          <span className="text-2xl">🐢</span>
          <span>Funded <span className="text-gradient-gold">Turtle</span></span>
        </Link>
        <p className="mt-3 text-sm max-w-sm">{whiteLabel.brand.tagline}</p>
        <p className="mt-4 text-xs text-white/50">Powered by <span className="text-white/80">{whiteLabel.provider.name}</span></p>
      </div>
      <div>
        <h4 className="text-white font-semibold mb-3 text-sm">Trade</h4>
        <ul className="space-y-2 text-sm">
          <li><Link to="/challenges" className="hover:text-white">Challenges</Link></li>
          <li><Link to="/trading-rules" className="hover:text-white">Trading rules</Link></li>
          <li><Link to="/trading-objectives" className="hover:text-white">Trading objectives</Link></li>
          <li><Link to="/scaling-plan" className="hover:text-white">Scaling plan</Link></li>
          <li><Link to="/how-it-works" className="hover:text-white">How it works</Link></li>
        </ul>
      </div>
      <div>
        <h4 className="text-white font-semibold mb-3 text-sm">Company</h4>
        <ul className="space-y-2 text-sm">
          <li><Link to="/about" className="hover:text-white">About</Link></li>
          <li><Link to="/features" className="hover:text-white">Features</Link></li>
          <li><Link to="/blog" className="hover:text-white">Blog</Link></li>
          <li><Link to="/faq" className="hover:text-white">FAQ</Link></li>
          <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
          <li><Link to="/loyalty" className="hover:text-white">Loyalty program</Link></li>
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
