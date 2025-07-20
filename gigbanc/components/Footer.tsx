import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} gigbanc.shop. All rights reserved.</p>
          <nav className="flex gap-4 mt-4 md:mt-0">
            <Link to="/terms" className="hover:text-indigo-600 transition-colors">Terms of Service</Link>
            <Link to="/privacy" className="hover:text-indigo-600 transition-colors">Privacy Policy</Link>
            <Link to="/support" className="hover:text-indigo-600 transition-colors">Support</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;