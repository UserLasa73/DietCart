import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

export default function CreateMealPlan() {
  const navigate = useNavigate();
  const [dietTypes, setDietTypes] = useState<{id: number, name: string}[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    dietTypeId: '',
    items: [''] // Start with one empty item
  });

  // Fetch diet types for dropdown
  useEffect(() => {
    api.get('/diet-types')
      .then(res => setDietTypes(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleItemChange = (index: number, value: string) => {
    const newItems = [...formData.items];
    newItems[index] = value;
    setFormData(prev => ({ ...prev, items: newItems }));
  };

  const addItemField = () => {
    setFormData(prev => ({ ...prev, items: [...prev.items, ''] }));
  };

  const removeItemField = (index: number) => {
    const newItems = formData.items.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, items: newItems }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const payload = {
      ...formData,
      dietTypeId: Number(formData.dietTypeId),
      items: formData.items.filter(item => item.trim() !== '')
    };
  
    // Log the payload to debug before sending
    console.log("Submitting Meal Plan Payload:", payload);
  
    api.post('/meal-plans', payload)
      .then(() => navigate('/admin'))
      .catch(err => {
        console.error("Error submitting meal plan:", err);
      });
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Create New Meal Plan</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Plan Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Description Field */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description *
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Diet Type Dropdown */}
        <div>
          <label htmlFor="dietTypeId" className="block text-sm font-medium text-gray-700 mb-1">
            Diet Type *
          </label>
          <select
            id="dietTypeId"
            name="dietTypeId"
            value={formData.dietTypeId}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">Select a diet type</option>
            {dietTypes.map(diet => (
              <option key={diet.id} value={diet.id}>{diet.name}</option>
            ))}
          </select>
        </div>

        {/* Meal Items */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Meal Items *
          </label>
          {formData.items.map((item, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="text"
                value={item}
                onChange={(e) => handleItemChange(index, e.target.value)}
                required={index === 0}
                className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder={`Item ${index + 1}`}
              />
              {formData.items.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeItemField(index)}
                  className="ml-2 p-2 text-red-500 hover:text-red-700"
                >
                  ×
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addItemField}
            className="mt-2 text-sm text-green-600 hover:text-green-800 flex items-center"
          >
            <span className="mr-1">+</span> Add Another Item
          </button>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-4 pt-4">
          <button
            type="button"
            onClick={() => navigate('/admin')}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Create Meal Plan
          </button>
        </div>
      </form>
    </div>
  );
}