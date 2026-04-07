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
      link: "tel:+919867291626",
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
            {contactInfo.map((info, index) => (
              <Card
                key={info.label}
                className="bg-card border-maroon-bright/30 hover:border-maroon-bright p-8 text-center group transition-all duration-500 animate-fade-in glow-border-maroon"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="space-y-4">
                  <div className="flex justify-center">
                    <info.icon className={`h-12 w-12 ${info.color} group-hover:scale-110 transition-transform duration-300`} />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-foreground">
                    {info.label}
                  </h3>
                  {info.link ? (
                    <a
                      href={info.link}
                      className="text-muted-foreground hover:text-maroon-bright transition-colors duration-300 block"
                    >
                      {info.value}
                    </a>
                  ) : (
                    <p className="text-muted-foreground">{info.value}</p>
                  )}
                </div>
              </Card>
            ))}
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

      {/* Business Hours Section */}
      <section className="section-padding bg-secondary/30 pattern-overlay">
        <div className="container-custom max-w-3xl">
          <Card className="bg-card border-maroon-bright/50 p-8 md:p-12 text-center glow-border-maroon animate-fade-in">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-gradient-maroon mb-6">
              Business Hours
            </h2>
            <div className="space-y-4 text-lg">
              <div className="flex justify-between max-w-md mx-auto">
                <span className="text-muted-foreground">Monday - Friday</span>
                <span className="text-foreground font-semibold">10:00 AM - 8:00 PM</span>
              </div>
              <div className="flex justify-between max-w-md mx-auto">
                <span className="text-muted-foreground">Saturday</span>
                <span className="text-foreground font-semibold">11:00 AM - 6:00 PM</span>
              </div>
              <div className="flex justify-between max-w-md mx-auto">
                <span className="text-muted-foreground">Sunday</span>
                <span className="text-foreground font-semibold">Closed</span>
              </div>
            </div>
            <p className="mt-8 text-muted-foreground">
              For urgent bookings or inquiries outside business hours, please call or
              WhatsApp us at{" "}
              <a
                href="tel:+919876543210"
                className="text-maroon-bright hover:text-maroon-neon font-semibold transition-colors duration-300"
              >
                +91 98765 43210
              </a>
            </p>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding relative">
        <div className="container-custom text-center">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-gradient-maroon mb-6 animate-fade-in">
            Ready to Book?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in">
            Fill out our booking form and we'll get back to you within 24 hours
          </p>
          <a href="/booking" className="inline-block">
            <button className="px-8 py-4 bg-gradient-to-r from-maroon-bright to-maroon-neon hover:from-maroon-neon hover:to-maroon-bright text-white font-semibold text-lg rounded-lg shadow-[0_0_30px_hsl(var(--maroon-bright)/0.6)] hover:shadow-[0_0_40px_hsl(var(--maroon-bright)/0.8)] transition-all duration-300 animate-fade-in">
              Book Stage Fright
            </button>
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
