import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Menu, X, LogOut } from "lucide-react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useUserRole } from "@/hooks/useUserRole";
import { toast } from "sonner";

const links = [
  { label: "Challenges", to: "/challenges" },
  { label: "Trades", to: "/trades" },
  { label: "Rules", to: "/trading-rules" },
  { label: "Scaling", to: "/scaling-plan" },
  { label: "Academy", to: "/academy" },
  { label: "Affiliates", to: "/affiliates" },
  { label: "Loyalty", to: "/loyalty" },
  { label: "Blog", to: "/blog" },
  { label: "About", to: "/about" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { isAdmin } = useUserRole();

  useEffect(() => { setOpen(false); }, [location.pathname]);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm transition-colors ${isActive ? "text-white font-semibold" : "text-white/70 hover:text-white"}`;

  const handleSignOut = async () => {
    await signOut();
    toast.success("Signed out");
    navigate("/");
  };

  return (
    <header className="fixed top-7 md:top-8 inset-x-0 z-50 bg-ocean-deep/70 backdrop-blur-xl border-b border-white/10">
      <div className="container flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2 font-display font-bold text-lg text-white">
          <span className="text-2xl">🐂</span>
          {location.pathname !== "/trades" && (
            <span>Funded <span className="text-gradient-gold">Ox</span></span>
          )}
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} className={linkClass} end={l.to === "/"}>
              {l.label}
            </NavLink>
          ))}
          {isAdmin && (
            <NavLink to="/admin" className={linkClass}>Admin</NavLink>
          )}
        </nav>
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              <span className="text-sm text-white/70 hidden lg:inline">
                {user.email}
              </span>
              <Button variant="ghost" className="text-white hover:bg-white/10 hover:text-white" onClick={handleSignOut}>
                <LogOut className="w-4 h-4" /> Sign out
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" className="text-white hover:bg-white/10 hover:text-white">Login</Button>
              </Link>
              <Link to="/signup">
                <Button variant="hero">Get Funded</Button>
              </Link>
            </>
          )}
        </div>
        <button className="md:hidden text-white" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-white/10 bg-ocean-deep/95 px-6 py-4 flex flex-col gap-4 animate-fade-in">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} className={linkClass} end={l.to === "/"}>
              {l.label}
            </NavLink>
          ))}
          {user ? (
            <Button variant="hero" className="w-full" onClick={handleSignOut}>Sign out</Button>
          ) : (
            <>
              <Link to="/login" className="text-white/90">Login</Link>
              <Link to="/signup">
                <Button variant="hero" className="w-full">Get Funded</Button>
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
