import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 space-x-8 text-center md:text-left">

          
          <div>
            <h3 className="text-lg font-semibold text-indigo-400 mb-2 ">BoardScout</h3>
            <p className="text-gray-400">
              Your trusted platform for finding and renting premium billboard locations.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-indigo-400 mb-2">Quick Links</h3>
            <ul className="text-gray-400 space-y-2">
              <li><a href="#" className="hover:text-indigo-300">Find Billboards</a></li>
              <li><a href="#" className="hover:text-indigo-300">Learn More</a></li>
              <li><a href="#" className="hover:text-indigo-300">Contact Us</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-indigo-400 mb-2">Contact Us</h3>
            <p className="text-gray-400">📍 Pune, India</p>
            <p className="text-gray-400">📞 +91 9999 9999</p>
            <p className="text-gray-400">✉ support@boardscout.com</p>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-6 pt-4 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} BoardScout. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
