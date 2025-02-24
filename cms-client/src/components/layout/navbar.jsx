"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  let lastScrollTop = 0;

  useEffect(() => {
    const handleScroll = () => {
      let scrollTop = window.scrollY || document.documentElement.scrollTop;
      setIsVisible(scrollTop < lastScrollTop);
      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 bg-gradient-to-r from-blue-500 to-teal-500 shadow-lg transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        <h1 className="text-white text-xl font-extrabold transition-transform duration-300 hover:scale-105">
          CMS Client
        </h1>
        <div className="flex space-x-6">
          {[
            { name: "Home", path: "/" },
            { name: "Images", path: "/image" },
            { name: "Videos", path: "/video" },
            { name: "Newsletter", path: "/newsletter" },
            { name: "AboutUs", path: "/aboutus" },
            { name: "Contact Us", path: "/contactus" },
          ].map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className="text-white hover:text-gray-300 transition-colors duration-300 font-medium"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
