import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock, Ticket } from "lucide-react";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";

const Shows = () => {
  const upcomingShows = [
    {
      date: "Jan 15, 2025",
      venue: "Blue Frog",
      city: "Mumbai",
      address: "Mathuradas Mill Compound, Lower Parel",
      time: "8:00 PM",
      ticketLink: "#",
      status: "On Sale",
    },
    {
      date: "Jan 28, 2025",
      venue: "Hard Rock Cafe",
      city: "Mumbai",
      address: "Worli",
      time: "9:00 PM",
      ticketLink: "#",
      status: "On Sale",
    },
    {
      date: "Feb 10, 2025",
      venue: "Phoenix Marketcity",
      city: "Mumbai",
      address: "Kurla West",
      time: "7:30 PM",
      ticketLink: "#",
      status: "On Sale",
    },
    {
      date: "Feb 22, 2025",
      venue: "Antisocial",
      city: "Mumbai",
      address: "Khar West",
      time: "9:30 PM",
      ticketLink: "#",
      status: "Limited",
    },
  ];

  const pastShows = [
    {
      date: "Dec 10, 2024",
      venue: "NCPA",
      city: "Mumbai",
      eventType: "Corporate Event",
    },
    {
      date: "Nov 25, 2024",
      venue: "The Leela",
      city: "Mumbai",
      eventType: "Wedding Reception",
    },
    {
      date: "Nov 12, 2024",
      venue: "Turf Club",
      city: "Mumbai",
      eventType: "Live Concert",
    },
    {
      date: "Oct 30, 2024",
      venue: "Bandra Fort Amphitheatre",
      city: "Mumbai",
      eventType: "Music Festival",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20 relative pattern-overlay">
        <div className="container-custom">
          <h1 className="font-display text-5xl md:text-7xl font-bold text-center text-gradient-maroon glow-text-maroon mb-6 animate-fade-in">
            Shows & Events
          </h1>
          <p className="text-xl md:text-2xl text-center text-muted-foreground max-w-3xl mx-auto animate-fade-in">
            Catch us live at these upcoming performances
          </p>
        </div>
      </section>

      {/* Upcoming Shows */}
      <section className="section-padding bg-secondary/30">
        <div className="container-custom">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-gradient-maroon mb-12 animate-fade-in">
            Upcoming Shows
          </h2>
          <div className="space-y-6 max-w-4xl mx-auto">
            {upcomingShows.map((show, index) => (
              <Card
                key={index}
                className="bg-card border-maroon-bright/30 hover:border-maroon-bright transition-all duration-500 animate-fade-in glow-border-maroon"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="p-6 md:p-8">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-4 flex-1">
                      <div className="flex items-center gap-3 text-maroon-bright font-semibold text-lg">
                        <Calendar className="h-5 w-5" />
                        <span>{show.date}</span>
                      </div>
                      <h3 className="font-heading text-3xl font-bold text-foreground">
                        {show.venue}
                      </h3>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          <span>
                            {show.address}, {show.city}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>{show.time}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            show.status === "Limited"
                              ? "bg-yellow-500/20 text-yellow-500"
                              : "bg-green-500/20 text-green-500"
                          }`}
                        >
                          {show.status}
                        </span>
                      </div>
                    </div>
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-maroon-bright to-maroon-neon hover:from-maroon-neon hover:to-maroon-bright text-white font-semibold shadow-[0_0_20px_hsl(var(--maroon-bright)/0.5)] hover:shadow-[0_0_30px_hsl(var(--maroon-bright)/0.7)] transition-all duration-300"
                    >
                      <Ticket className="mr-2 h-5 w-5" />
                      Get Tickets
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Past Shows */}
      <section className="section-padding relative">
        <div className="container-custom">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-gradient-maroon mb-12 animate-fade-in">
            Past Performances
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {pastShows.map((show, index) => (
              <Card
                key={index}
                className="bg-card border-maroon-bright/20 hover:border-maroon-bright/50 transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                <div className="p-6 space-y-3">
                  <div className="text-maroon-bright/70 font-semibold">{show.date}</div>
                  <h3 className="font-heading text-xl font-bold text-foreground">
                    {show.venue}
                  </h3>
                  <div className="flex items-center gap-2 text-muted-foreground text-sm">
                    <MapPin className="h-4 w-4" />
                    <span>{show.city}</span>
                  </div>
                  <div className="pt-2">
                    <span className="text-sm text-maroon-bright font-semibold">
                      {show.eventType}
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-b from-background to-secondary/30 relative pattern-overlay">
        <div className="container-custom text-center">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-gradient-maroon mb-6 animate-fade-in">
            Book Stage Fright for Your Event
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in">
            From weddings to corporate events, from concerts to private parties - we bring
            the energy
          </p>
          <Link to="/booking">
            <Button
              size="lg"
              className="text-lg px-8 py-6 bg-gradient-to-r from-maroon-bright to-maroon-neon hover:from-maroon-neon hover:to-maroon-bright text-white font-semibold shadow-[0_0_30px_hsl(var(--maroon-bright)/0.6)] hover:shadow-[0_0_40px_hsl(var(--maroon-bright)/0.8)] transition-all duration-300 animate-fade-in"
            >
              Request Booking
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Shows;
