import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Music, Users, Disc3 } from "lucide-react";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import MailingListPopup from "@/components/MailingListPopup";
import GamePopup from "@/components/GamePopup";
import ParticlesBackground from "@/components/ParticlesBackground";
import heroImage from "@/assets/hero-stage-fright.jpg";
import bandArcade from "@/assets/band-photo.jpg";

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
    <div className="min-h-screen bg-background crt-vignette">
      <Navigation />
      <MailingListPopup />
      <GamePopup />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
        </div>

        {/* Synthwave perspective grid floor */}
        <div className="absolute bottom-0 left-0 right-0 h-[50vh] overflow-hidden pointer-events-none">
          <div className="grid-floor absolute inset-x-[-50%] bottom-0 h-full" />
          <div className="absolute inset-x-0 bottom-1/2 h-px bg-gradient-to-r from-transparent via-neon-pink to-transparent shadow-[0_0_30px_hsl(var(--neon-pink))]" />
        </div>

        {/* Pixel grid */}
        <div className="absolute inset-0 pattern-overlay opacity-40" />

        <ParticlesBackground />

        {/* Scanlines */}
        <div className="absolute inset-0 scanlines opacity-40 pointer-events-none" />

        {/* Glowing arcade sun */}
        <div className="absolute top-[18%] left-1/2 -translate-x-1/2 w-72 h-72 md:w-[28rem] md:h-[28rem] rounded-full bg-gradient-to-b from-neon-yellow via-neon-pink to-neon-magenta opacity-30 blur-3xl pointer-events-none" />

        <div className="relative z-10 container-custom text-center space-y-8 pt-20">
          <div className="inline-block px-3 py-1 border border-neon-cyan/60 text-neon-cyan font-arcade text-[10px] tracking-widest animate-fade-in shadow-[0_0_15px_hsl(var(--neon-cyan)/0.5)]">
            ◆ INSERT COIN ◆ PLAYER 1 READY ◆
          </div>
          <h1 className="sr-only">Stage Fright</h1>
          <div className="relative mx-auto w-full max-w-md md:max-w-lg lg:max-w-xl animate-fade-in mt-4">
            <div className="absolute -inset-8 bg-gradient-to-r from-neon-pink/25 via-neon-magenta/15 to-neon-cyan/25 blur-3xl rounded-full pointer-events-none" />
            <img
              src={bandArcade}
              alt="Stage Fright band arcade characters on stage"
              className="relative w-full h-auto rounded-xl border-2 border-neon-pink/50 shadow-[0_0_50px_hsl(var(--neon-pink)/0.45),0_0_100px_hsl(var(--neon-cyan)/0.25)]"
            />
          </div>
          <p className="font-retro text-xl md:text-2xl lg:text-3xl text-neon-cyan glow-text-cyan max-w-3xl mx-auto animate-fade-in tracking-wide pt-6 md:pt-10">
            ► A MULTI-GENRE BAND BRINGING LIVE ENERGY TO EVERY STAGE ◄
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in pt-6 md:pt-8">
            <Link to="/booking">
              <Button
                size="lg"
                className="font-arcade text-xs md:text-sm px-8 py-6 bg-neon-pink text-background hover:bg-neon-magenta border-2 border-neon-pink hover:border-neon-yellow shadow-[0_0_30px_hsl(var(--neon-pink)/0.7),inset_0_0_15px_hsl(var(--neon-yellow)/0.3)] hover:shadow-[0_0_50px_hsl(var(--neon-pink)/0.9)] rounded-none transition-all duration-200 hover:-translate-y-0.5"
              >
                ▶ BOOK US NOW
              </Button>
            </Link>
            <Link to="/music">
              <Button
                size="lg"
                variant="outline"
                className="font-arcade text-xs md:text-sm px-8 py-6 border-2 border-neon-cyan text-neon-cyan hover:bg-neon-cyan hover:text-background bg-transparent rounded-none shadow-[0_0_20px_hsl(var(--neon-cyan)/0.5)] hover:shadow-[0_0_40px_hsl(var(--neon-cyan)/0.8)] transition-all duration-200 hover:-translate-y-0.5"
              >
                <Music className="mr-2 h-5 w-5" />
                PRESS START
              </Button>
            </Link>
          </div>

          <div className="flex items-center justify-center gap-6 pt-10 md:pt-14 font-arcade text-[10px] text-muted-foreground">
            <span>HI-SCORE</span>
            <span className="text-neon-yellow">999999</span>
            <span className="text-neon-pink">♥ ♥ ♥</span>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
          <div className="w-6 h-10 border-2 border-neon-cyan rounded-full flex items-start justify-center p-2 shadow-[0_0_15px_hsl(var(--neon-cyan)/0.6)]">
            <div className="w-1 h-3 bg-neon-cyan rounded-full" />
          </div>
        </div>
      </section>

      {/* Marquee ticker */}
      <div className="relative border-y-2 border-neon-pink/60 bg-background/80 overflow-hidden py-3 shadow-[0_0_20px_hsl(var(--neon-pink)/0.4)]">
        <div className="marquee-track flex whitespace-nowrap font-arcade text-xs md:text-sm">
          {Array.from({ length: 2 }).map((_, k) => (
            <div key={k} className="flex items-center gap-10 px-10 shrink-0">
              {["★ NEW SONG DROPPING SOON ★", "♪ PLAY THE ARCADE GAME ♪", "▶ BOOK NOW ◀", "♥ MUMBAI LIVE BAND ♥", "◆ STAGE FRIGHT ◆", "✦ MULTI-GENRE ✦"].map((t, i) => (
                <span key={i} className={i % 2 ? "text-neon-cyan" : "text-neon-pink"}>{t}</span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Shows Section */}
      <section className="section-padding bg-secondary/30 relative pattern-overlay">
        <div className="container-custom">
          <h2 className="font-arcade text-2xl md:text-4xl text-center text-gradient-maroon glow-text-maroon mb-4 animate-fade-in tracking-tight">
            ►► UPCOMING SHOWS ◄◄
          </h2>
          <p className="font-retro text-center text-neon-cyan text-xl mb-12">— LEVEL SELECT —</p>
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
          <h2 className="font-arcade text-2xl md:text-4xl text-center text-gradient-maroon glow-text-maroon mb-4 animate-fade-in tracking-tight">
            ★ FEATURED PERFORMANCES ★
          </h2>
          <p className="font-retro text-center text-neon-cyan text-xl mb-12">— HALL OF FAME —</p>
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
              href="https://www.instagram.com/stagefr1ght"
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
