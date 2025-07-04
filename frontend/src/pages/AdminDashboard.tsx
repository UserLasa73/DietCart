import { useState, useEffect } from "react";
import api from "../utils/api";
import { useNavigate } from 'react-router-dom';


export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [dietTypes, setDietTypes] = useState([]);
  const [mealPlans, setMealPlans] = useState([]);
  const [activeTab, setActiveTab] = useState<"products" | "dietTypes" | "mealPlans">("products");
  const navigate = useNavigate();

  const [loading, setLoading] = useState({
    products: true,
    dietTypes: true,
    mealPlans: true,
  });

  useEffect(() => {
    // Fetch products
    api.get("/products")
      .then(res => {
        setProducts(res.data);
        setLoading(prev => ({ ...prev, products: false }));
      })
      .catch(err => {
        console.error(err);
        setLoading(prev => ({ ...prev, products: false }));
      });

    // Fetch diet types
    api.get("/diet-types")
      .then(res => {
        setDietTypes(res.data);
        setLoading(prev => ({ ...prev, dietTypes: false }));
      })
      .catch(err => {
        console.error(err);
        setLoading(prev => ({ ...prev, dietTypes: false }));
      });

    api.get("/meal-plans")
      .then(res => {
        setMealPlans(res.data);
        setLoading(prev => ({ ...prev, mealPlans: false }));
      })

  }, []);

  const handleDeleteProduct = (id: number) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      api.delete(`/products/${id}`)
        .then(() => {
          setProducts(prev => prev.filter(product => product.id !== id));
        })
        .catch(err => console.error(err));
    }
  };


  const handleDeleteDietType = (id: number) => {
    if (window.confirm("Are you sure you want to delete this diet type?")) {
      api.delete(`/diet-types/${id}`)
        .then(() => {
          setDietTypes(prev => prev.filter(diet => diet.id !== id));
        })
        .catch(err => console.error(err));
    }
  };

  const handleDeleteMealPlan = (id: number) => {
    if (window.confirm('Delete this meal plan?')) {
      api.delete(`/meal-plans/${id}`)
        .then(() => {
          setMealPlans(prev => prev.filter(plan => plan.id !== id));
        })
        .catch(err => console.error(err));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-green-700">Admin Dashboard</h1>

      {/* Tabs */}
      <div className="flex justify-center mb-8">
        <button
          onClick={() => setActiveTab("products")}
          className={`px-4 py-2 font-semibold rounded-l ${activeTab === "products" ? "bg-green-600 text-white" : "bg-green-200 text-green-800"
            }`}
        >
          Products
        </button>
        <button
          onClick={() => setActiveTab("dietTypes")}
          className={`px-4 py-2 font-semibold rounded-r ${activeTab === "dietTypes" ? "bg-green-600 text-white" : "bg-green-200 text-green-800"
            }`}
        >
          Diet Types
        </button>
        <button
          onClick={() => setActiveTab("mealPlans")}
          className={`px-4 py-2 font-semibold ${activeTab === "mealPlans" ? "bg-green-600 text-white" : "bg-green-200 text-green-800"}`}
        >
          Meal Plans
        </button>

      </div>

      {/* Product Management Tab */}
      {activeTab === "products" && (
        <div className="mb-12">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Manage Products</h2>
            <button
              onClick={() => navigate('/admin/products/create')}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
              + Add Product
            </button>
          </div>

          <div className="overflow-x-auto bg-white rounded shadow">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-green-200 text-left">
                  <th className="p-3">Name</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">Stock</th>
                  <th className="p-3">Diet Tags</th>
                  <th className="p-3 w-40 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product: any) => (
                  <tr key={product.id} className="border-b">
                    <td className="p-3">{product.name}</td>
                    <td className="p-3">${product.price.toFixed(2)}</td>
                    <td className="p-3">{product.stockQuantity}</td>
                    <td className="p-3 flex flex-wrap gap-1">
                      {product.dietTypes.map((diet: string, index: number) => (
                        <span
                          key={index}
                          className="bg-green-100 text-green-800 px-2 py-0.5 rounded-full text-xs"
                        >
                          {diet}
                        </span>
                      ))}
                    </td>
                    <td className="p-3 text-center space-x-2">
                      <button
                        onClick={() => navigate(`/admin/products/edit/${product.id}`)}
                        className="px-3 py-1 text-white bg-blue-600 rounded hover:bg-blue-700">
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="px-3 py-1 text-white bg-red-600 rounded hover:bg-red-700">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Diet Type Management Tab */}
      {activeTab === "dietTypes" && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Manage Diet Types</h2>
            <button
              onClick={() => navigate("/admin/diet-types/create")}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              + Add Diet Type
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {dietTypes.map((diet: any) => (
              <div
                key={diet.id}
                className="bg-white p-4 rounded shadow border flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-lg font-bold text-green-700">{diet.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{diet.description}</p>
                </div>

                <div className="flex justify-end gap-2 mt-4">
                  <button
                    onClick={() => navigate(`/admin/diet-types/edit/${diet.id}`)}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteDietType(diet.id)}
                    className="text-red-600 hover:underline text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      )}


      {/* Meal Plans Tab */}
      {activeTab === "mealPlans" && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Manage Meal Plans</h2>
            <button
              onClick={() => navigate('/admin/meal-plans/create')}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              + Add Meal Plan
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mealPlans.map((plan: any) => (
              <div key={plan.id} className="bg-white p-4 rounded shadow border">
                <h3 className="text-lg font-bold">{plan.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{plan.description}</p>
                <div className="mt-2">
                  <h4 className="text-sm font-medium">Includes:</h4>
                  <ul className="list-disc list-inside text-xs">
                    {plan.items.map((item: string, i: number) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="flex justify-end gap-2 mt-4">
                  <button
                    onClick={() => navigate(`/admin/meal-plans/edit/${plan.id}`)}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteMealPlan(plan.id)}
                    className="text-red-600 hover:underline text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}


    </div>
  );
}
