import ProductForm from '../components/ProductForm';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function CreateProduct() {
  const navigate = useNavigate();

  const handleCreate = (data: any) => {
    axios.post('http://localhost:8080/api/products', data)
      .then(() => navigate('/admin'))
      .catch(err => console.error(err));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-2xl font-semibold mb-4">Add New Product</h2>
      <ProductForm onSubmit={handleCreate} />
    </div>
  );
}
