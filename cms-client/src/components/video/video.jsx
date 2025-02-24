"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function VideoGallery() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch("http://localhost:5000/upload/videos");
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();
        setVideos(data);
      } catch (error) {
        console.error("Error fetching videos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col items-center p-8 bg-cover bg-center"
      style={{ backgroundImage: "url('/image.jpg')" }}
    >
      {/* Overlay for better readability */}
      <div className="bg-black bg-opacity-50 min-h-screen w-full flex flex-col items-center p-8">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-[#FFF574] drop-shadow-lg">
          Video Gallery
        </h1>

        <Link href="/">
          <button className="mb-6 px-6 py-2 bg-[#00ADB5] hover:bg-[#EEEEEE] hover:text-[#222831] text-[#222831] font-bold rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105">
            ⬅ Back to Home
          </button>
        </Link>

        {/* Loading & Error Handling */}
        {loading ? (
          <p className="text-[#EEEEEE] opacity-75 text-lg">Loading videos...</p>
        ) : videos.length === 0 ? (
          <p className="text-[#EEEEEE] opacity-75 text-lg">No videos available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
            {videos.map((video, index) => (
              <div
                key={index}
                className="bg-[#393E46] bg-opacity-90 rounded-lg p-4 shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
              >
                <video
                  controls
                  className="w-full h-[250px] sm:h-[300px] rounded-lg border-4 border-[#00ADB5] shadow-md"
                >
                  <source src={video.url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <p className="mt-3 text-center text-sm text-[#EEEEEE] opacity-80">
                  Uploaded on: {new Date(video.uploadedAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
