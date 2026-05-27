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
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Music", path: "/music" },
    { name: "Shows", path: "/shows" },
    { name: "Gallery", path: "/gallery" },
    { name: "Contact", path: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/90 backdrop-blur-md border-b-2 border-neon-pink/60 shadow-[0_0_30px_hsl(var(--neon-pink)/0.4)]"
          : "bg-transparent"
      )}
    >
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="group flex items-center gap-2">
            <span className="font-arcade text-neon-yellow text-xs hidden sm:inline animate-pulse">◆</span>
            <h1 className="font-arcade text-base md:text-xl text-gradient-maroon glow-text-maroon transition-all duration-300 group-hover:scale-105 tracking-tight">
              STAGE FRIGHT
            </h1>
          </Link>

          <div className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "font-arcade text-[10px] uppercase tracking-widest text-foreground/80 hover:text-neon-cyan transition-colors duration-200 relative group",
                  location.pathname === item.path && "text-neon-cyan glow-text-cyan"
                )}
              >
                {location.pathname === item.path && <span className="mr-1 text-neon-pink">▶</span>}
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-neon-cyan transition-all duration-300 group-hover:w-full shadow-[0_0_10px_hsl(var(--neon-cyan))]" />
              </Link>
            ))}
            <Link to="/booking">
              <Button
                size="sm"
                className="font-arcade text-[10px] bg-neon-pink text-background hover:bg-neon-yellow hover:text-background border-2 border-neon-pink hover:border-neon-yellow rounded-none shadow-[0_0_20px_hsl(var(--neon-pink)/0.6)] hover:shadow-[0_0_30px_hsl(var(--neon-yellow)/0.8)] transition-all duration-200"
              >
                ▶ BOOK US
              </Button>
            </Link>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-neon-cyan hover:text-neon-pink hover:bg-transparent"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {isOpen && (
          <div className="lg:hidden mt-6 pb-6 flex flex-col gap-4 animate-fade-in-down border-t-2 border-neon-pink/40 pt-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "font-arcade text-xs uppercase tracking-widest text-foreground/80 hover:text-neon-cyan transition-colors duration-200",
                  location.pathname === item.path && "text-neon-cyan glow-text-cyan"
                )}
              >
                {location.pathname === item.path ? "▶ " : "  "}{item.name}
              </Link>
            ))}
            <Link to="/booking" className="mt-2">
              <Button
                size="lg"
                className="w-full font-arcade text-xs bg-neon-pink text-background hover:bg-neon-yellow hover:text-background border-2 border-neon-pink rounded-none"
              >
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
