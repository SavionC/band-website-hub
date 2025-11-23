import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin } from "lucide-react";

const tourDates = [
  {
    date: "DEC 15, 2024",
    venue: "The Voltage Arena",
    city: "Los Angeles, CA",
    status: "On Sale",
  },
  {
    date: "DEC 22, 2024",
    venue: "Electric Underground",
    city: "New York, NY",
    status: "On Sale",
  },
  {
    date: "JAN 05, 2025",
    venue: "Revolution Hall",
    city: "Chicago, IL",
    status: "On Sale",
  },
  {
    date: "JAN 12, 2025",
    venue: "Rebel Stage",
    city: "Austin, TX",
    status: "Limited",
  },
  {
    date: "JAN 20, 2025",
    venue: "Neon Ballroom",
    city: "Seattle, WA",
    status: "Sold Out",
  },
];

const Tour = () => {
  return (
    <section id="tour" className="section-padding bg-secondary/30">
      <div className="container mx-auto max-w-4xl">
        <h2 className="font-display text-5xl md:text-7xl mb-12 text-center text-gradient animate-fade-in">
          TOUR DATES
        </h2>
        <div className="space-y-4">
          {tourDates.map((show, index) => (
            <Card
              key={index}
              className="bg-card border-border hover:border-primary transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-primary font-semibold">
                    <Calendar className="h-4 w-4" />
                    {show.date}
                  </div>
                  <h3 className="font-display text-2xl">{show.venue}</h3>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    {show.city}
                  </div>
                </div>
                <Button
                  size="lg"
                  variant={show.status === "Sold Out" ? "outline" : "default"}
                  disabled={show.status === "Sold Out"}
                  className={
                    show.status === "Sold Out"
                      ? ""
                      : "bg-primary hover:bg-primary/90 shadow-[0_0_10px_hsl(var(--primary)/0.3)] hover:shadow-[0_0_20px_hsl(var(--primary)/0.5)]"
                  }
                >
                  {show.status === "Sold Out" ? "Sold Out" : "Get Tickets"}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Tour;
