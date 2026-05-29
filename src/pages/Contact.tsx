import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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

const inputClass =
  "bg-background border border-sf-violet/40 rounded-none font-body text-foreground placeholder:text-foreground/40 focus-visible:ring-0 focus-visible:border-sf-violet focus-visible:shadow-[0_0_18px_hsl(var(--sf-violet)/0.55)] transition-shadow";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validation = contactSchema.safeParse(formData);
    if (!validation.success) {
      toast({ title: "Validation Error", description: validation.error.errors[0].message, variant: "destructive" });
      return;
    }

    setIsSubmitting(true);
    try {
      const { error: dbError } = await supabase.from("contact_submissions").insert({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || null,
        message: formData.message,
      });

      await supabase.functions.invoke("notify-band", {
        body: {
          type: "contact",
          name: formData.name,
          email: formData.email,
          phone: formData.phone || "",
          message: formData.message,
        },
      });

      if (dbError) throw dbError;

      toast({ title: "SIGNAL RECEIVED ◆", description: "We'll hit you back soon." });
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error: any) {
      toast({ title: "Transmission failed", description: error?.message || "Try again.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background crt-vignette">
      <Navigation />

      <section className="pt-32 pb-12">
        <div className="container-custom">
          <p className="font-mono text-xs tracking-[0.3em] text-sf-pink mb-4 animate-fade-in">◆ COMMS OPEN ◆</p>
          <h1 className="font-arcade text-xl md:text-3xl text-sf-violet glow-violet animate-fade-in">
            SEND A SIGNAL
          </h1>
          <p className="font-body text-foreground/70 max-w-xl mt-6 text-lg animate-fade-in">
            Bookings, press, collabs, or just a "hey". Drop us a transmission below.
          </p>
        </div>
      </section>

      <section className="pb-24">
        <div className="container-custom max-w-2xl">
          <form
            onSubmit={handleSubmit}
            className="bg-card border border-sf-violet/40 glow-border-violet p-6 md:p-10 space-y-6 animate-fade-in"
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="font-mono text-[11px] tracking-[0.25em] uppercase text-sf-violet">
                  ▸ Name
                </label>
                <Input id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Player name" className={inputClass} required />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="font-mono text-[11px] tracking-[0.25em] uppercase text-sf-violet">
                  ▸ Email
                </label>
                <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="you@signal.io" className={inputClass} required />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="phone" className="font-mono text-[11px] tracking-[0.25em] uppercase text-sf-violet">
                ▸ Phone (optional)
              </label>
              <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="+91 ..." className={inputClass} />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="font-mono text-[11px] tracking-[0.25em] uppercase text-sf-violet">
                ▸ Message
              </label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Type your transmission..."
                className={`${inputClass} min-h-[160px]`}
                maxLength={2000}
                required
              />
              <p className="font-mono text-[10px] tracking-[0.2em] text-foreground/50">
                {formData.message.length} / 2000
              </p>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full font-mono text-xs tracking-[0.3em] uppercase py-6 bg-sf-pink text-background hover:bg-sf-pink/90 rounded-none border border-sf-pink shadow-[0_0_24px_hsl(var(--sf-pink)/0.55)]"
            >
              {isSubmitting ? "TRANSMITTING..." : "▶ TRANSMIT"}
            </Button>
          </form>

          <div className="mt-10 grid sm:grid-cols-2 gap-4 font-mono text-sm">
            <a href="mailto:teamstagefright@gmail.com" className="bg-card border border-sf-violet/30 hover:border-sf-pink p-5 transition-colors block">
              <p className="text-[10px] tracking-[0.3em] uppercase text-sf-violet mb-2">▸ Email</p>
              <p className="text-foreground/85 break-all">teamstagefright@gmail.com</p>
            </a>
            <a href="https://wa.me/919867291626" target="_blank" rel="noopener noreferrer" className="bg-card border border-sf-violet/30 hover:border-sf-pink p-5 transition-colors block">
              <p className="text-[10px] tracking-[0.3em] uppercase text-sf-violet mb-2">▸ WhatsApp</p>
              <p className="text-foreground/85">+91 98672 91626</p>
            </a>
          </div>

          {/* EPK / Press Kit */}
          <div className="mt-6 bg-card border-l-2 border-sf-pink border-y border-r border-y-sf-violet/30 border-r-sf-violet/30 p-6 md:p-8 animate-fade-in">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
              <div>
                <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-sf-violet mb-2">
                  ▸ PRESS & PROMOTERS
                </p>
                <h3 className="font-arcade text-sm md:text-base text-foreground glow-pink mb-2">
                  EPK / PRESS KIT
                </h3>
                <p className="font-body text-foreground/70 text-sm leading-relaxed max-w-md">
                  Hi-res photos, band bio, tech rider & stage plot — packaged for press,
                  promoters and venues.
                </p>
              </div>
              <a
                href="mailto:teamstagefright@gmail.com?subject=EPK%20Request%20%E2%80%94%20Stage%20Fright&body=Hi%20team%2C%0A%0APlease%20send%20over%20the%20latest%20Stage%20Fright%20EPK.%0A%0AName%3A%0AOrg%2FPublication%3A%0APurpose%3A%0A%0AThanks!"
                className="shrink-0 text-center font-mono text-[11px] tracking-[0.3em] uppercase px-6 py-4 bg-sf-pink text-background hover:bg-sf-pink/90 transition-colors border border-sf-pink shadow-[0_0_24px_hsl(var(--sf-pink)/0.55)]"
              >
                ▶ REQUEST EPK
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
