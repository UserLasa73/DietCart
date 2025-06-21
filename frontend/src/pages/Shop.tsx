import { useEffect, useState } from "react";
import api from '../utils/api';
import ProductCard from "../components/ProductCard";
import { useLocation } from "react-router-dom";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
  dietTypes: string[];
  dietTypeIds: number[];
  imageUrl: string;
}

interface MealPlan {
  id: number;
  title: string;
  description: string;
}

interface DietType {
  id: number;
  name: string;
}

export default function Shop() {

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  const query = useQuery();
  const initialDietIds = query.get("dietTypeIds")
    ? query.get("dietTypeIds")!.split(",").map(Number)
    : [];

  const [products, setProducts] = useState<Product[]>([]);
  const [selectedDietTypes, setSelectedDietTypes] = useState<number[]>(initialDietIds);
  const [dietTypes, setDietTypes] = useState<DietType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showMealPlans, setShowMealPlans] = useState(false);

  const mealPlans: MealPlan[] = [
    {
      id: 1,
      title: "Diabetic Control Plan 01",
      description: "A 7-day low sugar meal plan designed for stable blood glucose.",
    },
    {
      id: 2,
      title: "Diabetic Control Plan 02",
      description: "Rich in omega-3s and low in saturated fats for a healthy heart.",
    },
    {
      id: 3,
      title: "Diabetic Control Plan 03",
      description: "Anti-inflammatory meals focused on hormone regulation.",
    },
  ];

  // Fetch products with filtering
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await api.get('/products/filter', {
          params: {
            dietTypeIds: selectedDietTypes.length > 0
              ? selectedDietTypes.join(',')
              : undefined
          }
        });
        console.log("fetched product is:",response.data);
        setProducts(response.data);
      } catch (err) {
        const errorMessage = err.response?.data?.message ||
          err.message ||
          'Failed to load products';
        setError(errorMessage);

        console.error('Error fetching products:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [selectedDietTypes]);

  // Fetch diet types
  useEffect(() => {
    api.get("/diet-types") // Simplified URL
      .then((res) => setDietTypes(res.data))
      .catch((err) => {
        console.error("Failed to load diet types:", err);
        setError("Failed to load diet categories");
      });
  }, []);

  const handleDietTypeToggle = (dietTypeId: number) => {
    setSelectedDietTypes(prev =>
      prev.includes(dietTypeId)
        ? prev.filter(id => id !== dietTypeId)
        : [...prev, dietTypeId]
    );
  };

  // Helper function to get selected diet type names for Topic Section
  const getSelectedDietNames = () => {
    return selectedDietTypes.map(id => {
      const diet = dietTypes.find(d => d.id === id);
      return diet ? diet.name : '';
    }).filter(name => name !== '');
  };

  return (
    <div className="flex min-h-screen">
      {/* Filter Sidebar */}
      <div className="w-64 p-4 bg-gray-50">
        <h3 className="text-lg font-bold mb-4">Select Your Diet</h3>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <div className="space-y-2">
          {dietTypes.map((dietType) => (
            <div key={dietType.id} className="flex items-center">
              <input
                type="checkbox"
                id={`diet-${dietType.id}`}
                checked={selectedDietTypes.includes(dietType.id)}
                onChange={() => handleDietTypeToggle(dietType.id)}
                className="mr-2"
                disabled={isLoading}
              />
              <label htmlFor={`diet-${dietType.id}`}>{dietType.name}</label>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            {showMealPlans ? "Meal Plans" : "Products List"}
          </h2>
          <button
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition disabled:opacity-50"
            onClick={() => setShowMealPlans(!showMealPlans)}
            disabled={isLoading}
          >
            {showMealPlans ? "Show Products" : "Show Meal Plans"}
          </button>
        </div>

        {/* Selected Filters Banner Header */}
        {selectedDietTypes.length > 0 && !showMealPlans && (
          <div className="bg-green-600 text-white p-4 mb-6">
            <div className="container mx-auto">
              <div className="flex flex-wrap gap-x-3 items-center">
                {getSelectedDietNames().map((name, index) => (
                  <span key={index} className="text-xl font-bold">
                    {name}
                    {index < selectedDietTypes.length - 1 && " / "}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
          </div>
        ) : error ? (
          <div className="text-red-500 text-center py-8">{error}</div>
        ) : showMealPlans ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mealPlans.map((plan) => (
              <div key={plan.id} className="bg-white shadow-md p-4 border-l-4 border-green-600">
                <h3 className="text-xl font-semibold mb-2">{plan.title}</h3>
                <p className="text-gray-700">{plan.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};