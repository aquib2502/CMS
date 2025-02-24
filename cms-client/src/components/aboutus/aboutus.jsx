"use client";
import Link from "next/link";

export default function AboutUs() {
  return (
    <div className="p-8 min-h-screen flex flex-col items-center bg-cover bg-center" style={{ backgroundImage: "url('/image.jpg')" }}>
      {/* Overlay for Readability */}
      <div className="bg-black bg-opacity-60 min-h-screen w-full flex flex-col items-center p-8">
        <h1 className="text-4xl font-extrabold mb-6 text-center text-[#FFF574] drop-shadow-lg">
          About Us
        </h1>

        {/* Back Button */}
        <Link href="/">
          <button className="mb-6 px-6 py-2 bg-[#00ADB5] hover:bg-[#EEEEEE] hover:text-[#222831] text-[#222831] font-bold rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105">
            ⬅ Back to Home
          </button>
        </Link>

        <div className="max-w-4xl bg-[#3B1C32] bg-opacity-90 p-6 rounded-xl shadow-lg text-[#EFE9D5]">
          <p className="text-lg leading-relaxed">
            Welcome to <span className="text-[#FFF574] font-semibold">CMS Portal</span>—your ultimate content management system, designed for efficiency, simplicity, and creativity. We believe that managing digital content should be seamless, secure, and visually appealing.
          </p>

          <p className="mt-4 text-lg leading-relaxed">
            Whether you’re uploading images, newsletters, or videos, our platform ensures a smooth and intuitive experience. Built with the latest technologies, we provide a **fast, reliable, and scalable** solution tailored to your needs.
          </p>

          <p className="mt-4 text-lg leading-relaxed">
            Our mission is to **empower creators and businesses** by offering a streamlined way to handle digital assets. We are dedicated to innovation and continuously improving our platform to meet evolving demands.
          </p>

          <p className="mt-4 text-lg leading-relaxed text-center font-semibold text-[#FFF574]">
            Thank you for being a part of our journey! 🚀
          </p>
        </div>
      </div>
    </div>
  );
}
