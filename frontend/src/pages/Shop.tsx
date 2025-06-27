import { useEffect, useState } from "react";
import api from '../utils/api';
import ProductCard from "../components/ProductCard";
import { useLocation } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import MealPlanCard from "../components/MealPlanCard";

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
  name: string;
  description: string;
  items: string[];
  dietTypeId: number;
  createdAt: string;
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
  const [searchQuery, setSearchQuery] = useState('');
  const [mealPlans, setMealPlans] = useState<MealPlan[]>([]);

  // Fetch products with filtering
  useEffect(() => {

    const fetchProducts = async () => {
      setIsLoading(true);
      setError(null);

      try {
        let endpoint = '/products';
        let params: any = {};

        // Priority to search if it exists
        if (searchQuery.trim()) {
          endpoint = '/products/search';
          params.query = searchQuery;
        }
        // If no search but diet filters exist
        else if (selectedDietTypes.length > 0) {
          endpoint = '/products/filter';
          params.dietTypeIds = selectedDietTypes.join(',');
        }

        const response = await api.get(endpoint, { params });
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

    const debounceTimer = setTimeout(fetchProducts, 300);
    return () => clearTimeout(debounceTimer);


  }, [searchQuery, selectedDietTypes]);


  // Fetch diet types
  useEffect(() => {
    api.get("/diet-types") // Simplified URL
      .then((res) => setDietTypes(res.data))
      .catch((err) => {
        console.error("Failed to load diet types:", err);
        setError("Failed to load diet categories");
      });
  }, []);


  useEffect(() => {
    if (showMealPlans) {
      const fetchMealPlans = async () => {
        setIsLoading(true);
        setError(null);
        try {
          const params = selectedDietTypes.length > 0 
          ? { dietTypeId: selectedDietTypes.join(',') }
          : {};
          const response = await api.get('/meal-plans', { params }); // Fetch all
          setMealPlans(response.data);
        } catch (err) {
          const errorMessage = err.response?.data?.message ||
            err.message ||
            'Failed to load meal plans';
          setError(errorMessage);
        } finally {
          setIsLoading(false);
        }
      };
      fetchMealPlans();
    } else {
      setMealPlans([]); // Clear when toggling back to products
    }
  }, [showMealPlans, selectedDietTypes]); // Only trigger on showMealPlans change

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

  const getEmptyStateMessage = () => {
    if (showMealPlans) {
      if (selectedDietTypes.length > 0) {
        const selectedNames = getSelectedDietNames().join(", ");
        return `No meal plans match the selected diet types: ${selectedNames}`;
      }
      return "No meal plans available";
    }
    if (searchQuery.trim()) {
      return `No products found for "${searchQuery}"`;
    } else if (selectedDietTypes.length > 0) {
      const selectedNames = getSelectedDietNames().join(", ");
      return `No products match the selected diet types: ${selectedNames}`;
    }
    return "No products available";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <h1 className="text-2xl font-bold text-gray-900">DietCart Shop</h1>
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <SearchBar
              onSearch={setSearchQuery}
              placeholder="Search products..."
              className="flex-1 sm:w-64"
            />
            <button
              onClick={() => setShowMealPlans(!showMealPlans)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              disabled={isLoading}
            >
              {showMealPlans ? "Show Products" : "Show Meal Plans"}
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filter Sidebar - Modern Card Style */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Diet Filters</h3>
                {selectedDietTypes.length > 0 && (
                  <button
                    onClick={() => setSelectedDietTypes([])}
                    className="text-sm text-green-600 hover:text-green-800"
                  >
                    Clear all
                  </button>
                )}
              </div>

              {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

              <div className="space-y-3">
                {dietTypes.map((dietType) => (
                  <div key={dietType.id} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`diet-${dietType.id}`}
                      checked={selectedDietTypes.includes(dietType.id)}
                      onChange={() => handleDietTypeToggle(dietType.id)}
                      className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                      disabled={isLoading}
                    />
                    <label htmlFor={`diet-${dietType.id}`} className="ml-3 text-sm text-gray-700">
                      {dietType.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1">
            {/* Selected Filters */}
            {selectedDietTypes.length > 0 && !showMealPlans && (
              <div className="mb-6">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-medium text-gray-500">Selected:</span>
                  {getSelectedDietNames().map((name, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm font-medium"
                    >
                      {name}
                      <button
                        onClick={() => handleDietTypeToggle(selectedDietTypes[index])}
                        className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full text-green-600 hover:bg-green-200"
                      >
                        &times;
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Loading State */}
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="bg-white rounded-lg shadow-sm overflow-hidden animate-pulse">
                    <div className="bg-gray-200 h-48 w-full"></div>
                    <div className="p-4 space-y-3">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="text-red-500 mb-4">{error}</div>
                <button
                  onClick={() => window.location.reload()}
                  className="px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200 text-sm font-medium"
                >
                  Try Again
                </button>
              </div>

              //Meal Plans Displaying
            ) : showMealPlans ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {mealPlans.map((plan) => (
                    <MealPlanCard key={plan.id} plan={plan} dietTypes={dietTypes} />
                  ))}
                </div>

                {mealPlans.length === 0 && selectedDietTypes.length > 0 && !isLoading && !error && (
                  <h3 className="mb-4 p-4 bg-yellow-50 text-yellow-800 rounded-lg">
                    {getEmptyStateMessage()}
                  </h3>
                )}
              </>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
                {/* Empty state */}
                {products.length === 0 && !isLoading && !error && (
                  <h3 className="mb-4 p-4 bg-yellow-50 text-yellow-800 rounded-lg">
                    {getEmptyStateMessage()}
                  </h3>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};