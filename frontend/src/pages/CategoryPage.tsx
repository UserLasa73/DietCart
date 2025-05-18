import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { DietType } from '../types/types';

export default function CategoryPage() {
  const { dietType } = useParams<{ dietType: DietType }>();

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">{dietType} Options</h2>
      <div className="flex flex-col md:flex-row justify-center gap-8">
        <Link 
          to={`/meal-plans/${dietType}`} 
          className="flex-1 p-6 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <h3 className="text-xl font-medium text-green-700 mb-2">Meal Plans</h3>
          <p className="text-gray-600">Pre-designed meal plans tailored to your needs</p>
        </Link>
        <Link 
          to={`/groceries/${dietType}`} 
          className="flex-1 p-6 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <h3 className="text-xl font-medium text-green-700 mb-2">Groceries</h3>
          <p className="text-gray-600">Shop individual items that fit your diet</p>
        </Link>
      </div>
    </div>
  );
}