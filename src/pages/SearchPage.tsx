
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BlogPostCard from '../components/BlogPostCard';
import Sidebar from '../components/Sidebar';
import { searchPosts } from '../services/blogService';

const SearchPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get('q') || '';
  
  const [searchResults, setSearchResults] = useState(searchPosts(query));

  useEffect(() => {
    setSearchResults(searchPosts(query));
  }, [query]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow bg-blog-background">
        {/* Search Header */}
        <section className="py-12 bg-white border-b border-gray-200">
          <div className="container-blog text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-blog-primary mb-4">
              Search Results
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {searchResults.length} {searchResults.length === 1 ? 'result' : 'results'} found for <span className="font-medium">"{query}"</span>
            </p>
          </div>
        </section>

        {/* Search Results */}
        <section className="py-12">
          <div className="container-blog">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2">
                {searchResults.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {searchResults.map((post) => (
                      <BlogPostCard key={post.id} post={post} />
                    ))}
                  </div>
                ) : (
                  <div className="bg-white rounded-lg shadow-md p-8 text-center">
                    <h2 className="text-xl font-bold text-blog-primary mb-2">No results found</h2>
                    <p className="text-gray-600">
                      We couldn't find any posts matching your search. Please try with different keywords.
                    </p>
                  </div>
                )}

                {/* Pagination */}
                {searchResults.length > 6 && (
                  <div className="mt-12 flex justify-center">
                    <div className="flex space-x-1">
                      <button className="px-4 py-2 border border-gray-300 rounded-md bg-white text-blog-primary hover:bg-gray-50">
                        Previous
                      </button>
                      <button className="px-4 py-2 border border-gray-300 rounded-md bg-blog-primary text-white hover:bg-blog-hover">
                        1
                      </button>
                      <button className="px-4 py-2 border border-gray-300 rounded-md bg-white text-blog-primary hover:bg-gray-50">
                        2
                      </button>
                      <button className="px-4 py-2 border border-gray-300 rounded-md bg-white text-blog-primary hover:bg-gray-50">
                        3
                      </button>
                      <button className="px-4 py-2 border border-gray-300 rounded-md bg-white text-blog-primary hover:bg-gray-50">
                        Next
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <Sidebar />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default SearchPage;
