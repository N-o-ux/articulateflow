
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BlogPostCard from '../components/BlogPostCard';
import Sidebar from '../components/Sidebar';
import { getAllPosts, categories } from '../services/blogService';

const HomePage = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const allPosts = getAllPosts();
  
  // Filter posts by active category
  const filteredPosts = activeCategory
    ? allPosts.filter(post => post.category.toLowerCase() === activeCategory.toLowerCase())
    : allPosts;

  // Get featured posts (first 3 posts)
  const featuredPosts = allPosts.slice(0, 3);
  
  // Get trending post (most commented post)
  const trendingPost = [...allPosts].sort((a, b) => b.comments.length - a.comments.length)[0];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow bg-blog-background">
        {/* Hero Section */}
        <section className="py-10 md:py-16 bg-white">
          <div className="container-blog">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Featured Post */}
              <div className="lg:col-span-2">
                <div className="relative h-full">
                  <div className="relative overflow-hidden rounded-lg h-full">
                    <img
                      src={trendingPost.imageUrl}
                      alt={trendingPost.title}
                      className="w-full h-96 object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-6 text-white">
                      <Link
                        to={`/category/${trendingPost.category.toLowerCase()}`}
                        className="inline-block bg-blog-secondary text-blog-text px-3 py-1 rounded-full text-sm font-medium mb-3"
                      >
                        {trendingPost.category}
                      </Link>
                      <Link to={`/post/${trendingPost.id}`}>
                        <h2 className="text-2xl md:text-3xl font-bold mb-2 text-white hover:underline">
                          {trendingPost.title}
                        </h2>
                      </Link>
                      <p className="text-gray-200 mb-4 line-clamp-2">
                        {trendingPost.excerpt}
                      </p>
                      <div className="flex items-center">
                        <img
                          src={trendingPost.author.avatar}
                          alt={trendingPost.author.name}
                          className="w-10 h-10 rounded-full mr-3"
                        />
                        <div>
                          <div className="font-medium">{trendingPost.author.name}</div>
                          <div className="text-sm text-gray-300">
                            {new Date(trendingPost.publishedDate).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            })} · {trendingPost.readingTime} min read
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Side Featured Posts */}
              <div className="grid grid-cols-1 gap-4">
                {featuredPosts.slice(1, 3).map((post) => (
                  <div key={post.id} className="relative overflow-hidden rounded-lg">
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="w-full h-44 object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-4 text-white">
                      <Link
                        to={`/category/${post.category.toLowerCase()}`}
                        className="inline-block bg-blog-secondary text-blog-text px-2 py-0.5 rounded-full text-xs font-medium mb-2"
                      >
                        {post.category}
                      </Link>
                      <Link to={`/post/${post.id}`}>
                        <h3 className="text-lg font-bold mb-1 text-white hover:underline">
                          {post.title}
                        </h3>
                      </Link>
                      <div className="flex items-center text-sm">
                        <span className="mr-3">{post.author.name}</span>
                        <span>
                          {new Date(post.publishedDate).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-8 bg-gray-50 border-t border-b border-gray-200">
          <div className="container-blog">
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === null
                    ? 'bg-blog-primary text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setActiveCategory(null)}
              >
                All
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeCategory === category.toLowerCase()
                      ? 'bg-blog-primary text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setActiveCategory(category.toLowerCase())}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Posts */}
        <section className="py-12">
          <div className="container-blog">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredPosts.slice(0, 6).map((post) => (
                    <BlogPostCard key={post.id} post={post} />
                  ))}
                </div>

                {/* Pagination */}
                {filteredPosts.length > 6 && (
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

        {/* Newsletter */}
        <section className="py-16 bg-blog-primary text-white">
          <div className="container-blog text-center">
            <h2 className="text-3xl font-serif font-bold text-white mb-4">
              Subscribe to Our Newsletter
            </h2>
            <p className="max-w-2xl mx-auto mb-8 text-gray-200">
              Stay updated with our latest articles, news, and exclusive content. 
              Join our community of readers today!
            </p>
            <form className="max-w-md mx-auto flex">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-4 py-3 rounded-l-md focus:outline-none"
              />
              <button
                type="submit"
                className="bg-blog-secondary text-blog-text px-6 py-3 rounded-r-md font-medium hover:bg-opacity-90 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;
