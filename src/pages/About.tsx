import { Card } from "@/components/ui/card";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import memberPlaceholder from "@/assets/member-placeholder.jpg";

const About = () => {
  const bandMembers = [
    {
      name: "Nadia Peters",
      role: "Vocalist",
      bio: "Versatile vocalist who brings soul and passion to every song. Nadia's voice adds a unique dimension to our music.",
      instagram: "https://www.instagram.com/mafia.nadia",
    },
    {
      name: "Om Deshmukh",
      role: "Vocalist",
      bio: "Dynamic vocalist with incredible range. Om captivates audiences with his powerful and emotive performances.",
      instagram: "https://www.instagram.com/omsmusicdiary",
    },
    {
      name: "Rickson Castelino",
      role: "Keyboardist",
      bio: "Master of melodies and harmonies. Rickson adds depth and texture with his keyboard magic.",
      instagram: "https://www.instagram.com/rickcastelino",
    },
    {
      name: "George Faria",
      role: "Bassist",
      bio: "The backbone of our rhythm section. George's grooves keep the band tight and the audience moving.",
      instagram: "https://www.instagram.com/georgefariamusic",
    },
    {
      name: "Nathan Nainan",
      role: "Drummer",
      bio: "Powerful drummer who drives every performance with precision and energy. Nathan keeps the heartbeat of the band alive.",
      instagram: "https://www.instagram.com/nat3drums",
    },
    {
      name: "Savion Coutinho",
      role: "Guitarist & Drummer",
      bio: "Multi-instrumentalist with over 10 years of experience. Savion brings versatility and energy to every performance.",
      instagram: "https://www.instagram.com/savion.02/",
    },
    {
      name: "Rayan Castelino",
      role: "Guitarist",
      bio: "Lead guitarist known for powerful riffs and soulful solos. Rayan's playing style defines our signature sound.",
      instagram: "https://www.instagram.com/rayancastelino",
    },
    {
      name: "Joanna Fernandes",
      role: "Vocalist",
      bio: "A captivating vocalist with a mesmerizing stage presence. Joanna brings warmth and power to every performance.",
      instagram: "https://www.instagram.com/jojieberryy",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20 relative pattern-overlay">
        <div className="container-custom">
          <h1 className="font-display text-5xl md:text-7xl font-bold text-center text-gradient-maroon glow-text-maroon mb-6 animate-fade-in">
            About Stage Fright
          </h1>
          <p className="text-xl md:text-2xl text-center text-muted-foreground max-w-3xl mx-auto animate-fade-in">
            Mumbai's Multi-Genre Fusion Band
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-padding bg-secondary/30">
        <div className="container-custom max-w-4xl">
          <div className="space-y-6 text-lg text-muted-foreground leading-relaxed animate-fade-in">
            <p>
              Stage Fright is not just a band—it's an experience. Born in the vibrant
              music scene of Mumbai, we've dedicated ourselves to bringing the raw energy
              of live performance to every stage we touch.
            </p>
            <p>
              Our journey began with a shared passion for music that transcends genres.
              From rock anthems to soulful ballads, from Bollywood hits to international
              chart-toppers, we believe that great music knows no boundaries. This
              philosophy drives us to constantly evolve, experiment, and push the limits
              of live performance.
            </p>
            <p>
              What sets us apart is our ability to read the room and deliver exactly what
              the moment needs. Whether it's a high-energy corporate event, an intimate
              wedding celebration, or a massive concert, we bring the same level of
              professionalism, energy, and musical excellence.
            </p>
            <p>
              With years of collective experience and hundreds of successful performances,
              Stage Fright has become one of Mumbai's most sought-after live bands. We
              don't just play music—we create memories that last a lifetime.
            </p>
          </div>
        </div>
      </section>

      {/* Band Members Section */}
      <section className="section-padding relative">
        <div className="container-custom">
          <h2 className="font-display text-4xl md:text-6xl font-bold text-center text-gradient-maroon mb-16 animate-fade-in">
            Meet The Band
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {bandMembers.map((member, index) => (
              <a
                key={member.name}
                href={member.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Card
                  className="bg-card border-maroon-bright/30 hover:border-maroon-bright overflow-hidden group transition-all duration-500 animate-fade-in cursor-pointer hover:scale-[1.03] hover:shadow-[0_0_30px_hsl(var(--maroon-bright)/0.4)]"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={memberPlaceholder}
                      alt={member.name}
                      className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-maroon-bright"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                    </div>
                  </div>
                  <div className="p-6 space-y-3">
                    <h3 className="font-heading text-2xl font-bold text-foreground group-hover:text-gradient-maroon transition-colors duration-300">
                      {member.name}
                    </h3>
                    <p className="text-maroon-bright font-semibold">{member.role}</p>
                    <p className="text-muted-foreground leading-relaxed">{member.bio}</p>
                  </div>
                </Card>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-padding bg-gradient-to-b from-background to-secondary/30 relative pattern-overlay">
        <div className="container-custom text-center">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-gradient-maroon mb-6 animate-fade-in">
            Ready to Experience Stage Fright?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 animate-fade-in">
            Let's make your event unforgettable
          </p>
          <a href="/booking" className="inline-block">
            <button className="px-8 py-4 bg-gradient-to-r from-maroon-bright to-maroon-neon hover:from-maroon-neon hover:to-maroon-bright text-white font-semibold text-lg rounded-lg shadow-[0_0_30px_hsl(var(--maroon-bright)/0.6)] hover:shadow-[0_0_40px_hsl(var(--maroon-bright)/0.8)] transition-all duration-300 animate-fade-in">
              Book Us Today
            </button>
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
