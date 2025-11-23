import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar, Mail, Phone, MapPin, DollarSign } from "lucide-react";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { toast } from "@/hooks/use-toast";
import { z } from "zod";

const bookingSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  phone: z.string().trim().min(10, "Please enter a valid phone number").max(15, "Phone number must be less than 15 digits"),
  eventType: z.string().min(1, "Please select an event type"),
  venueLocation: z.string().trim().min(3, "Please enter venue location").max(200, "Venue location must be less than 200 characters"),
  eventDate: z.string().min(1, "Please select an event date"),
  budget: z.string().min(1, "Please select a budget range"),
  requirements: z.string().trim().max(1000, "Requirements must be less than 1000 characters"),
});

const Booking = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: "",
    venueLocation: "",
    eventDate: "",
    budget: "",
    requirements: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form data
    const validation = bookingSchema.safeParse(formData);
    if (!validation.success) {
      const firstError = validation.error.errors[0];
      toast({
        title: "Validation Error",
        description: firstError.message,
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call - in production, this would send to backend
    setTimeout(() => {
      toast({
        title: "Booking Request Received! 🎸",
        description: "We'll get back to you within 24 hours with a quote and availability.",
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        eventType: "",
        venueLocation: "",
        eventDate: "",
        budget: "",
        requirements: "",
      });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20 relative pattern-overlay">
        <div className="container-custom">
          <h1 className="font-display text-5xl md:text-7xl font-bold text-center text-gradient-maroon glow-text-maroon mb-6 animate-fade-in">
            Book Stage Fright
          </h1>
          <p className="text-xl md:text-2xl text-center text-muted-foreground max-w-3xl mx-auto animate-fade-in">
            Let's make your event unforgettable
          </p>
        </div>
      </section>

      {/* Booking Form Section */}
      <section className="section-padding bg-secondary/30">
        <div className="container-custom max-w-3xl">
          <Card className="bg-card border-maroon-bright/50 p-8 md:p-12 glow-border-maroon animate-fade-in">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div className="space-y-2">
                <label htmlFor="name" className="text-foreground font-semibold flex items-center gap-2">
                  <Mail className="h-4 w-4 text-maroon-bright" />
                  Full Name *
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  className="bg-background border-maroon-bright/30 focus:border-maroon-bright"
                  required
                />
              </div>

              {/* Email & Phone */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-foreground font-semibold flex items-center gap-2">
                    <Mail className="h-4 w-4 text-maroon-bright" />
                    Email *
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your@email.com"
                    className="bg-background border-maroon-bright/30 focus:border-maroon-bright"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-foreground font-semibold flex items-center gap-2">
                    <Phone className="h-4 w-4 text-maroon-bright" />
                    Phone *
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+91 98765 43210"
                    className="bg-background border-maroon-bright/30 focus:border-maroon-bright"
                    required
                  />
                </div>
              </div>

              {/* Event Type & Date */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="eventType" className="text-foreground font-semibold">
                    Event Type *
                  </label>
                  <Select
                    value={formData.eventType}
                    onValueChange={(value) => handleSelectChange("eventType", value)}
                    required
                  >
                    <SelectTrigger className="bg-background border-maroon-bright/30 focus:border-maroon-bright">
                      <SelectValue placeholder="Select event type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="wedding">Wedding</SelectItem>
                      <SelectItem value="corporate">Corporate Event</SelectItem>
                      <SelectItem value="concert">Concert</SelectItem>
                      <SelectItem value="private">Private Party</SelectItem>
                      <SelectItem value="festival">Festival</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="eventDate" className="text-foreground font-semibold flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-maroon-bright" />
                    Event Date *
                  </label>
                  <Input
                    id="eventDate"
                    name="eventDate"
                    type="date"
                    value={formData.eventDate}
                    onChange={handleInputChange}
                    className="bg-background border-maroon-bright/30 focus:border-maroon-bright"
                    min={new Date().toISOString().split("T")[0]}
                    required
                  />
                </div>
              </div>

              {/* Venue Location */}
              <div className="space-y-2">
                <label htmlFor="venueLocation" className="text-foreground font-semibold flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-maroon-bright" />
                  Venue Location *
                </label>
                <Input
                  id="venueLocation"
                  name="venueLocation"
                  type="text"
                  value={formData.venueLocation}
                  onChange={handleInputChange}
                  placeholder="Venue name and address"
                  className="bg-background border-maroon-bright/30 focus:border-maroon-bright"
                  required
                />
              </div>

              {/* Budget */}
              <div className="space-y-2">
                <label htmlFor="budget" className="text-foreground font-semibold flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-maroon-bright" />
                  Budget Range *
                </label>
                <Select
                  value={formData.budget}
                  onValueChange={(value) => handleSelectChange("budget", value)}
                  required
                >
                  <SelectTrigger className="bg-background border-maroon-bright/30 focus:border-maroon-bright">
                    <SelectValue placeholder="Select budget range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="under-50k">Under ₹50,000</SelectItem>
                    <SelectItem value="50k-1l">₹50,000 - ₹1,00,000</SelectItem>
                    <SelectItem value="1l-2l">₹1,00,000 - ₹2,00,000</SelectItem>
                    <SelectItem value="2l-5l">₹2,00,000 - ₹5,00,000</SelectItem>
                    <SelectItem value="above-5l">Above ₹5,00,000</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Extra Requirements */}
              <div className="space-y-2">
                <label htmlFor="requirements" className="text-foreground font-semibold">
                  Extra Requirements
                </label>
                <Textarea
                  id="requirements"
                  name="requirements"
                  value={formData.requirements}
                  onChange={handleInputChange}
                  placeholder="Special requests, song preferences, technical requirements, etc."
                  className="bg-background border-maroon-bright/30 focus:border-maroon-bright min-h-[120px]"
                  maxLength={1000}
                />
                <p className="text-sm text-muted-foreground">
                  {formData.requirements.length}/1000 characters
                </p>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="w-full text-lg py-6 bg-gradient-to-r from-maroon-bright to-maroon-neon hover:from-maroon-neon hover:to-maroon-bright text-white font-semibold shadow-[0_0_30px_hsl(var(--maroon-bright)/0.6)] hover:shadow-[0_0_40px_hsl(var(--maroon-bright)/0.8)] transition-all duration-300"
              >
                {isSubmitting ? "Submitting..." : "Submit Booking Request"}
              </Button>
            </form>
          </Card>

          {/* Contact Info */}
          <div className="mt-12 text-center space-y-4 animate-fade-in">
            <p className="text-muted-foreground text-lg">
              Prefer to call? Reach us at{" "}
              <a
                href="tel:+919876543210"
                className="text-maroon-bright hover:text-maroon-neon font-semibold transition-colors duration-300"
              >
                +91 98765 43210
              </a>
            </p>
            <p className="text-muted-foreground">
              Or email us at{" "}
              <a
                href="mailto:booking@stagefright.band"
                className="text-maroon-bright hover:text-maroon-neon font-semibold transition-colors duration-300"
              >
                booking@stagefright.band
              </a>
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Booking;
