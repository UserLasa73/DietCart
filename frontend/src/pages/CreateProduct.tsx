import ProductForm from '../components/ProductForm';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

export default function CreateProduct() {
  const navigate = useNavigate();

  const handleCreate = (data: any) => {
    api.post('/products', data)
      .then(() => navigate('/admin'))
      .catch(err => console.error(err));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-2xl font-semibold mb-4">Add New Product</h2>
      <ProductForm 
        onSubmit={handleCreate} 
        initialData={{ 
          name: "", 
          price: 0, 
          dietTypeIds: [],
          description: "",
          stockQuantity: 0,
          imageUrl: ""
        }}
      />
    </div>
  );
}