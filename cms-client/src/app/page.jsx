"use client";
import Navbar from "../components/layout/Navbar";

const HomePage = () => {
  return (
    <>
      <Navbar />
      <div
        className="h-screen bg-cover bg-center flex flex-col items-center justify-center text-white px-6"
        style={{ backgroundImage: "url('/image.jpg')" }}
      >
        <div className="bg-black bg-opacity-50 p-10 rounded-lg shadow-2xl max-w-3xl text-center">
          <h1 className="text-5xl font-extrabold text-[#FFF574] mb-4">
            Welcome to CMS Client
          </h1>
          <p className="text-lg text-gray-200 leading-relaxed">
            Effortlessly manage your digital content with our powerful CMS platform.  
            Upload, organize, and share your images, videos, and newsletters with ease.  
            Stay in control and take your content management to the next level.
          </p>
        </div>
      </div>
    </>
  );
};

export default HomePage;
