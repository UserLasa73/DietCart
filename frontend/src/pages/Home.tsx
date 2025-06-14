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
    <div className="flex flex-col justify-center p-10 bg-gray-50">
      <AboutUs />
      <DietTypeSelector />
      <FeaturedProducts />
      <TestimonialSection />
      <WhyChooseUs />
    </div>
    </>
  );
}