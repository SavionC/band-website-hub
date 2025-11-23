import { Button } from "@/components/ui/button";
import { Instagram, Facebook, Youtube, Music } from "lucide-react";

const Contact = () => {
  const socialLinks = [
    { icon: Instagram, label: "Instagram", href: "#" },
    { icon: Facebook, label: "Facebook", href: "#" },
    { icon: Youtube, label: "YouTube", href: "#" },
    { icon: Music, label: "Spotify", href: "#" },
  ];

  return (
    <section id="contact" className="section-padding bg-secondary/30">
      <div className="container mx-auto max-w-4xl text-center">
        <h2 className="font-display text-5xl md:text-7xl mb-8 text-gradient animate-fade-in">
          CONNECT WITH US
        </h2>
        <p className="text-xl text-muted-foreground mb-12 animate-fade-in">
          Follow our journey and stay updated with the latest news, releases, and shows
        </p>
        <div className="flex gap-6 justify-center mb-12 animate-fade-in">
          {socialLinks.map((social) => (
            <Button
              key={social.label}
              size="lg"
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              asChild
            >
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
              >
                <social.icon className="h-6 w-6" />
              </a>
            </Button>
          ))}
        </div>
        <div className="space-y-4 text-muted-foreground animate-fade-in">
          <p>For booking inquiries: booking@electricrebel.com</p>
          <p>Press & Media: press@electricrebel.com</p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
