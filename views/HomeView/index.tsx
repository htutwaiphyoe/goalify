import About from "./About";
import Hero from "./Hero";
import Rooms from "./Rooms";
import Services from "./Services";
import FAQs from "./FAQs";

export default function HomeView() {
  return (
    <section id="home-view" className="pt-3 sm:pt-14 grid lg:gap-20 gap-14">
      <Hero />
      <About />
      <Rooms />
      <Services />
      <FAQs />
    </section>
  );
}
