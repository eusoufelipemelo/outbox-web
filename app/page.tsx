import Navbar from "@/components/site/Navbar";
import Hero from "@/components/site/Hero";
import Services from "@/components/site/Services";
import Process from "@/components/site/Process";
import Comparison from "@/components/site/Comparison";
import Testimonials from "@/components/site/Testimonials";
import BlogSection from "@/components/site/BlogSection";
import Faq from "@/components/site/Faq";
import ContactForm from "@/components/site/ContactForm";
import Footer from "@/components/site/Footer";
import WhatsAppFloat from "@/components/site/WhatsAppFloat";
import ScrollEffects from "@/components/ui/ScrollEffects";

export default function Home() {
  return (
    <>
      <ScrollEffects />
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Process />
        <Comparison />
        <Testimonials />
        <BlogSection />
        <Faq />
        <ContactForm />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
