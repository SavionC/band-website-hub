import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar, MapPin, Music } from "lucide-react";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import MailingListPopup from "@/components/MailingListPopup";
import heroImage from "@/assets/hero-stage-fright.jpg";

const Index = () => {
  const upcomingShows = [
    {
      date: "Jan 15, 2025",
      venue: "Blue Frog",
      city: "Mumbai",
      time: "8:00 PM",
    },
    {
      date: "Jan 28, 2025",
      venue: "Hard Rock Cafe",
      city: "Mumbai",
      time: "9:00 PM",
    },
    {
      date: "Feb 10, 2025",
      venue: "Phoenix Marketcity",
      city: "Mumbai",
      time: "7:30 PM",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <MailingListPopup />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Video/Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />
        </div>

        {/* Animated pattern overlay */}
        <div className="absolute inset-0 pattern-overlay opacity-30" />

        {/* Content */}
        <div className="relative z-10 container-custom text-center space-y-8 pt-20">
          <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-bold text-gradient-maroon glow-text-maroon animate-fade-in">
            STAGE FRIGHT
          </h1>
          <p className="text-xl md:text-3xl font-heading text-foreground/90 max-w-3xl mx-auto animate-fade-in font-semibold">
            A Multi-Genre Band Bringing Live Energy to Every Stage
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in pt-4">
            <Link to="/booking">
              <Button
                size="lg"
                className="text-lg px-8 py-6 bg-gradient-to-r from-maroon-bright to-maroon-neon hover:from-maroon-neon hover:to-maroon-bright text-white font-semibold shadow-[0_0_30px_hsl(var(--maroon-bright)/0.6)] hover:shadow-[0_0_40px_hsl(var(--maroon-bright)/0.8)] transition-all duration-300"
              >
                Book Us Now
              </Button>
            </Link>
            <Link to="/music">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 border-2 border-maroon-bright text-maroon-bright hover:bg-maroon-bright hover:text-white font-semibold transition-all duration-300"
              >
                <Music className="mr-2 h-5 w-5" />
                Watch Performances
              </Button>
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-maroon-bright rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-maroon-bright rounded-full animate-glow-pulse" />
          </div>
        </div>
      </section>

      {/* Upcoming Shows Section */}
      <section className="section-padding bg-secondary/30 relative pattern-overlay">
        <div className="container-custom">
          <h2 className="font-display text-4xl md:text-6xl font-bold text-center text-gradient-maroon mb-12 animate-fade-in">
            Upcoming Shows
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {upcomingShows.map((show, index) => (
              <Card
                key={index}
                className="bg-card border-maroon-bright/30 hover:border-maroon-bright transition-all duration-500 animate-fade-in glow-border-maroon group"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-2 text-maroon-bright font-semibold">
                    <Calendar className="h-5 w-5" />
                    <span>{show.date}</span>
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-foreground group-hover:text-gradient-maroon transition-colors duration-300">
                    {show.venue}
                  </h3>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{show.city}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{show.time}</p>
                  <Button
                    variant="outline"
                    className="w-full border-maroon-bright/50 text-maroon-bright hover:bg-maroon-bright hover:text-white transition-all duration-300"
                  >
                    Get Tickets
                  </Button>
                </div>
              </Card>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/shows">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-maroon-bright text-maroon-bright hover:bg-maroon-bright hover:text-white font-semibold transition-all duration-300"
              >
                View All Shows
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Instagram Section */}
      <section className="section-padding relative">
        <div className="container-custom">
          <h2 className="font-display text-4xl md:text-6xl font-bold text-center text-gradient-maroon mb-12 animate-fade-in">
            Featured Performances
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[1, 2, 3, 4, 5].map((item, index) => (
              <Card
                key={item}
                className="aspect-square bg-card border-maroon-bright/30 hover:border-maroon-bright overflow-hidden group cursor-pointer transition-all duration-500 animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-full h-full bg-gradient-to-br from-maroon-deep/50 to-maroon-bright/50 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                  <Music className="h-12 w-12 text-maroon-bright/50 group-hover:text-maroon-neon transition-colors duration-300" />
                </div>
              </Card>
            ))}
          </div>
          <p className="text-center text-muted-foreground mt-8 animate-fade-in">
            Follow us on{" "}
            <a
              href="https://instagram.com/stagefright"
              target="_blank"
              rel="noopener noreferrer"
              className="text-maroon-bright hover:text-maroon-neon transition-colors duration-300 font-semibold"
            >
              Instagram
            </a>{" "}
            for more
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
