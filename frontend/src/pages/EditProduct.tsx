import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ProductForm from '../components/ProductForm';
import axios from 'axios';

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [productData, setProductData] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/products/${id}`)
      .then(res => setProductData(res.data))
      .catch(err => console.error(err));
  }, [id]);

  const handleUpdate = (data: any) => {
    axios.put(`http://localhost:8080/api/products/${id}`, data)
      .then(() => navigate('/admin'))
      .catch(err => console.error(err));
  };

  if (!productData) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-2xl font-semibold mb-4">Edit Product</h2>
      <ProductForm initialData={productData} onSubmit={handleUpdate} />
    </div>
  );
}
