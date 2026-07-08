import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import nadiaImg from "@/assets/Nadia.jpg";
import omImg from "@/assets/Om.jpg";
import ricksonImg  from "@/assets/Rickson_photo.jpg";
import rayanImg  from "@/assets/Rayan.jpg";
import savionImg  from "@/assets/Savion.jpg";
import georgeImg  from "@/assets/George.jpg";


type Role = "VOCALS" | "GUITAR" | "BASS" | "DRUMS" | "KEYS";

interface Member {
  name: string;
  role: Role;
  weapon: string;
  photo: string;
  stats: { energy: number; chaos: number; soul: number };
  instagram: string;
}

const members: Member[] = [
  { name: "Nadia Peters",      role: "VOCALS",  photo: nadiaImg,   weapon: "Soul-Piercing Mic",  stats: { energy: 92, chaos: 78, soul: 96 }, instagram: "https://www.instagram.com/mafia.nadia" },
  { name: "Om Deshmukh",       role: "VOCALS",  photo: omImg,      weapon: "Tower Speaker",      stats: { energy: 95, chaos: 82, soul: 90 }, instagram: "https://www.instagram.com/omsmusicdiaries" },
  { name: "Rickson Castelino", role: "KEYS",    photo: ricksonImg, weapon: "Synth Grid",         stats: { energy: 80, chaos: 76, soul: 94 }, instagram: "https://www.instagram.com/rickcastelino" },
  { name: "Rayan Castelino",   role: "GUITAR",  photo: rayanImg,   weapon: "Fuzz Cannon",        stats: { energy: 90, chaos: 88, soul: 84 }, instagram: "https://www.instagram.com/rayancastelino" },
  { name: "Savion Coutinho",   role: "GUITAR",  photo: savionImg,  weapon: "Switchblade Strat",  stats: { energy: 87, chaos: 85, soul: 86 }, instagram: "https://www.instagram.com/savion.02/" },
  { name: "George Faria",      role: "BASS",    photo: georgeImg,  weapon: "Sub-Bass Pulse",     stats: { energy: 84, chaos: 72, soul: 92 }, instagram: "https://www.instagram.com/georgefariamusic" },
];

const StatBar = ({ label, value }: { label: string; value: number }) => (
  <div className="space-y-1">
    <div className="flex justify-between font-mono text-[10px] tracking-[0.2em] uppercase text-foreground/60">
      <span>{label}</span>
      <span className="text-sf-violet">{value}</span>
    </div>
    <div className="h-1.5 w-full bg-background border border-sf-violet/30 overflow-hidden">
      <div
        className="h-full bg-sf-violet shadow-[0_0_8px_hsl(var(--sf-violet))]"
        style={{ width: `${value}%` }}
      />
    </div>
  </div>
);

const About = () => {
  return (
    <div className="min-h-screen bg-background crt-vignette">
      <Navigation />

      <section className="pt-32 pb-12 relative pattern-overlay">
        <div className="container-custom">
          <p className="font-mono text-xs tracking-[0.3em] text-sf-pink mb-4 animate-fade-in">◆ ROSTER LOADED ◆</p>
          <h1 className="font-arcade text-2xl md:text-5xl text-foreground glow-pink leading-tight animate-fade-in">
            SELECT YOUR<br />PLAYER
          </h1>
          <p className="font-body text-foreground/70 max-w-2xl mt-6 text-lg animate-fade-in">
            Six musicians. One distorted signal. Pick a fighter — they all hit different.
          </p>
        </div>
      </section>

      {/* Real bio — for press & bookings */}
      <section className="pb-12">
        <div className="container-custom max-w-4xl">
          <article className="bg-card border-l-2 border-sf-pink border-y border-r border-y-sf-violet/30 border-r-sf-violet/30 p-6 md:p-10 animate-fade-in">
            <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-sf-violet mb-4">
              ▸ WHO WE ACTUALLY ARE
            </p>
            <h2 className="font-arcade text-base md:text-xl text-foreground glow-pink mb-6 leading-snug">
              STAGE FRIGHT — MUMBAI
            </h2>
            <div className="space-y-4 font-body text-foreground/80 leading-relaxed text-[15px] md:text-base">
              <p>
                Stage Fright is a six-piece dark synth-rock band out of Mumbai, formed in 2024.
                Built around vocalists Nadia Peters and Om Deshmukh, the band fuses gritty
                guitar riffs, pulsing synths and arena-ready hooks into a sound that's equal parts
                neon-lit dancefloor and basement venue.
              </p>
              <p>
                Their debut single <span className="text-sf-pink">"Game Night"</span> — out July 11,
                2026 — is a paranoid, dystopian anthem about toxic relationships disguised as a
                game you never agreed to play. It marks the first chapter of a wider universe the
                band is building across music, visuals and live shows.
              </p>
              <p className="text-foreground/60 text-sm">
                For press, bookings & collaborations →{" "}
                <a href="mailto:teamstagefright@gmail.com" className="text-sf-pink hover:text-sf-violet underline underline-offset-4">
                  teamstagefright@gmail.com
                </a>
              </p>
            </div>
          </article>
        </div>
      </section>

      <section className="section-padding pt-8">
        <div className="container-custom">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {members.map((m, i) => (
              <a
                key={m.name}
                href={m.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="group block bg-card border border-sf-violet/30 hover:border-sf-pink transition-colors duration-300 animate-fade-in"
                style={{ animationDelay: `${i * 0.06}s` }}
              >
                <div className="relative aspect-[3/4] overflow-hidden border-b border-sf-violet/30">
                  <img
                    src={m.photo}
                    alt={m.name}
                    className="w-full h-full object-cover grayscale-[40%] group-hover:grayscale-0 transition-all duration-500"
                  />
                  {/*<div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" /> */}
                  <span className="absolute top-3 left-3 font-mono text-[10px] tracking-[0.3em] text-sf-cyan bg-background/70 border border-sf-cyan/40 px-2 py-1">
                    P{i + 1}
                  </span>
                  <span className="absolute top-3 right-3 font-mono text-[10px] tracking-[0.3em] text-sf-pink bg-background/70 border border-sf-pink/50 px-2 py-1">
                    {m.role}
                  </span>
                </div>

                <div className="p-5 space-y-4">
                  <h3 className="font-mono text-base tracking-[0.18em] uppercase text-sf-pink">
                    {m.name}
                  </h3>
                  <div className="space-y-2.5">
                    <StatBar label="ENERGY" value={m.stats.energy} />
                    <StatBar label="CHAOS"  value={m.stats.chaos} />
                    <StatBar label="SOUL"   value={m.stats.soul} />
                  </div>
                  <p className="pt-2 border-t border-sf-violet/20 font-mono text-[11px] tracking-[0.15em] uppercase text-foreground/70">
                    <span className="text-sf-violet">WEAPON:</span> {m.weapon}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
