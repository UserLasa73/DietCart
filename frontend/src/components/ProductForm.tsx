import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface ProductFormProps {
  initialData?: any;
  onSubmit: (data: any) => void;
}

export default function ProductForm({ initialData = {}, onSubmit }: ProductFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stockQuantity: '',
    imageUrl: '',
    dietTypeIds: [],
    ...initialData,
  });

  const [dietTypes, setDietTypes] = useState([]);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8080/api/diet-types')
      .then(res => setDietTypes(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'dietTypeIds' ? Array.from((e.target as HTMLSelectElement).selectedOptions, option => option.value) : value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let imageUrl = formData.imageUrl;

    if (selectedImage) {
      const formDataImage = new FormData();
      formDataImage.append('image', selectedImage);
      setUploading(true);
      try {
        const res = await axios.post('http://localhost:8080/api/upload', formDataImage, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        console.log("Upload Response:", res.data);
        imageUrl = res.data.imageUrl; // backend returns { imageUrl: '...' }

        // Update formData state with the new imageUrl
        setFormData(prev => ({ ...prev, imageUrl }));

      } catch (err) {
        console.error('Image upload failed:', err.response || err.message || err);
        alert("Image upload failed!");
        setUploading(false);
        return; // stop submission if upload fails
      } finally {
        setUploading(false);
      }
    }

    // Prepare final data object with updated imageUrl
    const finalData = { ...formData, imageUrl };

    console.log("Submitting product data:", finalData);

    onSubmit(finalData);
  };


  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow">
      <div className="mb-4">
        <label className="block text-sm font-medium">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium">Description</label>
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium">Price</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium">Stock Quantity</label>
        <input
          type="number"
          name="stockQuantity"
          value={formData.stockQuantity}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium">Upload Image</label>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleFileChange}
          className="mt-1 block w-full"
        />
        {uploading && <p className="text-sm text-blue-600 mt-2">Uploading...</p>}
        {formData.imageUrl && (
          <img src={formData.imageUrl} alt="Uploaded" className="mt-2 max-h-40 rounded" />
        )}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium">Diet Types</label>
        <select
          name="dietTypeIds"
          multiple
          value={formData.dietTypeIds}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
        >
          {dietTypes.map((diet: any) => (
            <option key={diet.id} value={diet.id}>
              {diet.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={() => navigate('/AdminDashboard')}
          className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          disabled={uploading}
        >
          Save
        </button>
      </div>
    </form>
  );
}
