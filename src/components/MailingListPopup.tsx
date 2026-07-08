import { useState, useEffect } from "react";
import { X, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { z } from "zod";

const emailSchema = z.string().trim().email({ message: "Please enter a valid email address" });

const MailingListPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
  const hasInteracted = localStorage.getItem("mailingListInteracted");

  if (!hasInteracted) {
    setIsVisible(true);
  }
}, []);
  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem("mailingListInteracted", "true");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email
    const validation = emailSchema.safeParse(email);
    if (!validation.success) {
      toast({
        title: "Invalid Email",
        description: validation.error.errors[0].message,
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Welcome to Stage Fright! 🎸",
        description: "You've been added to our mailing list. Get ready for exclusive updates!",
      });
      setEmail("");
      setIsSubmitting(false);
      handleClose();
    }, 1000);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed top-0 left-0 w-screen h-screen z-[9999] bg-background/80 backdrop-blur-sm animate-fade-in">
  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[95vw] max-w-md">
      <Card className="relative max-w-md w-full bg-card border-maroon-bright shadow-[0_0_40px_hsl(var(--maroon-bright)/0.3)] pattern-overlay">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
        >
          <X className="h-5 w-5" />
        </Button>

        <div className="p-8 space-y-6">
          <div className="text-center space-y-3">
            <div className="flex justify-center">
              <Mail className="h-12 w-12 text-maroon-bright animate-glow-pulse" />
            </div>
            <h2 className="font-display text-3xl font-bold text-gradient-maroon">
              Join Our Tribe
            </h2>
            <p className="text-muted-foreground">
              Get exclusive updates on new shows, releases, and behind-the-scenes content
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-background border-maroon-bright/50 focus:border-maroon-bright"
              required
            />
            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-maroon-bright to-maroon-neon hover:from-maroon-neon hover:to-maroon-bright text-white font-semibold shadow-[0_0_20px_hsl(var(--maroon-bright)/0.5)]"
            >
              {isSubmitting ? "Subscribing..." : "Subscribe Now"}
            </Button>
          </form>

          <button
            onClick={handleClose}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 text-center w-full"
          >
            No thanks, maybe later
          </button>
        </div>
      </Card>
      </div>
    </div>
  );
};

export default MailingListPopup;
