import { useState, useEffect } from "react";
import axios from "axios";

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [dietTypes, setDietTypes] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/products")
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));

    axios.get("http://localhost:8080/api/diet-types")
      .then(res => setDietTypes(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-green-700">Admin Dashboard</h1>

      {/* Product Management */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Manage Products</h2>
          <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
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
                <th className="p-3 text-center">Actions</th>
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
                    <button className="px-3 py-1 text-white bg-blue-600 rounded hover:bg-blue-700">
                      Edit
                    </button>
                    <button className="px-3 py-1 text-white bg-red-600 rounded hover:bg-red-700">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Diet Type Management */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Manage Diet Types</h2>
          <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            + Add Diet Type
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {dietTypes.map((diet: any) => (
            <div key={diet.id} className="bg-white p-4 rounded shadow border">
              <h3 className="text-lg font-bold text-green-700">{diet.name}</h3>
              <p className="text-sm text-gray-600 mt-1">{diet.description}</p>
              <div className="flex justify-end gap-2 mt-4">
                <button className="text-blue-600 hover:underline text-sm">Edit</button>
                <button className="text-red-600 hover:underline text-sm">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

