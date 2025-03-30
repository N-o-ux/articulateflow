
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Mail } from 'lucide-react';
import { categories, getPopularPosts, getRecentPosts } from '../services/blogService';
import { useToast } from '@/hooks/use-toast';

const Sidebar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  const popularPosts = getPopularPosts(5);
  const recentPosts = getRecentPosts(5);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      toast({
        title: "Thanks for subscribing!",
        description: "You've been added to our newsletter.",
      });
      setEmail('');
    } else {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-8">
      {/* Search Widget */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-serif font-bold text-blog-primary mb-4">Search</h3>
        <form onSubmit={handleSearch} className="relative">
          <input
            type="text"
            placeholder="Search articles..."
            className="w-full p-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blog-primary focus:border-blog-primary"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            type="submit"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blog-primary"
          >
            <Search size={18} />
          </button>
        </form>
      </div>

      {/* Categories Widget */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-serif font-bold text-blog-primary mb-4">Categories</h3>
        <ul className="space-y-2">
          {categories.map((category) => (
            <li key={category}>
              <Link
                to={`/category/${category.toLowerCase()}`}
                className="flex items-center justify-between text-gray-700 hover:text-blog-primary transition-colors py-2 border-b border-gray-100 last:border-0"
              >
                <span>{category}</span>
                <span className="bg-gray-100 text-gray-700 rounded-full px-2 py-1 text-xs">
                  {Math.floor(Math.random() * 20) + 1}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Popular Posts Widget */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-serif font-bold text-blog-primary mb-4">Popular Posts</h3>
        <div className="space-y-4">
          {popularPosts.map((post) => (
            <div key={post.id} className="flex items-start space-x-3">
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-16 h-16 object-cover rounded"
              />
              <div>
                <Link
                  to={`/post/${post.id}`}
                  className="font-medium text-blog-primary hover:text-blog-hover line-clamp-2 text-sm"
                >
                  {post.title}
                </Link>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(post.publishedDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Posts Widget */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-serif font-bold text-blog-primary mb-4">Recent Posts</h3>
        <div className="space-y-4">
          {recentPosts.map((post) => (
            <div key={post.id} className="flex items-start space-x-3">
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-16 h-16 object-cover rounded"
              />
              <div>
                <Link
                  to={`/post/${post.id}`}
                  className="font-medium text-blog-primary hover:text-blog-hover line-clamp-2 text-sm"
                >
                  {post.title}
                </Link>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(post.publishedDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter Widget */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-serif font-bold text-blog-primary mb-4">Newsletter</h3>
        <p className="text-gray-600 mb-4 text-sm">
          Subscribe to our newsletter and stay updated with our latest articles and news.
        </p>
        <form onSubmit={handleSubscribe} className="space-y-3">
          <input
            type="email"
            placeholder="Your email address"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blog-primary focus:border-blog-primary"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            type="submit"
            className="w-full btn-primary flex items-center justify-center"
          >
            <Mail size={16} className="mr-2" />
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

export default Sidebar;
