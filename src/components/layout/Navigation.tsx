import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Music", path: "/music" },
    { name: "Shows", path: "/shows" },
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
          ? "bg-background/95 backdrop-blur-md shadow-lg border-b border-border"
          : "bg-transparent"
      )}
    >
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="group">
            <h1 className="font-display text-3xl md:text-4xl font-bold text-gradient-maroon glow-text-maroon transition-all duration-300 group-hover:scale-105">
              STAGE FRIGHT
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "text-foreground hover:text-maroon-bright transition-colors duration-300 font-medium text-lg relative group",
                  location.pathname === item.path && "text-maroon-bright"
                )}
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-maroon-bright to-maroon-neon transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
            <Link to="/booking">
              <Button
                size="lg"
                className="bg-gradient-to-r from-maroon-bright to-maroon-neon hover:from-maroon-neon hover:to-maroon-bright text-white font-semibold shadow-[0_0_20px_hsl(var(--maroon-bright)/0.5)] hover:shadow-[0_0_30px_hsl(var(--maroon-bright)/0.7)] transition-all duration-300"
              >
                Book Us
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-maroon-bright hover:text-maroon-neon"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden mt-6 pb-6 flex flex-col gap-4 animate-fade-in-down border-t border-border pt-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "text-foreground hover:text-maroon-bright transition-colors duration-300 font-medium text-lg",
                  location.pathname === item.path && "text-maroon-bright"
                )}
              >
                {item.name}
              </Link>
            ))}
            <Link to="/booking" className="mt-2">
              <Button
                size="lg"
                className="w-full bg-gradient-to-r from-maroon-bright to-maroon-neon text-white font-semibold"
              >
                Book Us
              </Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
