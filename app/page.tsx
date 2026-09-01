import Ambience from "@/components/site/Ambience";
import Navbar from "@/components/site/Navbar";
import Hero from "@/components/site/Hero";
import Services from "@/components/site/Services";
import Process from "@/components/site/Process";
import Comparison from "@/components/site/Comparison";
import AboutFelipe from "@/components/site/AboutFelipe";
import Testimonials3D from "@/components/site/Testimonials3D";
import BlogSection from "@/components/site/BlogSection";
import Faq from "@/components/site/Faq";
import ContactForm from "@/components/site/ContactForm";
import Footer from "@/components/site/Footer";
import WhatsAppFloat from "@/components/site/WhatsAppFloat";
import ScrollEffects from "@/components/ui/ScrollEffects";

export default function Home() {
  return (
    <>
      <Ambience />
      <ScrollEffects />
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Process />
        <Comparison />
        <AboutFelipe />
        <Testimonials3D />
        <BlogSection />
        <Faq />
        <ContactForm />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
