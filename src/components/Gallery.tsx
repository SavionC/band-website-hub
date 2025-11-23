import { Card } from "@/components/ui/card";

const Gallery = () => {
  // Placeholder for gallery images - these would be actual band photos
  const galleryItems = [1, 2, 3, 4, 5, 6];

  return (
    <section id="gallery" className="section-padding">
      <div className="container mx-auto">
        <h2 className="font-display text-5xl md:text-7xl mb-12 text-center text-gradient animate-fade-in">
          GALLERY
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {galleryItems.map((item, index) => (
            <Card
              key={item}
              className="bg-secondary/50 border-border overflow-hidden group hover:border-primary transition-all duration-500 animate-fade-in aspect-square"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                <span className="font-display text-4xl text-muted-foreground/30">
                  {item}
                </span>
              </div>
            </Card>
          ))}
        </div>
        <p className="text-center text-muted-foreground mt-8">
          Follow us on social media for the latest photos and behind-the-scenes content
        </p>
      </div>
    </section>
  );
};

export default Gallery;
