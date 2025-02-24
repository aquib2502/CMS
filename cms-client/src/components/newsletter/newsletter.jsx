"use client";
import { useEffect, useState } from "react";
import { FaFileAlt } from "react-icons/fa";
import Link from "next/link";

export default function NewsletterPage() {
  const [newsletters, setNewsletters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewsletters = async () => {
      try {
        const response = await fetch("http://localhost:5000/upload/newsletters");
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();
        setNewsletters(data);
      } catch (error) {
        console.error("Error fetching newsletters:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNewsletters();
  }, []);

  return (
    <div className="p-8 min-h-screen flex flex-col items-center bg-cover bg-center" style={{ backgroundImage: "url('/image.jpg')" }}>
      {/* Overlay for readability */}
      <div className="bg-black bg-opacity-60 min-h-screen w-full flex flex-col items-center p-8">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-[#FFF574] drop-shadow-lg">
          Newsletter Archive
        </h1>
        <Link href="/">
          <button className="mb-6 px-6 py-2 bg-[#00ADB5] hover:bg-[#EEEEEE] hover:text-[#222831] text-[#222831] font-bold rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105">
            ⬅ Back to Home
          </button>
        </Link>

        {loading ? (
          <p className="text-[#EEEEEE] opacity-75 text-lg">Loading newsletters...</p>
        ) : newsletters.length === 0 ? (
          <p className="text-[#EEEEEE] opacity-75 text-lg">No newsletters available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 w-full max-w-6xl">
            {newsletters.map((file) => {
              // Fix URL Handling
              const fileUrl = file.filePath.startsWith("http")
                ? file.filePath
                : `http://localhost:5000${file.filePath}`;

              return (
                <div key={file._id} className="p-4 rounded-xl bg-[#3B1C32] bg-opacity-90 shadow-lg flex flex-col items-center">
                  <div className="flex items-center space-x-3">
                    <FaFileAlt className="text-[#A64D79] text-2xl" />
                    <p className="text-[#EFE9D5] text-sm truncate">{file.fileName}</p>
                  </div>

                  {/* ✅ Improved File Display Handling */}
                  {fileUrl.includes(".pdf") || fileUrl.includes(".docx") || fileUrl.includes(".txt") ? (
                    <a
                      href={fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 text-blue-400 underline"
                    >
                      Open Document
                    </a>
                  ) : (
                    <img 
                      src={fileUrl} 
                      alt="Newsletter Image" 
                      className="w-full h-[500px] mt-4 rounded-lg border-4 border-[#A64D79] shadow-md object-cover" 
                    />
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
