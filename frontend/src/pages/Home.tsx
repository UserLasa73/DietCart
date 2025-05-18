import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DietTypeSelector from '../components/DietTypeSelector';
import { DietType } from '../types/types';

const dietTypes: DietType[] = [
  'Diabetic-Friendly', 'Nut-Free', 'Dairy-Free', 'Gluten-Free', 
  'Soy-Free', 'Egg-Free', 'Heart-Healthy', 'Weight Management',
  'Gut Health', 'Kidney-Friendly', 'Liver Support', 'Hypertension-Safe',
  'PCOS/PCOD Support', 'Senior Nutrition', 'Children\'s Nutrition',
  'Immune Boosters', 'Thyroid-Supportive', 'Pregnancy & Postpartum',
  'Vegan Medical Diets'
];

export default function Home() {
  const navigate = useNavigate();
  const [selectedDiet, setSelectedDiet] = useState<DietType | null>(null);

  const handleDietSelect = (diet: DietType) => {
    setSelectedDiet(diet);
    navigate(`/category/${diet}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
      <h1 className="text-3xl font-bold text-green-700 mb-4">Welcome to DietCart</h1>
      <p className="text-lg text-gray-600 mb-8">Select your dietary needs:</p>
      <DietTypeSelector 
        diets={dietTypes} 
        onSelect={handleDietSelect}
      />
    </div>
  );
}