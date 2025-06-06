import { useEffect, useState } from "react";
import axios from "axios";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
  dietTypes: string[];
  imageUrl: String ;
}

interface MealPlan {
  id: number;
  title: string;
  description: string;
}

export default function Shop() {
  const [products, setProducts] = useState<Product[]>([]);
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

  useEffect(() => {
    axios.get("http://localhost:8080/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Failed to load products:", err));
  }, []);

  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/diet-types")
      .then((res) => {
        const dietNames = res.data.map((diet: any) => diet.name);
        setCategories(dietNames);
      })
      .catch((err) => console.error("Failed to load diet types:", err));
  }, []);


  return (
    <div className="flex min-h-screen">
      {/* Filter Sidebar */}
      <div className="w-64 p-4 bg-gray-50 border-r">
        <h3 className="text-lg font-bold mb-4">Filter by Category</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category} className="flex items-center">
              <input
                type="checkbox"
                id={category}
                className="mr-2"
              // onChange handler to be added later
              />
              <label htmlFor={category}>{category}</label>
            </div>
          ))}
        </div>
      </div>

      {/* Products or Meal Plans Section */}
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            {showMealPlans ? "Meal Plans" : "Products List"}
          </h2>
          <button
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
            onClick={() => setShowMealPlans(!showMealPlans)}
          >
            {showMealPlans ? "Show Products" : "Show Meal Plans"}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {showMealPlans ? (
            mealPlans.map((plan) => (
              <div key={plan.id} className="bg-white shadow-md p-4 border-l-4 border-green-600">
                <h3 className="text-xl font-semibold mb-2">{plan.title}</h3>
                <p className="text-gray-700">{plan.description}</p>
              </div>
            ))
          ) : (
            products.map((product) => (
              <div
                key={product.id}
                className="flex flex-col h-full overflow-hidden bg-white shadow-md hover:shadow-xl hover:ring-2 hover:ring-green-500 transition-all duration-300"
              >
                {/* Image with fixed aspect ratio */}
                <div className="aspect-[4/3] bg-gray-100 overflow-hidden">
                  <img
                    src={product.imageUrl ? product.imageUrl : "/assets/images/product-placeholder.jpg"}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />

                </div>

                {/* Content area with fixed sizing */}
                <div className="flex-1 p-4 flex flex-col">
                  {/* Title with fixed height and ellipsis */}
                  <h3 className="text-sm font-semibold  line-clamp-2 h-[3rem]">
                    {product.name}
                  </h3>

                  {/* Description with fixed height */}
                  {/* <p className="text-gray-600 text-sm line-clamp-3 mb-2 h-[3.75rem]">
        {product.description}
      </p> */}

                  {/* Price and stock - always at bottom */}
                  <div className="mt-auto">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-green-700 font-bold">${product.price.toFixed(2)}</span>
                      <span className="text-sm text-gray-500">{product.stockQuantity} in stock</span>
                    </div>

                  </div>
                </div>

                {/* Add to cart button */}
                <div className="p-3 bg-gray-50">
                  <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition-colors text-sm">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};


