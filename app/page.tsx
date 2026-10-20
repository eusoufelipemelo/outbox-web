import Navbar from "@/components/site/Navbar";
import Hero from "@/components/site/Hero";
import Manifesto from "@/components/site/Manifesto";
import Clientes from "@/components/site/Clientes";
import Process from "@/components/site/Process";
import Comparison from "@/components/site/Comparison";
import Services from "@/components/site/Services";
import Testimonials3D from "@/components/site/Testimonials3D";
import AboutFelipe from "@/components/site/AboutFelipe";
import BlogSection from "@/components/site/BlogSection";
import Faq from "@/components/site/Faq";
import ContactForm from "@/components/site/ContactForm";
import Footer from "@/components/site/Footer";
import WhatsAppFloat from "@/components/site/WhatsAppFloat";
import ScrollEffects from "@/components/ui/ScrollEffects";

/* Layout v3: creme intercalado com preto e laranja, seguindo a referência
   marketinglab. O conteúdo é o mesmo da versão anterior. */
export default function Home() {
  return (
    <div className="sitev">
      <ScrollEffects />
      <Navbar />
      <main>
        <Hero />
        <Manifesto />
        <Clientes />
        <Process />
        <Comparison />
        <Services />
        <AboutFelipe />
        <BlogSection />
        <Testimonials3D />
        <Faq />
        <ContactForm />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
