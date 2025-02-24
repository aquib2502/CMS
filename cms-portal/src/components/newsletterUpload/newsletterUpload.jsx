"use client";
import { useState, useEffect } from "react";

export default function NewsletterUpload() {
  const [newsletter, setNewsletter] = useState(null);
  const [uploadedNewsletters, setUploadedNewsletters] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch uploaded newsletters
  useEffect(() => {
    const fetchNewsletters = async () => {
      try {
        const response = await fetch("http://localhost:5000/upload/newsletters");
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        setUploadedNewsletters(data);
      } catch (error) {
        console.error("Error fetching newsletters:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNewsletters();
  }, []);

  // Handle file selection
  const handleFileChange = (e) => {
    setNewsletter(e.target.files[0]);
  };

  // Upload file to Cloudinary via backend
  const handleFileUpload = async () => {
    if (!newsletter) {
      alert("Please select a newsletter file first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", newsletter);

    try {
      const response = await fetch("http://localhost:5000/upload/newsletterUpload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Upload failed! Status: ${response.status}`);
      }

      const uploadedFile = await response.json();
      setUploadedNewsletters((prev) => [...prev, uploadedFile]);

      alert("Newsletter uploaded successfully!");
      setNewsletter(null);
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to upload newsletter!");
    }
  };

  // Delete newsletter from Cloudinary
  const handleDelete = async (id, cloudinaryId) => {
    const isConfirmed = confirm("Are you sure you want to delete this newsletter?");
    if (!isConfirmed) return;

    try {
      const response = await fetch(`http://localhost:5000/upload/newsletter/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cloudinaryId }),
      });

      if (!response.ok) {
        throw new Error(`Failed to delete newsletter: ${response.statusText}`);
      }

      setUploadedNewsletters((prev) => prev.filter((file) => file._id !== id));
      alert("Newsletter deleted successfully!");
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete newsletter. Please try again.");
    }
  };

  return (
    <div className="p-6 bg-[#3B1C32] min-h-screen text-[#EFE9D5]">
      <h1 className="text-3xl font-bold mb-6 text-center text-[#A64D79]">Upload & Manage Newsletters</h1>

      {/* Upload Section */}
      <div className="mb-6 bg-[#6A1E55] p-6 rounded-lg shadow-lg w-full max-w-lg mx-auto">
        <input
          type="file"
          accept=".pdf,.docx,.txt,.jpg"
          onChange={handleFileChange}
          className="w-full p-2 mb-4 border border-[#A64D79] rounded bg-[#EFE9D5] text-[#3B1C32]"
        />
        <button
          onClick={handleFileUpload}
          className="w-full bg-[#A64D79] text-[#3B1C32] font-semibold py-2 px-4 rounded hover:bg-[#EFE9D5] transition duration-300"
        >
          Upload Newsletter
        </button>
      </div>

      {/* Uploaded Newsletters Section */}
      <h2 className="text-2xl font-semibold mb-4 text-center text-[#A64D79]">Uploaded Newsletters</h2>
      {loading ? (
        <p className="text-[#EFE9D5] text-center">Loading newsletters...</p>
      ) : uploadedNewsletters.length === 0 ? (
        <p className="text-[#EFE9D5] text-center">No newsletters uploaded yet.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 w-full max-w-2xl mx-auto">
          {uploadedNewsletters.map((file) => (
            <div key={file._id} className="p-4 bg-[#6A1E55] rounded-lg flex justify-between items-center shadow-md">
              <p className="text-[#EFE9D5]">{file.fileName}</p>
              <p className="text-sm text-[#EFE9D5] text-center">
                Uploaded on: {file.uploadedAt ? new Date(file.uploadedAt).toLocaleString() : "N/A"}
              </p>
              <a
                href={file.filePath}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 underline"
              >
                View File
              </a>
              <button
                onClick={() => handleDelete(file._id, file.cloudinaryId)}
                className="text-red-500 hover:text-red-700 transition"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
