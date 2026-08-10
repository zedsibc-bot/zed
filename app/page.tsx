import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Products from "./components/Products";
import WhyChooseUs from "./components/WhyChooseUs";
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
        <CtaBanner />
        <Gallery />
        <BrandsContact />
        <section aria-label="Service commitment" className="border-t border-hairline bg-bg-darker">
          <div className="mx-auto max-w-5xl px-6 py-16 text-center sm:py-20">
            <p className="mx-auto max-w-3xl font-heading text-xl font-semibold leading-snug text-ink sm:text-2xl">
              Trusted by businesses, organizations, and institutions throughout
              the Philippines and abroad. With a growing base of returning
              clients, we are committed to providing reliable, professional,
              and personalized service.
            </p>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingContactButtons />
    </>
  );
}
