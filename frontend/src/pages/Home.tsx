import DietTypeSelector from '../components/DietTypeSelector';
import HeroSection from '../components/HeroSection';

export default function Home() {
  

  return (
    <>
    <HeroSection />
    <div className="flex flex-col justify-center p-10 bg-gray-50">
      <DietTypeSelector />
    </div>
    </>
  );
}