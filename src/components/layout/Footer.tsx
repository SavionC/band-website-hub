import { Link } from "react-router-dom";
import { Instagram, Youtube, Music2 } from "lucide-react";

const Footer = () => {
  const socialLinks = [
    { icon: Instagram, label: "Instagram", href: "https://instagram.com/stagefright", color: "hover:text-pink-500" },
    { icon: Youtube, label: "YouTube", href: "https://youtube.com/@stagefr1ghtband?si=P0A80wztXzcGVNx5", color: "hover:text-red-500" },
    { icon: Music2, label: "Spotify", href: "https://spotify.com/stagefright", color: "hover:text-green-500" },
  ];

  const footerLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Music", path: "/music" },
    { name: "Shows", path: "/shows" },
    { name: "Booking", path: "/booking" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <footer className="bg-card border-t border-border pattern-overlay relative">
      <div className="container-custom py-12 md:py-16">
        {/* Top Section */}
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <h2 className="font-display text-3xl font-bold text-gradient-maroon glow-text-maroon">
              STAGE FRIGHT
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              A Multi-Genre Band Bringing Live Energy to Every Stage
            </p>
            <p className="text-sm text-muted-foreground">
              Based in Mumbai, India
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-display text-xl font-semibold text-foreground">
              Quick Links
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {footerLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-muted-foreground hover:text-maroon-bright transition-colors duration-300"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Social & Contact */}
          <div className="space-y-4">
            <h3 className="font-display text-xl font-semibold text-foreground">
              Connect With Us
            </h3>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className={`text-muted-foreground ${social.color} transition-colors duration-300`}
                >
                  <social.icon className="h-6 w-6" />
                </a>
              ))}
            </div>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>booking@stagefright.band</p>
              <p>+91 98765 43210</p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Stage Fright. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
