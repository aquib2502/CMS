'use client';
import { useState, useEffect } from 'react';

export default function ImageUpload() {
  const [image, setImage] = useState(null);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('http://localhost:5000/upload/images');
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        setUploadedImages(data);
      } catch (error) {
        console.error('Error fetching images:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, []);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!image) {
      alert('Please select an image first!');
      return;
    }

    const formData = new FormData();
    formData.append('file', image);

    try {
      const response = await fetch('http://localhost:5000/upload/imageUpload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Upload failed! Status: ${response.status}`);
      } 

      alert('✅ Image uploaded successfully!');
      setImage(null);
      window.location.reload();
    } catch (error) {
      console.error('Upload failed:', error);
      alert('❌ Failed to upload image!');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this image?')) return;

    try {
      const response = await fetch(`http://localhost:5000/upload/image/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete image');
      }

      alert('✅ Image deleted successfully!');
      window.location.reload();
    } catch (error) {
      console.error('Delete failed:', error);
      alert('❌ Failed to delete image');
    }
  };

  return (
    <div className="p-6 bg-[#27445D] min-h-screen text-[#EFE9D5]">
      <h1 className="text-3xl font-bold mb-6 text-center text-[#71BBB2]">Upload & Manage Images</h1>

      {/* Upload Section */}
      <div className="mb-6 bg-[#497D74] p-6 rounded-lg shadow-lg w-full max-w-lg mx-auto">
        <input type="file" accept="image/*" onChange={handleFileChange} className="w-full p-2 mb-4 border border-[#71BBB2] rounded bg-[#EFE9D5] text-[#27445D]" />
        <button onClick={handleFileUpload} className="w-full bg-[#71BBB2] text-[#27445D] font-semibold py-2 px-4 rounded hover:bg-[#EFE9D5] transition duration-300">
          Upload Image
        </button>
      </div>

      {/* Uploaded Images Section */}
      <h2 className="text-2xl font-semibold mb-4 text-center text-[#71BBB2]">Uploaded Images</h2>
      {loading ? (
        <p className="text-[#EFE9D5] text-center">Loading images...</p>
      ) : uploadedImages.length === 0 ? (
        <p className="text-[#EFE9D5] text-center">No images uploaded yet.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 w-full max-w-2xl mx-auto">
          {uploadedImages.map((img) => (
            <div key={img._id} className="p-4 bg-[#497D74] rounded-lg flex justify-between items-center shadow-md">
              <img src={img.url} alt="Uploaded" className="rounded-lg w-20 h-20 object-cover border-2 border-[#71BBB2]" />
              <p className="text-sm text-[#EFE9D5] text-center">
               Uploaded on: {new Date(img.uploadedAt).toLocaleString()}
                </p>

              <button onClick={() => handleDelete(img._id)} className="text-red-500 hover:text-red-700 transition">
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
