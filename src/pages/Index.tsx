import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Music from "@/components/Music";
import Tour from "@/components/Tour";
import Gallery from "@/components/Gallery";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <About />
      <Music />
      <Tour />
      <Gallery />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
