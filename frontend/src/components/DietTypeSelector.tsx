import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface DietType {
  id: number;
  name: string;
  description?: string;
  imageUrl?: string;
}

export default function DietTypeSelector() {
  const [dietTypes, setDietTypes] = useState<DietType[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:8080/api/diet-types")
      .then((res) => {
        setDietTypes(res.data.sort((a: any, b: any) => b.id - a.id));
      })
      .catch((err) => console.error("Failed to load diet types:", err));
  }, []);

  const handleDietSelect = (diet: DietType) => {
    navigate(`/CategoryPage/${diet.id}`); // navigate using the ID
  };

  return (
    <div className="p-4">
      <div className="text-center mb-6">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Explore Diet Categories
        </h2>
        <div className="w-20 h-1 bg-green-500 mx-auto"></div>
        <p className="text-md md:text-lg text-green-700 max-w-2xl mx-auto">
          Discover foods tailored for specific dietary needs — from diabetic-friendly to gluten-free, we've got you covered!
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 w-full py-5 px-2">
        {dietTypes.map((diet) => (
          <button
            key={diet.id}
            onClick={() => handleDietSelect(diet)}
            className="min-w-[200px] flex-shrink-0 bg-white rounded-lg shadow-md hover:shadow-lg transition-transform duration-300 transform hover:scale-105"
          >
            <img
              src={diet.imageUrl || "/assets/images/default.jpg"} // fallback if no image
              alt={diet.name}
              className="w-60 h-60 object-cover rounded-t-lg"
            />
            <div className="p-2 text-center font-semibold text-green-800">
              {diet.name}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
