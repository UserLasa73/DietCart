import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ProductForm from '../components/ProductForm';
import axios from 'axios';

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [productData, setProductData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/products/${id}`);
        
        // Ensure dietTypeIds is an array
        const data = {
          ...res.data,
          dietTypeIds: Array.isArray(res.data.dietTypeIds) 
            ? res.data.dietTypeIds 
            : res.data.dietTypes?.map((d: any) => d.id) || []
        };
        
        setProductData(data);
      } catch (err) {
        console.error(err);
        setError('Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleUpdate = async (data: any) => {
    try {
      await axios.put(`http://localhost:8080/api/products/${id}`, data);
      navigate('/admin');
    } catch (err) {
      console.error(err);
      setError('Failed to update product');
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;
  if (!productData) return <div className="p-6">Product not found</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-2xl font-semibold mb-4">Edit Product</h2>
      <ProductForm 
        initialData={productData} 
        onSubmit={handleUpdate} 
        isEditMode={true}
      />
    </div>
  );
}