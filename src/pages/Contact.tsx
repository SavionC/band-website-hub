import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Instagram, Youtube, Music2, Send } from "lucide-react";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { toast } from "@/hooks/use-toast";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().trim().email("Invalid email address").max(255),
  phone: z.string().trim().max(15).optional(),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(2000),
});

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validation = contactSchema.safeParse(formData);
    if (!validation.success) {
      toast({ title: "Validation Error", description: validation.error.errors[0].message, variant: "destructive" });
      return;
    }

    setIsSubmitting(true);
    try {
      const id = crypto.randomUUID();
      const { error } = await supabase.from("contact_submissions").insert({
        id,
        name: formData.name,
        email: formData.email,
        phone: formData.phone || null,
        message: formData.message,
      });
      if (error) throw error;

      // Send notification email via Formspree
      await fetch("https://formspree.io/f/xgopqzwn", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          _subject: `📩 New Contact Message from ${formData.name}`,
          name: formData.name,
          email: formData.email,
          phone: formData.phone || "",
          message: formData.message,
        }),
      });

      toast({
        title: "Message Sent! 🎶",
        description: "We'll get back to you as soon as possible.",
      });
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error: any) {
      toast({ title: "Something went wrong", description: "Please try again or email us directly.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    { icon: Mail, label: "Email", value: "teamstagefright@gmail.com", link: "mailto:teamstagefright@gmail.com", color: "text-maroon-bright" },
    { icon: Phone, label: "Phone", value: "+91 98672 91626", link: "https://wa.me/919867291626", color: "text-maroon-bright" },
    { icon: MapPin, label: "Location", value: "Mumbai, Maharashtra, India", link: null, color: "text-maroon-bright" },
  ];

  const socialMedia = [
    { icon: Instagram, label: "Instagram", handle: "@stagefr1ght", link: "https://www.instagram.com/stagefr1ght", color: "hover:text-pink-500" },
    { icon: Youtube, label: "YouTube", handle: "@stagefr1ghtband", link: "https://youtube.com/@stagefr1ghtband?si=P0A80wztXzcGVNx5", color: "hover:text-red-500" },
    { icon: Music2, label: "Spotify", handle: "Stage Fright", link: "https://spotify.com/stagefright", color: "hover:text-green-500" },
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

      {/* Contact Form Section */}
      <section className="section-padding bg-secondary/30">
        <div className="container-custom max-w-3xl">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-gradient-maroon mb-12 text-center animate-fade-in">
            Send Us a Message
          </h2>
          <Card className="bg-card border-maroon-bright/50 p-8 md:p-12 glow-border-maroon animate-fade-in">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-foreground font-semibold flex items-center gap-2">
                    <Mail className="h-4 w-4 text-maroon-bright" /> Full Name *
                  </label>
                  <Input id="name" name="name" value={formData.name} onChange={handleInputChange} placeholder="Your name" className="bg-background border-maroon-bright/30 focus:border-maroon-bright" required />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-foreground font-semibold flex items-center gap-2">
                    <Mail className="h-4 w-4 text-maroon-bright" /> Email *
                  </label>
                  <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="your@email.com" className="bg-background border-maroon-bright/30 focus:border-maroon-bright" required />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="phone" className="text-foreground font-semibold flex items-center gap-2">
                  <Phone className="h-4 w-4 text-maroon-bright" /> Phone (Optional)
                </label>
                <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleInputChange} placeholder="+91 98765 43210" className="bg-background border-maroon-bright/30 focus:border-maroon-bright" />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-foreground font-semibold flex items-center gap-2">
                  <Send className="h-4 w-4 text-maroon-bright" /> Message *
                </label>
                <Textarea id="message" name="message" value={formData.message} onChange={handleInputChange} placeholder="Tell us about your event or inquiry..." className="bg-background border-maroon-bright/30 focus:border-maroon-bright min-h-[150px]" required maxLength={2000} />
                <p className="text-sm text-muted-foreground">{formData.message.length}/2000 characters</p>
              </div>
              <Button type="submit" size="lg" disabled={isSubmitting} className="w-full text-lg py-6 bg-gradient-to-r from-maroon-bright to-maroon-neon hover:from-maroon-neon hover:to-maroon-bright text-foreground font-semibold shadow-[0_0_30px_hsl(var(--maroon-bright)/0.6)] hover:shadow-[0_0_40px_hsl(var(--maroon-bright)/0.8)] transition-all duration-300">
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </Card>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="section-padding">
        <div className="container-custom max-w-4xl">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-gradient-maroon mb-12 text-center animate-fade-in">
            Contact Information
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {contactInfo.map((info, index) => {
              const CardInner = (
                <Card className="bg-card border-maroon-bright/30 hover:border-maroon-bright p-8 text-center group transition-all duration-500 animate-fade-in glow-border-maroon cursor-pointer" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="space-y-4">
                    <div className="flex justify-center">
                      <info.icon className={`h-12 w-12 ${info.color} group-hover:scale-110 transition-transform duration-300`} />
                    </div>
                    <h3 className="font-heading text-xl font-bold text-foreground">{info.label}</h3>
                    <p className="text-muted-foreground">{info.value}</p>
                  </div>
                </Card>
              );
              return info.link ? (
                <a key={info.label} href={info.link} target="_blank" rel="noopener noreferrer">{CardInner}</a>
              ) : (
                <div key={info.label}>{CardInner}</div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="section-padding bg-secondary/30">
        <div className="container-custom max-w-4xl">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-gradient-maroon mb-12 text-center animate-fade-in">
            Follow Us
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {socialMedia.map((social, index) => (
              <a key={social.label} href={social.link} target="_blank" rel="noopener noreferrer" className="group">
                <Card className="bg-card border-maroon-bright/30 hover:border-maroon-bright p-8 text-center group-hover:scale-105 transition-all duration-500 animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="space-y-4">
                    <div className="flex justify-center">
                      <social.icon className={`h-12 w-12 text-muted-foreground ${social.color} transition-colors duration-300`} />
                    </div>
                    <h3 className="font-heading text-xl font-bold text-foreground group-hover:text-maroon-bright transition-colors duration-300">{social.label}</h3>
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
