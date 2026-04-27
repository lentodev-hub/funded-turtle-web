import { Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const AnnouncementBar = () => (
  <div className="fixed top-0 inset-x-0 z-[60] bg-gradient-gold text-accent-foreground text-xs md:text-sm">
    <div className="container flex items-center justify-center gap-2 py-1.5 text-center">
      <Sparkles className="w-3.5 h-3.5 shrink-0" />
      <span className="font-medium">
        Limited offer: <span className="font-bold">25% OFF</span> all challenges this week —
      </span>
      <Link to="/challenges" className="underline font-bold hover:no-underline">
        Claim now
      </Link>
    </div>
  </div>
);

export default AnnouncementBar;
