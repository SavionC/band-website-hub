import { Card } from "@/components/ui/card";
import { Music as MusicIcon, Play, Image } from "lucide-react";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import performance1 from "@/assets/performance-1.jpg";
import venue1 from "@/assets/venue-1.jpg";

const Music = () => {
  const videos = [
    { id: 1, title: "Live at Blue Frog Mumbai", platform: "YouTube" },
    { id: 2, title: "Acoustic Session - Bollywood Mashup", platform: "Instagram" },
    { id: 3, title: "Corporate Event Highlights", platform: "YouTube" },
    { id: 4, title: "Wedding Performance", platform: "Instagram" },
    { id: 5, title: "Rock Night Special", platform: "YouTube" },
    { id: 6, title: "Behind The Scenes", platform: "Instagram" },
  ];

  const photoGallery = [
    { id: 1, src: performance1, alt: "Live Performance" },
    { id: 2, src: venue1, alt: "Venue Setup" },
    { id: 3, src: performance1, alt: "Band on Stage" },
    { id: 4, src: venue1, alt: "Concert Crowd" },
    { id: 5, src: performance1, alt: "Practice Session" },
    { id: 6, src: venue1, alt: "Backstage" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20 relative pattern-overlay">
        <div className="container-custom">
          <h1 className="font-display text-5xl md:text-7xl font-bold text-center text-gradient-maroon glow-text-maroon mb-6 animate-fade-in">
            Music & Media
          </h1>
          <p className="text-xl md:text-2xl text-center text-muted-foreground max-w-3xl mx-auto animate-fade-in">
            Watch our performances and explore our gallery
          </p>
        </div>
      </section>

      {/* Video Section */}
      <section className="section-padding bg-secondary/30">
        <div className="container-custom">
          <div className="flex items-center justify-center gap-3 mb-12">
            <Play className="h-8 w-8 text-maroon-bright" />
            <h2 className="font-display text-4xl md:text-5xl font-bold text-gradient-maroon animate-fade-in">
              Video Performances
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video, index) => (
              <Card
                key={video.id}
                className="bg-card border-maroon-bright/30 hover:border-maroon-bright overflow-hidden group cursor-pointer transition-all duration-500 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative aspect-video bg-gradient-to-br from-maroon-deep/70 to-maroon-bright/70 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                  <Play className="h-16 w-16 text-maroon-neon drop-shadow-[0_0_15px_hsl(var(--maroon-neon))] group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-foreground group-hover:text-maroon-bright transition-colors duration-300">
                    {video.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">{video.platform}</p>
                </div>
              </Card>
            ))}
          </div>
          <p className="text-center text-muted-foreground mt-10 text-lg">
            Watch more on{" "}
            <a
              href="https://youtube.com/@stagefright"
              target="_blank"
              rel="noopener noreferrer"
              className="text-maroon-bright hover:text-maroon-neon font-semibold transition-colors duration-300"
            >
              YouTube
            </a>{" "}
            and{" "}
            <a
              href="https://instagram.com/stagefright"
              target="_blank"
              rel="noopener noreferrer"
              className="text-maroon-bright hover:text-maroon-neon font-semibold transition-colors duration-300"
            >
              Instagram
            </a>
          </p>
        </div>
      </section>

      {/* Photo Gallery Section */}
      <section className="section-padding relative">
        <div className="container-custom">
          <div className="flex items-center justify-center gap-3 mb-12">
            <Image className="h-8 w-8 text-maroon-bright" />
            <h2 className="font-display text-4xl md:text-5xl font-bold text-gradient-maroon animate-fade-in">
              Photo Gallery
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {photoGallery.map((photo, index) => (
              <Card
                key={photo.id}
                className="aspect-square bg-card border-maroon-bright/30 hover:border-maroon-bright overflow-hidden group cursor-pointer transition-all duration-500 animate-scale-in"
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Audio Player Section */}
      <section className="section-padding bg-secondary/30 pattern-overlay">
        <div className="container-custom max-w-4xl">
          <div className="flex items-center justify-center gap-3 mb-12">
            <MusicIcon className="h-8 w-8 text-maroon-bright" />
            <h2 className="font-display text-4xl md:text-5xl font-bold text-gradient-maroon animate-fade-in">
              Listen to Our Music
            </h2>
          </div>
          <Card className="bg-card border-maroon-bright/50 p-8 glow-border-maroon">
            <div className="text-center space-y-6">
              <p className="text-lg text-muted-foreground">
                Stream our music on your favorite platform
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://spotify.com/stagefright"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-600 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Open on Spotify
                </a>
                <a
                  href="https://music.youtube.com/stagefright"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-600 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Open on YouTube Music
                </a>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Music;
