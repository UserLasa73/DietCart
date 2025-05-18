import { DietType } from '../types/types';

interface DietTypeSelectorProps {
  diets: DietType[];
  onSelect: (diet: DietType) => void;
}

export default function DietTypeSelector({ diets, onSelect }: DietTypeSelectorProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-4xl">
      {diets.map((diet) => (
        <button
          key={diet}
          className="p-4 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition-colors duration-300 transform hover:scale-105"
          onClick={() => onSelect(diet)}
        >
          {diet}
        </button>
      ))}
    </div>
  );
}