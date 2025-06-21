import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { AxiosError } from 'axios';

interface ProductFormProps {
  initialData?: any;
  onSubmit: (data: any) => void;
  isEditMode?: boolean;
}

export default function ProductForm({ initialData = {}, onSubmit }: ProductFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stockQuantity: '',
    imageUrl: '',
    dietTypeIds: initialData.dietTypeIds ||
      (initialData.dietTypes ? initialData.dietTypes.map((d: any) => d.id) : []),
    ...initialData,
  });

  const [dietTypes, setDietTypes] = useState([]);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/diet-types')
      .then(res => setDietTypes(res.data))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    if (initialData) {
      setFormData(prev => ({
        ...prev,
        ...initialData,
        dietTypeIds: initialData.dietTypeIds ||
          (initialData.dietTypes ? initialData.dietTypes.map((d: any) => d.id) : [])
      }));
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: name === 'dietTypeIds' ? Array.from((e.target as HTMLSelectElement).selectedOptions, option => option.value) : value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);

      // Create temporary preview URL
      const previewUrl = URL.createObjectURL(file);
      setFormData(prev => ({ ...prev, imageUrl: previewUrl }));
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
        const res = await api.post('/upload', formDataImage, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        console.log("Upload Response:", res.data);
        imageUrl = res.data.imageUrl;

        setFormData((prev: any) => ({ ...prev, imageUrl }));
      } catch (err) {
        const error = err as AxiosError;
        console.error('Image upload failed:', error.response || error.message || error);
        alert("Image upload failed!");
        setUploading(false);
        return;
      } finally {
        setUploading(false);
      }
    }

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
        {(selectedImage || formData.imageUrl) && (
          <img
            src={selectedImage ? URL.createObjectURL(selectedImage) : formData.imageUrl}
            alt="Preview"
            className="mt-2 max-h-40 rounded"
          />
        )}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium">Diet Types</label>
        <div className="mt-2 max-h-60 overflow-y-auto border border-gray-200 rounded p-2">
          <div className="space-y-2">
            {dietTypes.map((diet: any) => (
              <div key={diet.id} className="flex items-center">
                <input
                  type="checkbox"
                  id={`diet-${diet.id}`}
                  checked={formData.dietTypeIds.includes(diet.id)}
                  onChange={(e) => {
                    const newDietTypeIds = e.target.checked
                      ? [...formData.dietTypeIds, diet.id]
                      : formData.dietTypeIds.filter((id) => id !== diet.id);
                    setFormData((prev) => ({ ...prev, dietTypeIds: newDietTypeIds }));
                  }}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                />
                <label htmlFor={`diet-${diet.id}`} className="ml-2 text-sm">
                  {diet.name}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={() => navigate('/Admin')}
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