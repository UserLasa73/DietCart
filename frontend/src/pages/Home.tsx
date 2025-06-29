import AboutUs from '../components/AboutUs';
import DietTypeSelector from '../components/DietTypeSelector';
import FeaturedProducts from '../components/FeaturedProducts';
import HeroSection from '../components/HeroSection';
import TestimonialSection from '../components/TestimonialSection';
import WhyChooseUs from '../components/WhyChooseUs';

export default function Home() {
  

  return (
    <>
    <HeroSection />
    <div className="flex flex-col justify-center px-4 md:px-8 lg:px-16">
      <DietTypeSelector />
      <AboutUs />
      <FeaturedProducts />
      <TestimonialSection />
      <WhyChooseUs />
    </div>
    </>
  );
}