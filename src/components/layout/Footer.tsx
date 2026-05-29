import { Link } from "react-router-dom";
import { Instagram, Youtube } from "lucide-react";
import logoNeon from "@/assets/logo-neon.png";

const Footer = () => {
  const socialLinks = [
    { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/stagefr1ght" },
    { icon: Youtube, label: "YouTube", href: "https://youtube.com/@stagefr1ghtband?si=P0A80wztXzcGVNx5" },
  ];


  const footerLinks = [
    { name: "HOME", path: "/" },
    { name: "MUSIC", path: "/music" },
    { name: "ABOUT", path: "/about" },
    { name: "SHOWS", path: "/shows" },
    { name: "GALLERY", path: "/gallery" },
    { name: "CONTACT", path: "/contact" },
  ];

  return (
    <footer className="relative bg-card/60">
      {/* Top gradient line: pink → violet → transparent */}
      <div className="h-px w-full bg-gradient-to-r from-sf-pink via-sf-violet to-transparent shadow-[0_0_18px_hsl(var(--sf-violet)/0.5)]" />

      <div className="container-custom py-14 md:py-20">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div className="space-y-4">
            <img src={logoNeon} alt="Stage Fright" className="h-12 md:h-14 w-auto drop-shadow-[0_0_22px_hsl(var(--sf-violet)/0.9)]" />
            <p className="font-body text-sm text-foreground/75 leading-relaxed max-w-xs">
              Dark synth rock from Mumbai. Debut single <span className="text-sf-pink">Game Night</span> — July 4.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-mono text-[11px] uppercase tracking-[0.25em] text-sf-violet">▸ Navigate</h3>
            <div className="grid grid-cols-2 gap-2">
              {footerLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="font-mono text-xs tracking-[0.18em] text-foreground/70 hover:text-sf-pink transition-colors"
                >
                  ▸ {link.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-mono text-[11px] uppercase tracking-[0.25em] text-sf-violet">▸ Signal</h3>
            <div className="flex gap-4">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="text-foreground/70 hover:text-sf-pink transition-colors hover:drop-shadow-[0_0_10px_hsl(var(--sf-pink))]"
                >
                  <s.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
            <div className="space-y-2 pt-1">
              <a
                href="mailto:teamstagefright@gmail.com"
                className="block bg-background/60 border-l-2 border-sf-violet px-3 py-2 hover:border-sf-pink hover:bg-background/80 transition-colors group"
              >
                <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-foreground/55 group-hover:text-sf-pink">▸ Manager</p>
                <p className="font-body text-sm text-foreground break-all">teamstagefright@gmail.com</p>
              </a>
              <a
                href="https://wa.me/919867291626"
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-background/60 border-l-2 border-sf-violet px-3 py-2 hover:border-sf-pink hover:bg-background/80 transition-colors group"
              >
                <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-foreground/55 group-hover:text-sf-pink">▸ Bookings</p>
                <p className="font-body text-sm text-foreground">+91 98672 91626</p>
              </a>
            </div>

          </div>
        </div>

        <div className="pt-6 border-t border-sf-violet/20 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="font-mono text-[10px] tracking-[0.3em] text-foreground/55">
            MUMBAI · INDIA · 2025
          </p>
          <p className="font-mono text-[10px] tracking-[0.3em] text-foreground/45">
            © {new Date().getFullYear()} STAGE FRIGHT
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
