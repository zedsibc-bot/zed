import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Products from "./components/Products";
import WhyChooseUs from "./components/WhyChooseUs";
import Clients from "./components/Clients";
import CtaBanner from "./components/CtaBanner";
import Gallery from "./components/Gallery";
import BrandsContact from "./components/BrandsContact";
import Footer from "./components/Footer";
import FloatingContactButtons from "./components/FloatingContactButtons";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <About />
        <Services />
        <Products />
        <WhyChooseUs />
        <Clients />
        <CtaBanner />
        <Gallery />
        <BrandsContact />
      </main>
      <Footer />
      <FloatingContactButtons />
    </>
  );
}
