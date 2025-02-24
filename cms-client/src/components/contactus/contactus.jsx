"use client";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import Link from "next/link";

export default function ContactUs() {
  return (
    <div className="p-8 min-h-screen flex flex-col items-center bg-cover bg-center" style={{ backgroundImage: "url('/image.jpg')" }}>
      {/* Overlay for Readability */}
      <div className="bg-black bg-opacity-60 min-h-screen w-full flex flex-col items-center p-8">
        <h1 className="text-4xl font-extrabold mb-6 text-center text-[#FFF574] drop-shadow-lg">
          Contact Us
        </h1>

        {/* Back Button */}
        <Link href="/">
          <button className="mb-6 px-6 py-2 bg-[#00ADB5] hover:bg-[#EEEEEE] hover:text-[#222831] text-[#222831] font-bold rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105">
            ⬅ Back to Home
          </button>
        </Link>

        {/* Contact Information */}
        <div className="max-w-4xl bg-[#3B1C32] bg-opacity-90 p-6 rounded-xl shadow-lg text-[#EFE9D5] text-center">
          <p className="text-lg leading-relaxed">
            Have questions or need assistance? We're here to help! Reach out to us anytime, and we'll get back to you as soon as possible.
          </p>

          <div className="mt-6 space-y-4">
            {/* Email */}
            <div className="flex items-center justify-center space-x-3">
              <FaEnvelope className="text-[#A64D79] text-2xl" />
              <p className="text-lg">aquibhingwala@gmail.com</p>
            </div>

            {/* Phone */}
            <div className="flex items-center justify-center space-x-3">
              <FaPhone className="text-[#A64D79] text-2xl" />
              <p className="text-lg">+91 9167838311</p>
            </div>

            {/* Address */}
            <div className="flex items-center justify-center space-x-3">
              <FaMapMarkerAlt className="text-[#A64D79] text-2xl" />
              <p className="text-lg">NexcoreAlliance Kurla-400070, BKC</p>
            </div>
          </div>

          <p className="mt-6 text-lg leading-relaxed text-center font-semibold text-[#FFF574]">
            Let's stay connected! 🤝
          </p>
        </div>
      </div>
    </div>
  );
}
