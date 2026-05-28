import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import logoNeon from "@/assets/logo-neon.png";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "HOME", path: "/" },
    { name: "MUSIC", path: "/music" },
    { name: "ABOUT", path: "/about" },
    { name: "SHOWS", path: "/shows" },
    { name: "GALLERY", path: "/gallery" },
    { name: "CONTACT", path: "/contact" },
  ];

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setIsOpen(false), [location]);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/90 backdrop-blur-md border-b border-sf-violet/40 shadow-[0_0_30px_hsl(var(--sf-violet)/0.25)]"
          : "bg-transparent"
      )}
    >
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="group flex items-center gap-2" aria-label="Stage Fright home">
            <img
              src={logoNeon}
              alt="Stage Fright logo"
              className="h-9 md:h-12 w-auto transition-transform duration-300 group-hover:scale-105 drop-shadow-[0_0_14px_hsl(var(--sf-violet)/0.7)]"
            />
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => {
              const active = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={cn(
                    "font-mono text-xs uppercase tracking-[0.2em] transition-colors duration-200 relative",
                    active ? "text-sf-pink" : "text-foreground/70 hover:text-sf-violet"
                  )}
                >
                  {item.name}
                  {active && (
                    <span className="absolute -bottom-2 left-0 right-0 h-px bg-sf-pink shadow-[0_0_8px_hsl(var(--sf-pink))]" />
                  )}
                </Link>
              );
            })}
            <Link to="/booking">
              <Button
                size="sm"
                className="font-mono text-[11px] tracking-[0.2em] uppercase bg-sf-pink text-background hover:bg-sf-pink/90 border border-sf-pink rounded-none shadow-[0_0_18px_hsl(var(--sf-pink)/0.55)]"
              >
                ▶ BOOK US
              </Button>
            </Link>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-sf-violet hover:text-sf-pink hover:bg-transparent"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {isOpen && (
          <div className="lg:hidden mt-6 pb-6 flex flex-col gap-5 border-t border-sf-violet/30 pt-6 animate-fade-in-down">
            {navItems.map((item) => {
              const active = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={cn(
                    "font-mono text-sm uppercase tracking-[0.2em]",
                    active ? "text-sf-pink" : "text-foreground/80 hover:text-sf-violet"
                  )}
                >
                  {active ? "▶ " : "  "}{item.name}
                </Link>
              );
            })}
            <Link to="/booking" className="mt-2">
              <Button className="w-full font-mono text-xs tracking-[0.2em] bg-sf-pink text-background hover:bg-sf-pink/90 rounded-none">
                ▶ BOOK US
              </Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
