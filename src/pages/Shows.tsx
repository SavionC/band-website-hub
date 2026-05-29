import { useState } from "react";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";

interface Show {
  date: string;
  venue: string;
  city: string;
}

const upcomingShows: Show[] = [
  // empty for now — shows "LEVEL LOADING..." state
];

const emailSchema = z.string().trim().email("Enter a valid email").max(255);

const Shows = () => {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    const valid = emailSchema.safeParse(email);
    if (!valid.success) {
      toast({ title: "Invalid email", description: valid.error.errors[0].message, variant: "destructive" });
      return;
    }

    setSubmitting(true);
    try {
      const { error } = await supabase.from("contact_submissions").insert({
        name: "MAILING LIST",
        email,
        phone: null,
        message: "▸ Shows page mailing-list signup — notify on next gig drop.",
      });
      if (error) throw error;

      toast({ title: "YOU'RE ON THE LIST ◆", description: "We'll ping you the second a show drops." });
      setEmail("");
    } catch (err: any) {
      toast({ title: "Signup failed", description: err?.message || "Try again.", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background crt-vignette">
      <Navigation />

      <section className="pt-32 pb-12">
        <div className="container-custom">
          <p className="font-mono text-xs tracking-[0.3em] text-sf-pink mb-4 animate-fade-in">◆ STAGE QUEUE ◆</p>
          <h1 className="font-arcade text-xl md:text-3xl text-sf-violet glow-violet animate-fade-in">
            UPCOMING LEVELS
          </h1>
        </div>
      </section>

      <section className="pb-24">
        <div className="container-custom max-w-3xl space-y-8">
          {upcomingShows.length === 0 ? (
            <div className="bg-card border border-sf-violet/30 p-10 md:p-16 text-center animate-fade-in">
              <p className="font-arcade text-base md:text-xl text-sf-violet glow-violet cursor-blink">
                LEVEL LOADING... STAY TUNED
              </p>
              <p className="mt-6 font-body text-foreground/70 max-w-md mx-auto">
                Show dates drop here as they're announced. Lock in the signal — follow us on
                Instagram for first dibs.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {upcomingShows.map((s, i) => (
                <article
                  key={i}
                  className="bg-card border border-sf-violet/30 border-l-4 border-l-sf-pink p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 hover:border-sf-violet transition-colors animate-fade-in"
                  style={{ animationDelay: `${i * 0.06}s` }}
                >
                  <div>
                    <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-sf-pink">
                      {s.date}
                    </p>
                    <h3 className="font-mono text-lg md:text-xl tracking-[0.18em] uppercase mt-2 text-foreground">
                      {s.venue}
                    </h3>
                    <p className="font-body text-foreground/65 mt-1">{s.city}</p>
                  </div>
                  <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-sf-violet border border-sf-violet/40 px-3 py-1.5 self-start md:self-auto">
                    ▶ DETAILS
                  </span>
                </article>
              ))}
            </div>
          )}

          {/* Mailing list capture */}
          <div className="bg-card border-l-2 border-sf-pink border-y border-r border-y-sf-violet/30 border-r-sf-violet/30 p-6 md:p-10 animate-fade-in">
            <div className="text-center space-y-2 mb-6">
              <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-sf-violet">
                ▸ INSERT COIN
              </p>
              <h2 className="font-arcade text-base md:text-xl text-foreground glow-pink leading-snug">
                HEAR IT FIRST
              </h2>
              <p className="font-body text-foreground/70 text-sm md:text-base max-w-md mx-auto">
                Join the mailing list. Show dates, ticket links and unreleased drops — straight
                to your inbox before anyone else.
              </p>
            </div>

            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@signal.io"
                required
                className="bg-background border border-sf-violet/40 rounded-none font-body text-foreground placeholder:text-foreground/40 focus-visible:ring-0 focus-visible:border-sf-violet focus-visible:shadow-[0_0_18px_hsl(var(--sf-violet)/0.55)] transition-shadow flex-1"
              />
              <Button
                type="submit"
                disabled={submitting}
                className="font-mono text-[11px] tracking-[0.3em] uppercase px-6 py-6 sm:py-2 bg-sf-pink text-background hover:bg-sf-pink/90 rounded-none border border-sf-pink shadow-[0_0_18px_hsl(var(--sf-pink)/0.55)]"
              >
                {submitting ? "..." : "▶ JOIN"}
              </Button>
            </form>
            <p className="mt-4 text-center font-mono text-[10px] tracking-[0.25em] uppercase text-foreground/45">
              No spam. Just signal.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Shows;
