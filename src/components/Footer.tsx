
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Mail
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Footer = () => {
  const [email, setEmail] = useState('');
  const { toast } = useToast();

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
    <footer className="bg-blog-primary text-white pt-12 pb-8">
      <div className="container-blog">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* About */}
          <div className="md:col-span-1 lg:col-span-1">
            <h3 className="text-xl font-serif text-white mb-4">ArticulatePost</h3>
            <p className="text-gray-300 mb-4">
              Discover the latest insights on technology, lifestyle, AI, travel, and business through our thoughtfully curated articles.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-1 lg:col-span-1">
            <h3 className="text-xl font-serif text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-gray-300 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-300 hover:text-white transition-colors">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="md:col-span-1 lg:col-span-1">
            <h3 className="text-xl font-serif text-white mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/category/technology" className="text-gray-300 hover:text-white transition-colors">
                  Technology
                </Link>
              </li>
              <li>
                <Link to="/category/lifestyle" className="text-gray-300 hover:text-white transition-colors">
                  Lifestyle
                </Link>
              </li>
              <li>
                <Link to="/category/ai" className="text-gray-300 hover:text-white transition-colors">
                  AI
                </Link>
              </li>
              <li>
                <Link to="/category/travel" className="text-gray-300 hover:text-white transition-colors">
                  Travel
                </Link>
              </li>
              <li>
                <Link to="/category/business" className="text-gray-300 hover:text-white transition-colors">
                  Business
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-3 lg:col-span-1">
            <h3 className="text-xl font-serif text-white mb-4">Newsletter</h3>
            <p className="text-gray-300 mb-4">
              Subscribe to our newsletter for the latest updates and articles.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <div className="flex flex-col">
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="flex-grow bg-white/10 text-white border border-white/20 rounded-l-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blog-secondary"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="bg-blog-secondary text-blog-text px-4 py-2 rounded-r-md hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-blog-secondary"
                  >
                    <Mail size={20} />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} ArticulatePost. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link to="/privacy-policy" className="text-gray-300 hover:text-white text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-300 hover:text-white text-sm transition-colors">
                Terms of Service
              </Link>
              <Link to="/sitemap" className="text-gray-300 hover:text-white text-sm transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
