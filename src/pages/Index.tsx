import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import MailingListPopup from "@/components/MailingListPopup";
import GamePopup from "@/components/GamePopup";
import coverArt from "@/assets/arcadestand.jpg.jpeg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background crt-vignette">
      <Navigation />
      <MailingListPopup />
      <GamePopup />

      {/* ============ HERO ============ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* perspective grid floor */}
        <div className="absolute bottom-0 left-0 right-0 h-[55vh] overflow-hidden pointer-events-none">
          <div className="grid-floor absolute inset-x-[-50%] bottom-0 h-full" />
          <div className="absolute inset-x-0 bottom-1/2 h-px bg-gradient-to-r from-transparent via-sf-violet to-transparent shadow-[0_0_24px_hsl(var(--sf-violet))]" />
        </div>

        {/* drifting pixels */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 28 }).map((_, i) => {
            const left = (i * 37) % 100;
            const size = (i % 3) + 2;
            const delay = (i * 0.7) % 12;
            const dur = 14 + ((i * 3) % 10);
            const color = i % 3 === 0 ? "var(--sf-pink)" : "var(--sf-violet)";
            return (
              <span
                key={i}
                className="absolute bottom-0 block"
                style={{
                  left: `${left}%`,
                  width: `${size}px`,
                  height: `${size}px`,
                  background: `hsl(${color})`,
                  boxShadow: `0 0 8px hsl(${color})`,
                  opacity: 0.6,
                  animation: `pixel-drift ${dur}s linear ${delay}s infinite`,
                }}
              />
            );
          })}
        </div>

        {/* scanlines */}
        <div className="absolute inset-0 scanlines opacity-40 pointer-events-none" />

        <div className="relative z-10 container-custom text-center space-y-8 pt-24 pb-16">
          <p className="font-mono text-xs md:text-sm tracking-[0.3em] text-sf-pink animate-fade-in">
            ◆ INSERT COIN ◆ PLAYER 1 READY ◆
          </p>

          <h1 className="sr-only">Stage Fright</h1>
          <div
            aria-hidden="true"
            className="font-arcade glitch-text leading-[1.1] text-[clamp(2.25rem,8vw,6rem)] text-foreground glow-pink animate-fade-in"
          >
            STAGE
            <br />
            FRIGHT
          </div>

          <p className="font-mono text-sm md:text-base tracking-[0.25em] text-sf-violet animate-fade-in">
            DEBUT SINGLE — <span className="text-sf-pink">GAME NIGHT</span> — JULY 11
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4 animate-fade-in">
            <Button
              size="lg"
              className="font-mono text-xs tracking-[0.25em] uppercase px-8 py-6 bg-sf-pink text-background hover:bg-sf-pink/90 border border-sf-pink rounded-none shadow-[0_0_24px_hsl(var(--sf-pink)/0.55)]"
            >
              ▶ STREAM NOW
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="font-mono text-xs tracking-[0.25em] uppercase px-8 py-6 border border-sf-violet text-sf-violet hover:bg-sf-violet hover:text-background bg-transparent rounded-none shadow-[0_0_18px_hsl(var(--sf-violet)/0.35)]"
            >
              PRE-SAVE 🎮
            </Button>
          </div>

          {/* HI-SCORE row */}
          <div className="flex items-center justify-center gap-6 pt-12 font-mono text-[11px] tracking-[0.3em] uppercase">
            <span className="text-foreground/60">HI-SCORE</span>
            <span className="text-sf-amber tabular-nums text-base" style={{ textShadow: "0 0 12px hsl(var(--sf-amber) / 0.7)" }}>
              11.07.26
            </span>
            <span className="text-sf-pink text-base tracking-wider">♥ ♥ ♥</span>
          </div>
        </div>
      </section>

      {/* ============ NOW PLAYING ============ */}
      <section className="section-padding relative">
        <div className="container-custom max-w-5xl">
          <h2 className="font-arcade text-xl md:text-3xl text-sf-violet glow-violet mb-12 cursor-blink animate-fade-in">
            COMING SOON
          </h2>

          <article className="bg-card border border-sf-violet/40 glow-border-violet p-6 md:p-10 grid md:grid-cols-[1fr_1.2fr] gap-8 md:gap-10 items-center animate-fade-in">
            {/* Cover art */}
            <div className="relative aspect-square overflow-hidden border border-sf-violet/50">
              <img src={coverArt} alt="Game Night cover art" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-tr from-sf-violet/10 via-transparent to-sf-pink/10 mix-blend-screen pointer-events-none" />
              <span className="absolute top-3 left-3 font-mono text-[10px] tracking-[0.3em] text-sf-cyan bg-background/70 px-2 py-1 border border-sf-cyan/40">
                ► PLAYING
              </span>
            </div>

            <div className="space-y-5">
              <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-foreground/50">DEBUT SINGLE</p>
              <h3 className="font-arcade text-2xl md:text-4xl text-sf-pink glow-pink leading-tight">
                GAME NIGHT
              </h3>
              <p className="font-mono text-sm tracking-[0.2em] uppercase text-sf-violet">
                STAGE FRIGHT · 11 . 07 . 2026
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

          <blockquote className="mt-14 text-center">
            <p className="font-arcade text-base md:text-2xl text-sf-cyan glow-text-cyan leading-relaxed max-w-3xl mx-auto">
              "i'm too cool to be your game night"
            </p>
          </blockquote>
        </div>
      </section>

      {/* ============ ABOUT preview ============ */}
      <section className="section-padding bg-card/40 border-y border-sf-violet/20">
        <div className="container-custom max-w-4xl">
          <h2 className="font-arcade text-xl md:text-3xl text-sf-violet glow-violet mb-10 animate-fade-in">
            WHO ARE THESE GUYS?
          </h2>

          <div className="space-y-5 font-body text-foreground/80 text-base md:text-lg leading-relaxed animate-fade-in">
            <p>
             Stage Fright is a boundary-pushing collective of young musicians united by a shared love for experimentation and sound. Blending influences across genres, from rock, pop and r&b to bollywood, electronic, and beyond, the band crafts a dynamic fusion that refuses to sit still or be boxed in.

The band’s story began in 2024, when a group of like-minded musicians came together simply to play, with no pressure and no expectations, just a shared passion for music. 
What started as casual jam sessions quickly turned into something more. As they spent more time creating together, they realized there was a unique chemistry between them, something with real potential. What was once a hobby soon became a commitment, and Stage Fright was officially born.
            </p>
            <p>
              <span className="text-sf-pink">Game Night</span> is the first single came together almost by accident, an unplanned spark that revealed just how naturally they could create as a unit. That moment became a turning point, inspiring them to dive deeper into original music and begin shaping their sound with intention. Since then, they have been building a catalogue that reflects not just their influences, but their identity as a band.

More than just collaborators, Stage Fright are a group of young musicians who found a sense of family in each other. That connection lies at the heart of everything they create. Their music is honest, energetic, and deeply personal, an extension of who they are and what they stand for.

With an EP on the way, Stage Fright is not just making music, they are carving out a voice. A voice for their generation, for youth navigating change, identity, and expression. Through their sound, they hope to share not just songs, but a feeling, something real, something relatable, and something that brings people together.
            </p>
          </div>

          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Link to="/about">
              <Button className="font-mono text-xs tracking-[0.25em] uppercase px-7 py-6 bg-sf-pink text-background hover:bg-sf-pink/90 rounded-none border border-sf-pink shadow-[0_0_20px_hsl(var(--sf-pink)/0.5)]">
                ▶ MEET THE PLAYERS
              </Button>
            </Link>
            <Link to="/music">
              <Button variant="outline" className="font-mono text-xs tracking-[0.25em] uppercase px-7 py-6 border border-sf-violet text-sf-violet hover:bg-sf-violet hover:text-background bg-transparent rounded-none">
                HEAR THE SOUND
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
