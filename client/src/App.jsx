import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import ProductBottleScroll from "./components/ProductBottleScroll";
import SpecialtiesGrid from "./components/SpecialtiesGrid";
import MenuSection from "./components/MenuPage";
import LocationsSection from "./components/FindUsPage";
import ContactSection from "./components/ContactUsPage";
import Footer from "./components/Footer";

export default function App() {
  return (
    <main className="min-h-screen bg-brand-navy text-white">
      <Navbar />
      <ProductBottleScroll />
      <HeroSection />
      <AboutSection />
      <SpecialtiesGrid />
      <MenuSection />
      <LocationsSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
