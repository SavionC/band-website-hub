import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import coverArt from "@/assets/arcadestand.jpg.jpeg";

const Music = () => {
  return (
    <div className="min-h-screen bg-background crt-vignette">
      <Navigation />

      <section className="pt-32 pb-12">
        <div className="container-custom">
          <p className="font-mono text-xs tracking-[0.3em] text-sf-pink mb-4 animate-fade-in">◆ TRACK LOADED ◆</p>
          <h1 className="font-arcade text-xl md:text-3xl text-sf-violet glow-violet cursor-blink animate-fade-in">
            COMING SOON
          </h1>
        </div>
      </section>

      <section className="pb-24">
        <div className="container-custom max-w-5xl">
          <article className="bg-card border border-sf-violet/40 glow-border-violet p-6 md:p-10 grid md:grid-cols-[1fr_1.2fr] gap-10 items-center animate-fade-in">
            <div className="relative aspect-square overflow-hidden border border-sf-violet/50">
              <img src={coverArt} alt="Game Night cover art" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-tr from-sf-violet/10 via-transparent to-sf-pink/10 mix-blend-screen pointer-events-none" />
              <span className="absolute top-3 left-3 font-mono text-[10px] tracking-[0.3em] text-sf-cyan bg-background/70 px-2 py-1 border border-sf-cyan/40">
                ► PLAYING
              </span>
            </div>

            <div className="space-y-5">
              <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-foreground/50">DEBUT SINGLE</p>
              <h2 className="font-arcade text-2xl md:text-4xl text-sf-pink glow-pink leading-tight">
                GAME NIGHT
              </h2>
              <p className="font-mono text-sm tracking-[0.2em] uppercase text-sf-violet">
                STAGE FRIGHT · 04 . 07 . 2026
              </p>
              <p className="font-body text-foreground/80 leading-relaxed">
                An electronic synth rock track about toxic relationships as a game you never agreed to
                play. Set in a paranoid dystopian world of surveillance, manipulation and control.
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                {[
                  { label: "SPOTIFY", href: "https://spotify.com/stagefright" },
                  { label: "APPLE MUSIC", href: "#" },
                  { label: "YOUTUBE", href: "https://youtube.com/@stagefr1ghtband?si=P0A80wztXzcGVNx5" },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-[11px] tracking-[0.25em] uppercase px-4 py-2 border border-sf-violet/60 text-foreground hover:border-sf-pink hover:text-sf-pink transition-colors"
                  >
                    ▸ {s.label}
                  </a>
                ))}
              </div>
            </div>
          </article>

          <blockquote className="mt-16 text-center">
            <p className="font-arcade text-base md:text-2xl text-sf-cyan glow-text-cyan leading-relaxed max-w-3xl mx-auto">
              "i'm too cool to be your game night"
            </p>
            <p className="mt-4 font-mono text-[10px] tracking-[0.35em] text-foreground/50 uppercase">
              — GAME NIGHT, 2026
            </p>
          </blockquote>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Music;
