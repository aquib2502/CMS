"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function ImageGallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch("http://localhost:5000/upload/images");
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();
        setImages(data);
      } catch (error) {
        console.error("Error fetching images:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  return (
    <div className="p-8 min-h-screen flex flex-col items-center bg-cover bg-center" style={{ backgroundImage: "url('/image.jpg')" }}>
      {/* Overlay for Readability */}
      <div className="bg-black bg-opacity-60 min-h-screen w-full flex flex-col items-center p-8">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-[#FFF574] drop-shadow-lg">
          Image Gallery
        </h1>

        {/* Back Button */}
        <Link href="/">
          <button className="mb-6 px-6 py-2 bg-[#00ADB5] hover:bg-[#EEEEEE] hover:text-[#222831] text-[#222831] font-bold rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105">
            ⬅ Back to Home
          </button>
        </Link>

        {/* Loading & Error Handling */}
        {loading ? (
          <p className="text-[#EEEEEE] opacity-75 text-lg">Loading images...</p>
        ) : images.length === 0 ? (
          <p className="text-[#EEEEEE] opacity-75 text-lg">No images available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 w-full max-w-6xl">
            {images.map((img, index) => (
              <div key={index} className="p-4 rounded-xl bg-[#3B1C32] bg-opacity-90 shadow-lg flex flex-col items-center">
                <img
                  src={img.url}
                  alt="Uploaded"
                  className="w-full h-[500px] mt-4 rounded-lg border-4 border-[#A64D79] shadow-md object-cover"
                />
                <p className="mt-3 text-center text-sm text-[#EFE9D5] opacity-80">
                  Uploaded on: {new Date(img.uploadedAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
