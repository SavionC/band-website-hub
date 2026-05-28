import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";

interface Show {
  date: string;
  venue: string;
  city: string;
}

const upcomingShows: Show[] = [
  // empty for now — shows "LEVEL LOADING..." state
];

const Shows = () => {
  return (
    <div className="min-h-screen bg-background crt-vignette">
      <Navigation />

      <section className="pt-32 pb-12">
        <div className="container-custom">
          <p className="font-mono text-xs tracking-[0.3em] text-sf-pink mb-4 animate-fade-in">◆ STAGE QUEUE ◆</p>
          <h1 className="font-arcade text-xl md:text-3xl text-sf-violet glow-violet animate-fade-in">
            UPCOMING LEVELS
          </h1>
        </div>
      </section>

      <section className="pb-24">
        <div className="container-custom max-w-3xl">
          {upcomingShows.length === 0 ? (
            <div className="bg-card border border-sf-violet/30 p-10 md:p-16 text-center animate-fade-in">
              <p className="font-arcade text-base md:text-xl text-sf-violet glow-violet cursor-blink">
                LEVEL LOADING... STAY TUNED
              </p>
              <p className="mt-6 font-body text-foreground/70 max-w-md mx-auto">
                Show dates drop here as they're announced. Lock in the signal — follow us on
                Instagram for first dibs.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {upcomingShows.map((s, i) => (
                <article
                  key={i}
                  className="bg-card border border-sf-violet/30 border-l-4 border-l-sf-pink p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 hover:border-sf-violet transition-colors animate-fade-in"
                  style={{ animationDelay: `${i * 0.06}s` }}
                >
                  <div>
                    <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-sf-pink">
                      {s.date}
                    </p>
                    <h3 className="font-mono text-lg md:text-xl tracking-[0.18em] uppercase mt-2 text-foreground">
                      {s.venue}
                    </h3>
                    <p className="font-body text-foreground/65 mt-1">{s.city}</p>
                  </div>
                  <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-sf-violet border border-sf-violet/40 px-3 py-1.5 self-start md:self-auto">
                    ▶ DETAILS
                  </span>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Shows;
