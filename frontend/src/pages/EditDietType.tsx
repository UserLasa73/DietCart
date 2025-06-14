import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function EditDietType() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/diet-types/${id}`)
      .then((res) => {
        setName(res.data.name);
        setDescription(res.data.description);
        setImageUrl(res.data.imageUrl); // existing image
      })
      .catch((err) => console.error("Error loading diet type", err));
  }, [id]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);

      const previewUrl = URL.createObjectURL(file);
      setImageUrl(previewUrl); // preview image
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    let finalImageUrl = imageUrl;

    if (selectedImage) {
      const formData = new FormData();
      formData.append("image", selectedImage);
      setUploading(true);

      try {
        const res = await axios.post("http://localhost:8080/api/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        finalImageUrl = res.data.imageUrl; // returned from backend
        setUploading(false);
      } catch (err) {
        const error = err as AxiosError;
        console.error("Image upload failed", error.response || error.message);
        alert("Image upload failed!");
        setUploading(false);
        return;
      }
    }

    try {
      await axios.put(`http://localhost:8080/api/diet-types/${id}`, {
        name,
        description,
        imageUrl: finalImageUrl,
      });
      navigate("/admin");
    } catch (err) {
      console.error("Failed to update diet type", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-lg mx-auto bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4 text-green-700">Edit Diet Type</h2>
        <form onSubmit={handleUpdate} className="space-y-4">
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
            <label className="block font-medium">Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="mt-1 block w-full"
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
              disabled={uploading}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
