import axios from 'axios';
import { DietType } from '../types/types';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function DietTypeSelector() {
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedDiet, setSelectedDiet] = useState<DietType | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:8080/api/diet-types")
      .then((res) => {
        const dietNames = res.data.map((diet: any) => diet.name);
        setCategories(dietNames);
      })
      .catch((err) => console.error("Failed to load diet types:", err));
  }, []);

  const handleDietSelect = (diet: DietType) => {
    setSelectedDiet(diet);
    navigate(`/CategoryPage/${diet}`);
  };

  return (
    <div className="flex overflow-x-auto space-x-4 w-full py-2 px-2">
      {categories.map((diet) => (
        <button
          key={diet}
          onClick={() => handleDietSelect(diet)}
          className="min-w-[150px] flex-shrink-0 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition-transform duration-300 transform hover:scale-105"
        >
          <img
            src={`/assets/images/${diet.toLowerCase().replace(/ /g, '-')}.jpg`}
            alt={diet}
            className="w-60 h-60 object-cover rounded-t-lg"
          />
          <div className="p-2 text-center font-semibold">{diet}</div>
        </button>
      ))}
    </div>
  );
}
