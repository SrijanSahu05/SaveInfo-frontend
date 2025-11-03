import React from 'react'

const Footer = () => {
  return (
    <footer className="border-t border-gray-700 bg-gray-900/80 backdrop-blur-md text-gray-400 py-6 mt-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between text-sm space-y-3 md:space-y-0">
          <p className="text-center md:text-left">
            © {new Date().getFullYear()} <span className="text-[#00FF9D] font-semibold">SaveInfo</span>. All rights reserved.
          </p>

          <div className="flex space-x-6">
            <a
              href="https://github.com/SrijanSahu05"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#00FF9D] transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#00FF9D] transition-colors"
            >
              Twitter
            </a>
            <a
              href="mailto:support@saveinfo.com"
              className="hover:text-[#00FF9D] transition-colors"
            >
              Contact
            </a>
          </div>
        </div>
      </footer>
  )
}

export default Footer