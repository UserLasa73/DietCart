import { useEffect, useState } from "react";

interface Products {
  id: number;
  name: string;
  description: string;
  price: number;
}

const Shop = () => {
  const [products, setProducts] = useState<Products[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const categories = [
    'Diabetic-Friendly',
    'Nut-Free',
    'Dairy-Free',
    'Gluten-Free',
    'Soy-Free',
    'Egg-Free',
    'Heart-Healthy',
    'Weight Management',
    'Gut Health',
    'Kidney-Friendly',
    'Liver Support',
    'Hypertension-Safe',
    'PCOS/PCOD Support',
    'Senior Nutrition',
    'Children\'s Nutrition',
    'Immune Boosters',
    'Thyroid-Supportive',
    'Pregnancy & Postpartum',
    'Vegan Medical Diets'
  ];

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

      {/* Products Grid */}
      <div className="flex-1 p-6">
        <h2 className="text-2xl font-bold mb-6">Products List</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow">
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-3 line-clamp-2">{product.description}</p>
                <p className="text-green-700 font-bold text-lg">${product.price}</p>
              </div>
              <div className="px-4 py-3 bg-gray-50 border-t">
                <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition-colors">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;