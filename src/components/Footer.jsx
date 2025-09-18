


// src/components/Footer.js
import React from 'react';

function Footer() {
  const currentYear = new Date().getFullYear(); // Get the current year dynamically

  return (
    <footer className="bg-black text-white py-6 mt-12 shadow-inner">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm md:text-base mb-2">
          &copy; {currentYear} My React Blog. All rights reserved.
        </p>
        <p className="text-xs md:text-sm text-gray-400">
          Built with ❤️ by Paul Passion Adekanye (PPA).
        </p>
        <div className="flex justify-center space-x-4 mt-4">
          {/* You can add social media links or other navigation here later */}
          <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
            Privacy Policy
          </a>
          <span className="text-gray-500">|</span>
          <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;