import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface DietType {
  id: number;
  name: string;
  description?: string;
  imageUrl?: string;
}

export default function DietTypeSelector() {
  const [dietTypes, setDietTypes] = useState<DietType[]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:8080/api/diet-types")
      .then((res) => {
        setDietTypes(res.data.sort((a: any, b: any) => b.id - a.id));
      })
      .catch((err) => console.error("Failed to load diet types:", err));
  }, []);

  const handleDietSelect = (id: number) => {
    const newSelected = selected.includes(id)
      ? selected.filter(d => d !== id)
      : [...selected, id];

    setSelected(newSelected);
    navigate(`/shop?dietTypeIds=${newSelected.join(",")}`);
  };

  const nextCard = () => {
    setCurrentIndex((prev) => (prev + 1) % dietTypes.length);
  };

  const prevCard = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? dietTypes.length - 1 : prev - 1
    );
  };

  return (
    <div className="p-16 min-h-screen text-black">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Select Your Dietary Preferences
        </h2>
        <div className="w-20 h-1 bg-green-500 mx-auto"></div>
      </div>

      {/* Card stack container */}
      <div className="relative flex items-center justify-center mx-auto max-w-4xl">
        {/* Left arrow */}
        <button
          onClick={prevCard}
          className="absolute left-4 z-10 p-3 bg-green-700 hover:bg-green-600 rounded-full shadow-lg transition-colors duration-200"
          aria-label="Previous diet type"
        >
          <ChevronLeft size={32} className="text-white" />
        </button>

        {/* Cards */}
        <div className="relative h-[350px] w-[250px] perspective">
          {dietTypes.map((diet, index) => {
            const offset = index - currentIndex;
            const isActive = index === currentIndex;
            const isSelected = selected.includes(diet.id);
            const absOffset = Math.abs(offset);

            return (
              <div
                key={diet.id}
                onClick={() => handleDietSelect(diet.id)}
                className={`absolute top-0 left-0 w-full h-full cursor-pointer rounded-2xl overflow-hidden transform transition-all duration-500 ease-in-out shadow-2xl border-4 ${
                  isSelected ? "border-green-400 ring-4 ring-green-200" : "border-transparent"
                } ${absOffset > 2 ? 'pointer-events-none' : ''}`}
                style={{
                  transform: `
                    translateX(${offset * 70}px) 
                    scale(${isActive ? 1 : 0.85}) 
                    rotateY(${offset * -8}deg) 
                    translateZ(${isActive ? 40 : 0}px)
                  `,
                  zIndex: 49 - absOffset,
                  opacity: 1 - (absOffset * 0.2),
                  filter: absOffset > 1 ? `blur(${absOffset * 2}px)` : 'none'
                }}
              >
                <div className="relative h-full">
                  <img
                    src={diet.imageUrl || "/assets/images/default-diet.jpg"}
                    alt={diet.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent">
                    <h3 className="text-2xl font-bold text-white mb-2">{diet.name}</h3>
                    {diet.description && (
                      <p className="text-green-100 text-sm">{diet.description}</p>
                    )}
                    <div className={`mt-3 inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-semibold ${
                      isSelected ? 'bg-green-500 text-white' : 'bg-white/20 text-white'
                    }`}>
                      {isSelected ? 'Selected' : 'Click to Shop'}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right arrow */}
        <button
          onClick={nextCard}
          className="absolute right-4 z-10 p-3 bg-green-700 hover:bg-green-600 rounded-full shadow-lg transition-colors duration-200"
          aria-label="Next diet type"
        >
          <ChevronRight size={32} className="text-white" />
        </button>
      </div>

      {/* Selection indicator */}
      {selected.length > 0 && (
        <div className="mt-12 text-center">
          <p className="text-green-200 mb-2">
            {selected.length} diet type{selected.length !== 1 ? 's' : ''} selected
          </p>
          <button
            onClick={() => navigate('/shop')}
            className="px-6 py-3 bg-green-600 hover:bg-green-500 rounded-lg font-medium text-white transition-colors duration-200 shadow-md"
          >
            View Matching Products
          </button>
        </div>
      )}
    </div>
  );
}