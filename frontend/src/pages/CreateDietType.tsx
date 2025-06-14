import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreateDietType() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      const previewUrl = URL.createObjectURL(file);
      setImageUrl(previewUrl); // temporary preview
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let uploadedUrl = imageUrl;

    if (image) {
      const formData = new FormData();
      formData.append("image", image);
      setUploading(true);
      try {
        const res = await axios.post("http://localhost:8080/api/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        uploadedUrl = res.data.imageUrl;
        setImageUrl(uploadedUrl);
      } catch (err) {
        console.error("Image upload failed:", err);
        alert("Image upload failed");
        setUploading(false);
        return;
      } finally {
        setUploading(false);
      }
    }

    try {
      await axios.post("http://localhost:8080/api/diet-types", {
        name,
        description,
        imageUrl: uploadedUrl,
      });
      navigate("/admin");
    } catch (err) {
      console.error("Failed to create diet type", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-lg mx-auto bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4 text-green-700">Add Diet Type</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block font-medium">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block font-medium">Upload Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full"
            />
            {uploading && <p className="text-sm text-blue-600 mt-1">Uploading...</p>}
            {imageUrl && (
              <img
                src={imageUrl}
                alt="Preview"
                className="mt-2 max-h-40 rounded border"
              />
            )}
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => navigate("/admin")}
              className="bg-gray-300 text-black px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              disabled={uploading}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
