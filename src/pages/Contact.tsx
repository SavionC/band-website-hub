import { Card } from "@/components/ui/card";
import { Mail, Phone, MapPin, Instagram, Youtube, Music2 } from "lucide-react";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";

const Contact = () => {
  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "teamstagefright@gmail.com",
      link: "mailto:teamstagefright@gmail.com?subject=Booking Inquiry&body=Hi, I want to book your band!",
      color: "text-maroon-bright",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+91 98672 91626",
      link: "https://wa.me/919867291626", // WhatsApp link
      color: "text-maroon-bright",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Mumbai, Maharashtra, India",
      link: null,
      color: "text-maroon-bright",
    },
  ];

  const socialMedia = [
    {
      icon: Instagram,
      label: "Instagram",
      handle: "@stagefright",
      link: "https://instagram.com/stagefright",
      color: "hover:text-pink-500",
    },
    {
      icon: Youtube,
      label: "YouTube",
      handle: "@StageFrightBand",
      link: "https://youtube.com/@stagefright",
      color: "hover:text-red-500",
    },
    {
      icon: Music2,
      label: "Spotify",
      handle: "Stage Fright",
      link: "https://spotify.com/stagefright",
      color: "hover:text-green-500",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20 relative pattern-overlay">
        <div className="container-custom">
          <h1 className="font-display text-5xl md:text-7xl font-bold text-center text-gradient-maroon glow-text-maroon mb-6 animate-fade-in">
            Get In Touch
          </h1>
          <p className="text-xl md:text-2xl text-center text-muted-foreground max-w-3xl mx-auto animate-fade-in">
            Let's discuss how we can make your event extraordinary
          </p>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="section-padding bg-secondary/30">
        <div className="container-custom max-w-4xl">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-gradient-maroon mb-12 text-center animate-fade-in">
            Contact Information
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {contactInfo.map((info, index) => {
              const CardContent = (
                <Card
                  className="bg-card border-maroon-bright/30 hover:border-maroon-bright p-8 text-center group transition-all duration-500 animate-fade-in glow-border-maroon cursor-pointer"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="space-y-4">
                    <div className="flex justify-center">
                      <info.icon className={`h-12 w-12 ${info.color} group-hover:scale-110 transition-transform duration-300`} />
                    </div>
                    <h3 className="font-heading text-xl font-bold text-foreground">
                      {info.label}
                    </h3>
                    <p className="text-muted-foreground">{info.value}</p>
                  </div>
                </Card>
              );

              return info.link ? (
                <a
                  key={info.label}
                  href={info.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {CardContent}
                </a>
              ) : (
                <div key={info.label}>{CardContent}</div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="section-padding relative">
        <div className="container-custom max-w-4xl">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-gradient-maroon mb-12 text-center animate-fade-in">
            Follow Us
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {socialMedia.map((social, index) => (
              <a
                key={social.label}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <Card
                  className="bg-card border-maroon-bright/30 hover:border-maroon-bright p-8 text-center group-hover:scale-105 transition-all duration-500 animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="space-y-4">
                    <div className="flex justify-center">
                      <social.icon className={`h-12 w-12 text-muted-foreground ${social.color} transition-colors duration-300`} />
                    </div>
                    <h3 className="font-heading text-xl font-bold text-foreground group-hover:text-maroon-bright transition-colors duration-300">
                      {social.label}
                    </h3>
                    <p className="text-muted-foreground">{social.handle}</p>
                  </div>
                </Card>
              </a>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;