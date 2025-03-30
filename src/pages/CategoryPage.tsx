
import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BlogPostCard from '../components/BlogPostCard';
import Sidebar from '../components/Sidebar';
import { getPostsByCategory } from '../services/blogService';

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const posts = getPostsByCategory(category || '');

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow bg-blog-background">
        {/* Category Header */}
        <section className="py-12 bg-white border-b border-gray-200">
          <div className="container-blog text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-blog-primary mb-4 capitalize">
              {category}
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our collection of articles and insights about {category?.toLowerCase()}.
            </p>
          </div>
        </section>

        {/* Blog Posts */}
        <section className="py-12">
          <div className="container-blog">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2">
                {posts.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {posts.map((post) => (
                      <BlogPostCard key={post.id} post={post} />
                    ))}
                  </div>
                ) : (
                  <div className="bg-white rounded-lg shadow-md p-8 text-center">
                    <h2 className="text-xl font-bold text-blog-primary mb-2">No posts found</h2>
                    <p className="text-gray-600">
                      We couldn't find any posts in this category. Please check back later or explore other categories.
                    </p>
                  </div>
                )}

                {/* Pagination */}
                {posts.length > 6 && (
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

export default CategoryPage;
