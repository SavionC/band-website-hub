import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import album1 from "@/assets/album-1.jpg";
import album2 from "@/assets/album-2.jpg";

const albums = [
  {
    title: "VOLTAGE",
    year: "2024",
    image: album1,
    tracks: 12,
  },
  {
    title: "NEON CHAOS",
    year: "2023",
    image: album2,
    tracks: 10,
  },
];

const Music = () => {
  return (
    <section id="music" className="section-padding">
      <div className="container mx-auto">
        <h2 className="font-display text-5xl md:text-7xl mb-12 text-center text-gradient animate-fade-in">
          LATEST RELEASES
        </h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {albums.map((album, index) => (
            <Card
              key={album.title}
              className="bg-card border-border overflow-hidden group hover:border-primary transition-all duration-500 animate-fade-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={album.image}
                  alt={album.title}
                  className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <Button
                    size="lg"
                    className="bg-primary hover:bg-primary/90 shadow-[0_0_20px_hsl(var(--primary)/0.5)]"
                  >
                    <Play className="mr-2 h-5 w-5" />
                    Play Album
                  </Button>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-display text-3xl mb-2 text-gradient">
                  {album.title}
                </h3>
                <p className="text-muted-foreground">
                  {album.year} • {album.tracks} Tracks
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Music;
