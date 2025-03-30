
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Menu, X } from 'lucide-react';
import { categories } from '../services/blogService';
import ThemeToggle from './ThemeToggle';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-50 transition-colors duration-200">
      <div className="container-blog py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="font-serif text-2xl font-bold text-blog-primary dark:text-white">
            ArticulatePost
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="font-medium hover:text-blog-primary dark:text-gray-200 dark:hover:text-white">
              Home
            </Link>
            <div className="relative group">
              <button className="font-medium hover:text-blog-primary dark:text-gray-200 dark:hover:text-white flex items-center">
                Categories
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-700 shadow-lg rounded-md overflow-hidden z-50 transform opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition duration-200 invisible group-hover:visible">
                {categories.map((category) => (
                  <Link
                    key={category}
                    to={`/category/${category.toLowerCase()}`}
                    className="block px-4 py-2 text-sm hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600"
                  >
                    {category}
                  </Link>
                ))}
              </div>
            </div>
            <Link to="/about" className="font-medium hover:text-blog-primary dark:text-gray-200 dark:hover:text-white">
              About
            </Link>
            <Link to="/contact" className="font-medium hover:text-blog-primary dark:text-gray-200 dark:hover:text-white">
              Contact
            </Link>
          </nav>

          {/* Search, Theme Toggle, and Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            <form onSubmit={handleSearch} className="hidden md:flex items-center relative">
              <input
                type="text"
                placeholder="Search..."
                className="pl-3 pr-10 py-1.5 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blog-primary focus:border-blog-primary dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="absolute right-3 text-gray-500 dark:text-gray-300 hover:text-blog-primary dark:hover:text-white">
                <Search size={16} />
              </button>
            </form>

            {/* Theme Toggle */}
            <ThemeToggle />

            <button
              className="md:hidden text-blog-primary dark:text-white focus:outline-none"
              onClick={toggleMenu}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-2 animate-fade-in">
            <Link
              to="/"
              className="block py-2 hover:bg-gray-50 dark:hover:bg-gray-700 px-3 rounded-md dark:text-gray-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <div className="py-2 px-3">
              <p className="font-medium mb-1 dark:text-gray-200">Categories</p>
              <div className="pl-3 space-y-1">
                {categories.map((category) => (
                  <Link
                    key={category}
                    to={`/category/${category.toLowerCase()}`}
                    className="block py-1 text-sm hover:text-blog-primary dark:text-gray-300 dark:hover:text-white"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {category}
                  </Link>
                ))}
              </div>
            </div>
            <Link
              to="/about"
              className="block py-2 hover:bg-gray-50 dark:hover:bg-gray-700 px-3 rounded-md dark:text-gray-200"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/contact"
              className="block py-2 hover:bg-gray-50 dark:hover:bg-gray-700 px-3 rounded-md dark:text-gray-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <form onSubmit={handleSearch} className="flex items-center relative mt-4 px-3">
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-3 pr-10 py-2 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blog-primary focus:border-blog-primary dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="absolute right-6 text-gray-500 dark:text-gray-300 hover:text-blog-primary dark:hover:text-white">
                <Search size={18} />
              </button>
            </form>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
