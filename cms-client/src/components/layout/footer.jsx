'use client'
const Footer = () => {
    return (
      <footer className="bg-[#2D336B] text-[#FFF2F2] py-6 text-center">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-lg font-semibold">CMS Client</p>
          <div className="mt-4 space-x-6">
            <a href="/about" className="hover:text-[#A9B5DF] transition-colors duration-200">About Us</a>
            <a href="/contact" className="hover:text-[#A9B5DF] transition-colors duration-200">Contact Us</a>
          </div>
          <p className="mt-4 text-sm">&copy; {new Date().getFullYear()} CMS Client. All rights reserved.</p>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  