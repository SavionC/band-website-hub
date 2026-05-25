import { Link } from "react-router-dom";
import { Instagram, Youtube, Music2 } from "lucide-react";

const Footer = () => {
  const socialLinks = [
    { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/stagefr1ght", color: "hover:text-pink-500" },
    { icon: Youtube, label: "YouTube", href: "https://youtube.com/@stagefr1ghtband?si=P0A80wztXzcGVNx5", color: "hover:text-red-500" },
    { icon: Music2, label: "Spotify", href: "https://spotify.com/stagefright", color: "hover:text-green-500" },
  ];

  const footerLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Music", path: "/music" },
    { name: "Shows", path: "/shows" },
    { name: "Gallery", path: "/gallery" },
    { name: "Booking", path: "/booking" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <footer className="bg-card border-t-2 border-neon-pink/60 pattern-overlay relative shadow-[0_-10px_30px_hsl(var(--neon-pink)/0.2)]">
      <div className="container-custom py-12 md:py-16">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div className="space-y-4">
            <h2 className="font-arcade text-lg text-gradient-maroon glow-text-maroon">
              STAGE FRIGHT
            </h2>
            <p className="font-retro text-xl text-neon-cyan leading-relaxed">
              ► A MULTI-GENRE BAND BRINGING LIVE ENERGY TO EVERY STAGE
            </p>
            <p className="font-arcade text-[10px] text-muted-foreground">
              ◆ BASED IN MUMBAI, INDIA ◆
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-arcade text-xs text-neon-yellow tracking-widest">
              ▸ QUICK LINKS
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {footerLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="font-retro text-lg text-muted-foreground hover:text-neon-cyan transition-colors duration-200"
                >
                  ▸ {link.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-arcade text-xs text-neon-yellow tracking-widest">
              ▸ CONNECT WITH US
            </h3>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="text-neon-cyan hover:text-neon-pink transition-all duration-200 hover:scale-110 hover:drop-shadow-[0_0_10px_hsl(var(--neon-pink))]"
                >
                  <social.icon className="h-6 w-6" />
                </a>
              ))}
            </div>
            <div className="space-y-2 font-retro text-lg text-muted-foreground">
              <a href="mailto:teamstagefright@gmail.com" className="hover:text-neon-cyan transition-colors duration-200 block">▸ teamstagefright@gmail.com</a>
              <a href="https://wa.me/919867291626" target="_blank" rel="noopener noreferrer" className="hover:text-neon-cyan transition-colors duration-200 block">▸ +91 98672 91626</a>
              <a href="https://wa.me/919136663411" target="_blank" rel="noopener noreferrer" className="hover:text-neon-cyan transition-colors duration-200 block">▸ +91 91366 63411</a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t-2 border-neon-pink/30 text-center font-arcade text-[10px] text-muted-foreground tracking-widest">
          <p>© {new Date().getFullYear()} STAGE FRIGHT ◆ GAME OVER ◆ INSERT COIN TO CONTINUE</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
