import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { PencilIcon, TrashIcon, PhotoIcon, UserPlusIcon } from "@heroicons/react/24/outline";

const Profile = () => {
  const { user, loading, error, logout } = useAuth();
  const [editingField, setEditingField] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    dietaryPreferences: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        dietaryPreferences: user.dietaryPreferences || "",
      });
    }
  }, [user]);

  const handleEdit = (field: string) => {
    setEditingField(field);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    //call an API to update the user
    console.log("Saving:", formData);
    setEditingField(null);
    // Add update logic here later
  };

  const handleDeleteAccount = () => {
    if (confirm("Are you sure you want to delete your account? This cannot be undone.")) {
      // Add your delete account logic here
      console.log("Account deletion requested");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-500"></div>
        <span className="ml-3">Loading profile...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-600 rounded-md max-w-md mx-auto">
        Error: {error}
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-4 bg-yellow-50 text-yellow-700 rounded-md max-w-md mx-auto">
        Please log in to view your profile
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex flex-col items-center mb-8 relative">
        {/* Profile photo with change button */}
        <div className="relative group">
          <div className="w-28 h-28 rounded-full bg-green-100 mb-4 flex items-center justify-center text-green-600 text-4xl font-bold">
            {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </div>
          <button className="absolute bottom-2 right-0 bg-white p-2 rounded-full shadow-md hover:bg-green-50 transition-all">
            <PhotoIcon className="h-5 w-5 text-green-600" />
          </button>
        </div>

        {user.role && (
          <span className="mt-2 px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
            {user.role}
          </span>
        )}
      </div>

      <div className="space-y-4 mb-6">
        {/* Editable Fields */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            {editingField === 'name' ? (
              <div className="flex-1 flex items-center">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="flex-1 p-2 border rounded-md"
                />
                <button 
                  onClick={handleSave}
                  className="ml-2 p-2 text-green-600 hover:text-green-800"
                >
                  Save
                </button>
              </div>
            ) : (
              <>
                <span className="font-medium text-gray-700">Name: {formData.name}</span>
                <button onClick={() => handleEdit('name')} className="p-1 text-gray-400 hover:text-green-600">
                  <PencilIcon className="h-4 w-4" />
                </button>
              </>
            )}
          </div>

          <div className="flex items-center justify-between">
            {editingField === 'email' ? (
              <div className="flex-1 flex items-center">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="flex-1 p-2 border rounded-md"
                />
                <button 
                  onClick={handleSave}
                  className="ml-2 p-2 text-green-600 hover:text-green-800"
                >
                  Save
                </button>
              </div>
            ) : (
              <>
                <span className="font-medium text-gray-700">Email: {formData.email}</span>
                <button onClick={() => handleEdit('email')} className="p-1 text-gray-400 hover:text-green-600">
                  <PencilIcon className="h-4 w-4" />
                </button>
              </>
            )}
          </div>

          <div className="flex items-center justify-between">
            {editingField === 'dietaryPreferences' ? (
              <div className="flex-1 flex items-center">
                <select
                  name="dietaryPreferences"
                  value={formData.dietaryPreferences}
                  onChange={handleChange}
                  className="flex-1 p-2 border rounded-md"
                >
                  <option value="">Select preference</option>
                  <option value="Vegetarian">Vegetarian</option>
                  <option value="Vegan">Vegan</option>
                  <option value="Gluten-Free">Gluten-Free</option>
                  <option value="Keto">Keto</option>
                  <option value="Paleo">Paleo</option>
                  <option value="None">None</option>
                </select>
                <button 
                  onClick={handleSave}
                  className="ml-2 p-2 text-green-600 hover:text-green-800"
                >
                  Save
                </button>
              </div>
            ) : (
              <>
                <span className="font-medium text-gray-700">
                  Dietary Preferences: {formData.dietaryPreferences || "Not specified"}
                </span>
                <button onClick={() => handleEdit('dietaryPreferences')} className="p-1 text-gray-400 hover:text-green-600">
                  <PencilIcon className="h-4 w-4" />
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col space-y-3">
        <button
          onClick={logout}
          className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 text-white rounded-md transition duration-150 flex items-center justify-center"
        >
          Logout
        </button>
        
        <button
          className="w-full py-2 px-4 bg-white border border-green-600 text-green-600 hover:bg-green-50 rounded-md transition duration-150 flex items-center justify-center"
        >
          <UserPlusIcon className="h-5 w-5 mr-2" />
          Invite a Friend
        </button>
        
        <button
          onClick={handleDeleteAccount}
          className="w-full py-2 px-4 bg-red-50 hover:bg-red-100 text-red-600 rounded-md transition duration-150 flex items-center justify-center"
        >
          <TrashIcon className="h-5 w-5 mr-2" />
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default Profile;