import { Link } from "react-router-dom";
import { Wallet, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import logo from "../../assets/logo.png";

const links = [
  { href: "#home", label: "Home" },
  { href: "#features", label: "Features" },
  { href: "#pricing", label: "Pricing" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "glass shadow-[0_4px_20px_-8px_rgb(15_23_42_/_0.10)]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
           <div className="flex items-center gap-2">
                     <img src={logo} alt="logo" className="h-10 w-10 rounded-full" />
                     <h2 className="font-bold text-xl tracking-tight text-foreground">
                       Money<span className="text-gradient-brand">Manager</span>
                     </h2>
                   </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <a
                
                href={l.href}
                className="text-md font-medium text-muted-foreground hover:text-foreground transition-colors relative after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:gradient-brand after:transition-all hover:after:w-full"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/login"
              className="px-4 py-2 text-md font-semibold rounded border border-border text-foreground hover:bg-secondary transition-colors"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-5 py-2 text-md font-semibold rounded text-white gradient-brand shadow-[var(--shadow-glow)] hover:shadow-[0_25px_70px_-20px_rgb(37_99_235_/_0.55)] hover:-translate-y-0.5 transition-all"
            >
              Register
            </Link>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-lg text-foreground hover:bg-secondary"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {open && (
          <div className="md:hidden pb-4 space-y-2 animate-fade-up">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:bg-secondary"
              >
                {l.label}
              </a>
            ))}
            <div className="flex gap-2 pt-2">
              <Link to="/login" className="flex-1 text-center px-4 py-2 text-sm font-semibold rounded-full border border-border">Login</Link>
              <Link to="/signup" className="flex-1 text-center px-4 py-2 text-sm font-semibold rounded-full text-white gradient-brand">Register</Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}


export default Navbar;