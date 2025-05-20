import { DietType } from '../types/types';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {useRef} from 'react';

const dietTypes: DietType[] = [
  'Diabetic-Friendly', 'Nut-Free', 'Dairy-Free', 'Gluten-Free', 
  'Soy-Free', 'Egg-Free', 'Heart-Healthy', 'Weight Management',
  'Gut Health', 'Kidney-Friendly', 'Liver Support', 'Hypertension-Safe',
  'PCOS/PCOD Support', 'Senior Nutrition', 'Children\'s Nutrition',
  'Immune Boosters', 'Thyroid-Supportive', 'Pregnancy & Postpartum',
  'Vegan Medical Diets'
];


export default function DietTypeSelector() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll=(direction: 'left'|'right')=>{
    if(scrollRef.current){
      scrollRef.current.scrollBy({
        left:direction==='left'? -600:600,
        behavior:'smooth',
      })
    }
  }

  const navigate = useNavigate();
  const [selectedDiet, setSelectedDiet] = useState<DietType | null>(null);

  const handleDietSelect = (diet: DietType) => {
    setSelectedDiet(diet);
    navigate(`/CategoryPage/${diet}`);
  };


  return (
    <>
    <div className='flex flex-row relative'>
      <p className="text-3xl text-left text-gray-600 pt-10 pb-10">Shop by dietary needs:</p>
      
      <div className='flex flex-row gap-2 pt-10 absolute right-0'>
      {/* slide Left Button */}
      <button
        onClick={() => scroll('left')}
        className="w-10 h-10 text-2xl  p-2 flex items-center justify-center shadow-md rounded-full"
      >
        ‹
      </button>

      {/* slide Right Button */}
      <button
        onClick={() => scroll('right')}
        className="w-10 h-10 text-2xl p-2 flex items-center justify-center shadow-md rounded-full"
      >
        ›
      </button>
      </div>
      
    </div>

      
    <div
  ref={scrollRef}
  className="flex overflow-x-auto w-full py-4 px-4 hide-scrollbar"
>
  {dietTypes.map((diet) => (
    <button
      key={diet}
      onClick={() => handleDietSelect(diet)}
    >
      <div className="relative aspect-square w-60 flex-shrink-0 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 mx-2 border border-gray-100 hover:scale-105">
        <img
          src={`/assets/images/${diet.toLowerCase().replace(' ', '-')}.jpg`}
          alt={diet}
          className="w-full h-full object-cover rounded-t-lg"
        />

        <div className="p-4 text-center text-sm font-medium text-gray-700">
          {diet}
        </div>
      </div>
    </button>
  ))}
</div>

<style jsx>{`
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`}</style>

    
    </>

  );
}