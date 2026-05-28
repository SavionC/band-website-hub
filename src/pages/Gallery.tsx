import { useState } from "react";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const galleryImages = [
  { src: "/placeholder.svg", alt: "Stage Fright performing live", caption: "Live at Mumbai" },
  { src: "/placeholder.svg", alt: "Band rehearsal session", caption: "Rehearsal Vibes" },
  { src: "/placeholder.svg", alt: "Crowd at concert", caption: "The Crowd" },
  { src: "/placeholder.svg", alt: "Backstage moments", caption: "Backstage" },
  { src: "/placeholder.svg", alt: "Stage setup", caption: "Setup" },
  { src: "/placeholder.svg", alt: "Band group photo", caption: "The Family" },
  { src: "/placeholder.svg", alt: "Solo performance", caption: "In the Zone" },
  { src: "/placeholder.svg", alt: "Acoustic set", caption: "Unplugged" },
];

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background crt-vignette">
      <Navigation />

      <section className="pt-32 pb-12">
        <div className="container-custom">
          <p className="font-mono text-xs tracking-[0.3em] text-sf-pink mb-4 animate-fade-in">◆ ARCHIVE ◆</p>
          <h1 className="font-arcade text-xl md:text-3xl text-sf-violet glow-violet animate-fade-in">
            GAME FOOTAGE
          </h1>
        </div>
      </section>

      <section className="pb-24">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {galleryImages.map((image, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(i)}
                className="group relative aspect-square overflow-hidden border border-sf-violet/20 hover:border-sf-violet transition-colors duration-300 animate-fade-in text-left"
                style={{ animationDelay: `${i * 0.04}s` }}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                  className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                  <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-sf-pink">
                    {image.caption}
                  </p>
                </div>
              </button>
            ))}
          </div>

          <Dialog open={selectedImage !== null} onOpenChange={() => setSelectedImage(null)}>
            <DialogContent className="max-w-4xl bg-card border border-sf-violet/50 p-2 rounded-none">
              {selectedImage !== null && (
                <div>
                  <img
                    src={galleryImages[selectedImage].src}
                    alt={galleryImages[selectedImage].alt}
                    className="w-full h-auto"
                  />
                  <p className="text-center font-mono text-xs tracking-[0.25em] uppercase text-sf-pink mt-4 mb-2">
                    {galleryImages[selectedImage].caption}
                  </p>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Gallery;
