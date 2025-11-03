import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  const initial = userInfo ? userInfo.name[0].toUpperCase() : ' ';

  const logoutHandler = () => {
    localStorage.removeItem('userInfo');
    setIsDropdownOpen(false);
    navigate('/SaveInfo.com/auth/login');
    window.location.reload();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownRef]);

  return (
    <nav className="bg-gray-900 text-white border-b border-[#00FF9D] shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Brand Name */}
          <div className="flex-shrink-0">
            <Link to="/SaveInfo.com" className="text-3xl font-bold">
              SaveInfo
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {userInfo && (
              <Link
                to="/SaveInfo.com/note/create"
                className="flex items-center justify-center w-11 h-11 bg-[#00FF9D] hover:bg-[#00e58c] 
                text-black rounded-lg shadow-md transition-all duration-200"
                title="Create new note"
              >
                <Plus className="w-6 h-6" />
              </Link>
            )}

            {/* Desktop User Profile */}
            <div className="hidden md:flex items-center">
              {userInfo ? (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center justify-center w-12 h-12 bg-blue-600 rounded-full 
                    text-white text-2xl font-bold focus:outline-none focus:ring-2 focus:ring-offset-2 
                    focus:ring-offset-gray-800 focus:ring-white"
                  >
                    {initial}
                  </button>

                  {/* Dropdown Menu */}
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg py-2 z-20">
                      <div className="px-4 py-2 text-sm text-gray-700">
                        User Name<br />
                        <strong className="text-gray-900">{userInfo.name}</strong>
                      </div>
                      <div className="border-t border-gray-100 my-1"></div>

                      <Link
                        to="/SaveInfo.com/note/create"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Create New Note
                      </Link>

                      <button
                        onClick={logoutHandler}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <Link
                    to="/SaveInfo.com/auth/login"
                    className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700"
                  >
                    Login
                  </Link>
                  <Link
                    to="/SaveInfo.com/auth/signup"
                    className="bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
              >
                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                  {isOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden bg-gray-800`}>
        <div className="px-4 py-3 space-y-2">
          {userInfo ? (
            <>
              <div className="text-gray-300 text-sm">Hello, {userInfo.name}</div>

              {/* Keep Create New Note Option */}
              <Link
                to="/SaveInfo.com/note/create"
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700"
                onClick={() => setIsOpen(false)}
              >
                Create New Note
              </Link>

              <button
                onClick={logoutHandler}
                className="w-full text-left block bg-red-500 hover:bg-red-600 px-3 py-2 rounded-md text-base font-medium"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/SaveInfo.com/auth/login"
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/SaveInfo.com/auth/signup"
                className="block bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;