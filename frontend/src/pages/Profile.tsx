import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";

const Profile = () => {
  const { user, loading, error } = useAuth();
  const [profileData, setProfileData] = useState<any>(null);

  useEffect(() => {
    if (user) {
      // For debugging: Log the complete user object
      console.log("User data from context:", user);
      setProfileData(user);
    }
  }, [user]);

  if (loading) {
    return <div className="p-4">Loading profile...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>;
  }

  if (!user) {
    return <div className="p-4">Not logged in</div>;
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">User Profile</h2>
      
      <div className="space-y-3">
        <h3 className="text-lg font-semibold">Raw User Data:</h3>
        <pre className="p-4 bg-gray-100 rounded-md overflow-x-auto">
          {JSON.stringify(profileData, null, 2)}
        </pre>

        <h3 className="text-lg font-semibold mt-4">Formatted Data:</h3>
        <div className="space-y-2">
          {Object.entries(user).map(([key, value]) => (
            <div key={key} className="flex border-b py-2">
              <span className="font-medium text-gray-700 w-1/3">{key}:</span>
              <span className="text-gray-900">
                {typeof value === 'object' 
                  ? JSON.stringify(value) 
                  : String(value)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;