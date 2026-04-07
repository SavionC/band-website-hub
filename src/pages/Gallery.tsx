import { useState } from "react";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Play, X } from "lucide-react";

const galleryImages = [
  { src: "/placeholder.svg", alt: "Stage Fright performing live", caption: "Live at Mumbai" },
  { src: "/placeholder.svg", alt: "Band rehearsal session", caption: "Rehearsal Vibes" },
  { src: "/placeholder.svg", alt: "Crowd at concert", caption: "The Crowd Goes Wild" },
  { src: "/placeholder.svg", alt: "Backstage moments", caption: "Behind the Scenes" },
  { src: "/placeholder.svg", alt: "Stage setup", caption: "Setting the Stage" },
  { src: "/placeholder.svg", alt: "Band group photo", caption: "The Family" },
  { src: "/placeholder.svg", alt: "Solo performance", caption: "In the Zone" },
  { src: "/placeholder.svg", alt: "Acoustic set", caption: "Unplugged Session" },
];

const videoItems = [
  {
    id: "dQw4w9WgXcQ",
    title: "Stage Fright - Live Performance",
    thumbnail: "/placeholder.svg",
  },
  {
    id: "dQw4w9WgXcQ",
    title: "Behind the Scenes",
    thumbnail: "/placeholder.svg",
  },
  {
    id: "dQw4w9WgXcQ",
    title: "Acoustic Session",
    thumbnail: "/placeholder.svg",
  },
];

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<"photos" | "videos">("photos");

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-16 section-padding text-center relative pattern-overlay">
        <div className="container-custom">
          <h1 className="font-display text-5xl md:text-7xl font-bold text-gradient-maroon glow-text-maroon mb-6 animate-fade-in">
            Gallery
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in">
            Moments captured from our live performances, rehearsals, and behind the scenes
          </p>
        </div>
      </section>

      {/* Tab Switcher */}
      <div className="container-custom flex justify-center gap-4 mb-12">
        <button
          onClick={() => setActiveTab("photos")}
          className={`px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 ${
            activeTab === "photos"
              ? "bg-gradient-to-r from-maroon-bright to-maroon-neon text-foreground shadow-[0_0_20px_hsl(var(--maroon-bright)/0.5)]"
              : "border border-border text-muted-foreground hover:text-foreground hover:border-maroon-bright"
          }`}
        >
          Photos
        </button>
        <button
          onClick={() => setActiveTab("videos")}
          className={`px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 ${
            activeTab === "videos"
              ? "bg-gradient-to-r from-maroon-bright to-maroon-neon text-foreground shadow-[0_0_20px_hsl(var(--maroon-bright)/0.5)]"
              : "border border-border text-muted-foreground hover:text-foreground hover:border-maroon-bright"
          }`}
        >
          Videos
        </button>
      </div>

      {/* Photos Grid */}
      {activeTab === "photos" && (
        <section className="container-custom pb-20">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {galleryImages.map((image, index) => (
              <div
                key={index}
                onClick={() => setSelectedImage(index)}
                className="group relative aspect-square overflow-hidden rounded-lg cursor-pointer border border-border hover:border-maroon-bright transition-all duration-300 hover:shadow-[0_0_20px_hsl(var(--maroon-bright)/0.3)]"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <p className="text-foreground font-semibold text-sm">{image.caption}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Lightbox */}
          <Dialog open={selectedImage !== null} onOpenChange={() => setSelectedImage(null)}>
            <DialogContent className="max-w-4xl bg-background/95 backdrop-blur-md border-border p-2">
              {selectedImage !== null && (
                <div className="relative">
                  <img
                    src={galleryImages[selectedImage].src}
                    alt={galleryImages[selectedImage].alt}
                    className="w-full h-auto rounded-lg"
                  />
                  <p className="text-center text-foreground mt-4 font-semibold text-lg">
                    {galleryImages[selectedImage].caption}
                  </p>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </section>
      )}

      {/* Videos Grid */}
      {activeTab === "videos" && (
        <section className="container-custom pb-20">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videoItems.map((video, index) => (
              <div
                key={index}
                className="group relative rounded-lg overflow-hidden border border-border hover:border-maroon-bright transition-all duration-300 hover:shadow-[0_0_20px_hsl(var(--maroon-bright)/0.3)]"
              >
                <div className="aspect-video">
                  <iframe
                    src={`https://www.youtube.com/embed/${video.id}`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                    loading="lazy"
                  />
                </div>
                <div className="p-4 bg-card">
                  <h3 className="text-foreground font-semibold">{video.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default Gallery;
