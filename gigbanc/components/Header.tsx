import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import Icon from './Icon';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  // Effect to disable body scroll when menu is open
  React.useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    // Cleanup function to restore scroll on component unmount
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `text-base font-medium transition-colors ${
      isActive ? 'text-indigo-600' : 'text-gray-600 hover:text-indigo-600'
    }`;

  const modalNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    `text-2xl font-semibold transition-colors ${
      isActive ? 'text-indigo-600' : 'text-gray-800 hover:text-indigo-600'
    }`;

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-sm shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2">
              <img src="https://i.postimg.cc/JyjvWpHy/gigbanc-logo.png" alt="gigbanc.shop Logo" className="h-9 w-9 rounded-full" />
              <span className="text-xl font-bold text-gray-800">gigbanc.shop</span>
            </Link>
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <NavLink to="/" className={navLinkClass}>Home</NavLink>
              <NavLink to="/purchase" className={navLinkClass}>Purchase Data</NavLink>
              <NavLink to="/support" className={navLinkClass}>Support</NavLink>
            </nav>
            <div className="hidden md:block">
              <Link
                to="/purchase"
                className="inline-flex items-center justify-center px-5 py-2 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 transition-transform transform hover:scale-105"
              >
                Top Up Now
              </Link>
            </div>
            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(true)}
                className="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                aria-label="Open menu"
                aria-expanded={isMenuOpen}
              >
                <Icon name="menu" className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Modal */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md animate-fade-in"
          onClick={closeMenu}
          role="dialog"
          aria-modal="true"
          aria-labelledby="mobile-menu-title"
        >
          <div
            className="relative overflow-hidden bg-gradient-to-br from-indigo-100 via-white to-yellow-100 rounded-2xl shadow-xl w-11/12 max-w-xs p-8 text-center opacity-0 animate-slide-in-up"
            style={{animationDuration: '0.4s'}}
            onClick={(e) => e.stopPropagation()}
          >
            <button
                onClick={closeMenu}
                className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 z-10"
                aria-label="Close menu"
            >
                <Icon name="close" className="h-6 w-6" />
            </button>
            
            <h2 id="mobile-menu-title" className="sr-only">Navigation Menu</h2>

            <nav className="relative z-10 flex flex-col gap-8 mt-4">
              <NavLink to="/" className={modalNavLinkClass} onClick={closeMenu}>Home</NavLink>
              <NavLink to="/purchase" className={modalNavLinkClass} onClick={closeMenu}>Purchase Data</NavLink>
              <NavLink to="/support" className={modalNavLinkClass} onClick={closeMenu}>Support</NavLink>
              <Link
                to="/purchase"
                onClick={closeMenu}
                className="mt-4 inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 transition-transform transform hover:scale-105"
              >
                Top Up Now
              </Link>
              <div className="border-t border-indigo-200/50" />
              <nav className="-mt-4 flex flex-col gap-4">
                <NavLink to="/terms" onClick={closeMenu} className="text-base font-medium text-gray-600 hover:text-indigo-600">
                    Terms of Service
                </NavLink>
                <NavLink to="/privacy" onClick={closeMenu} className="text-base font-medium text-gray-600 hover:text-indigo-600">
                    Privacy Policy
                </NavLink>
              </nav>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;