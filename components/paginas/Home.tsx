import Ambience from "@/components/site/Ambience";
import Navbar from "@/components/site/Navbar";
import Hero from "@/components/site/Hero";
import Jornadas from "@/components/site/Jornadas";
import DiagnosticoHome from "@/components/site/DiagnosticoHome";
import MentoriaHome from "@/components/site/MentoriaHome";
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

/** A home, igual nos quatro idiomas (o idioma vem de setLocale/I18nProvider). */
export default function Home() {
  return (
    <>
      <Ambience />
      <ScrollEffects />
      <Navbar />
      <main>
        <Hero />
        <Jornadas />
        <Services />
        <Process />
        <Comparison />
        <DiagnosticoHome />
        <AboutFelipe />
        <Testimonials3D />
        <BlogSection />
        <MentoriaHome />
        <Faq />
        <ContactForm />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
