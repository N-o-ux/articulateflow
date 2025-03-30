
import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';
import CommentSection from '../components/CommentSection';
import { getPostById, getAllPosts } from '../services/blogService';
import { Calendar, Clock, Tag, Facebook, Twitter, Linkedin, Share2 } from 'lucide-react';

const PostPage = () => {
  const { id } = useParams<{ id: string }>();
  const post = getPostById(id || '');
  const relatedPosts = getAllPosts()
    .filter(p => p.category === post?.category && p.id !== post?.id)
    .slice(0, 3);

  useEffect(() => {
    // Scroll to top when the component mounts
    window.scrollTo(0, 0);
  }, [id]);

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center bg-blog-background">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-blog-primary mb-4">Post Not Found</h1>
            <p className="text-gray-600 mb-6">The post you're looking for doesn't exist or has been removed.</p>
            <Link to="/" className="btn btn-primary">
              Back to Home
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Format date
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(new Date(date));
  };

  // Share functionality (placeholder)
  const sharePost = (platform: string) => {
    const url = window.location.href;
    const title = post.title;
    
    let shareUrl = '';
    
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`;
        break;
      default:
        // Copy to clipboard
        navigator.clipboard.writeText(url);
        alert('Link copied to clipboard!');
        return;
    }
    
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow bg-blog-background">
        {/* Post Header */}
        <section className="py-12 bg-white border-b border-gray-200">
          <div className="container-blog">
            <div className="max-w-3xl mx-auto text-center">
              <Link
                to={`/category/${post.category.toLowerCase()}`}
                className="inline-block bg-blog-secondary text-blog-text px-3 py-1 rounded-full text-sm font-medium mb-4"
              >
                {post.category}
              </Link>
              <h1 className="text-3xl md:text-4xl font-bold text-blog-primary mb-4">
                {post.title}
              </h1>
              <div className="flex items-center justify-center space-x-4 text-gray-600 mb-6">
                <div className="flex items-center">
                  <Calendar size={16} className="mr-1" />
                  <span>{formatDate(post.publishedDate)}</span>
                </div>
                <div className="flex items-center">
                  <Clock size={16} className="mr-1" />
                  <span>{post.readingTime} min read</span>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-12 h-12 rounded-full mr-3"
                />
                <div className="text-left">
                  <div className="font-medium text-blog-primary">{post.author.name}</div>
                  <div className="text-sm text-gray-500">Author</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Post Content */}
        <section className="py-10">
          <div className="container-blog">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <article className="bg-white rounded-lg shadow-md p-6 md:p-8">
                  {/* Featured Image */}
                  <div className="mb-6">
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="w-full h-auto rounded-lg"
                    />
                  </div>

                  {/* Post Content */}
                  <div className="prose max-w-none mb-8">
                    <div dangerouslySetInnerHTML={{ __html: post.content }} />
                  </div>

                  {/* Tags and Share */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between py-6 border-t border-b border-gray-200 mb-8">
                    <div className="flex flex-wrap items-center mb-4 md:mb-0">
                      <Tag size={16} className="text-gray-500 mr-2" />
                      {post.tags.map((tag, index) => (
                        <Link
                          key={index}
                          to={`/tag/${tag.toLowerCase()}`}
                          className="text-sm bg-gray-100 text-gray-700 rounded-full px-3 py-1 mr-2 mb-2 hover:bg-gray-200 transition-colors"
                        >
                          {tag}
                        </Link>
                      ))}
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-sm text-gray-500">Share:</span>
                      <button
                        onClick={() => sharePost('facebook')}
                        className="text-gray-500 hover:text-blue-600 transition-colors"
                      >
                        <Facebook size={18} />
                      </button>
                      <button
                        onClick={() => sharePost('twitter')}
                        className="text-gray-500 hover:text-blue-400 transition-colors"
                      >
                        <Twitter size={18} />
                      </button>
                      <button
                        onClick={() => sharePost('linkedin')}
                        className="text-gray-500 hover:text-blue-700 transition-colors"
                      >
                        <Linkedin size={18} />
                      </button>
                      <button
                        onClick={() => sharePost('copy')}
                        className="text-gray-500 hover:text-blog-primary transition-colors"
                      >
                        <Share2 size={18} />
                      </button>
                    </div>
                  </div>

                  {/* Author Bio */}
                  <div className="bg-gray-50 rounded-lg p-6 mb-8">
                    <div className="flex items-start">
                      <img
                        src={post.author.avatar}
                        alt={post.author.name}
                        className="w-16 h-16 rounded-full mr-4"
                      />
                      <div>
                        <h3 className="text-xl font-bold text-blog-primary mb-2">
                          {post.author.name}
                        </h3>
                        <p className="text-gray-600 mb-3">{post.author.bio}</p>
                        <div className="flex space-x-3">
                          <a href="#" className="text-blog-primary hover:text-blog-hover">
                            <Twitter size={16} />
                          </a>
                          <a href="#" className="text-blog-primary hover:text-blog-hover">
                            <Linkedin size={16} />
                          </a>
                          <a href="#" className="text-blog-primary hover:text-blog-hover">
                            <Facebook size={16} />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Related Posts */}
                  {relatedPosts.length > 0 && (
                    <div className="mb-8">
                      <h3 className="text-xl font-bold text-blog-primary mb-4">
                        Related Posts
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {relatedPosts.map((relatedPost) => (
                          <div key={relatedPost.id} className="bg-gray-50 rounded-lg overflow-hidden">
                            <Link to={`/post/${relatedPost.id}`}>
                              <img
                                src={relatedPost.imageUrl}
                                alt={relatedPost.title}
                                className="w-full h-40 object-cover"
                              />
                            </Link>
                            <div className="p-4">
                              <Link to={`/post/${relatedPost.id}`}>
                                <h4 className="font-medium text-blog-primary hover:text-blog-hover line-clamp-2 mb-2">
                                  {relatedPost.title}
                                </h4>
                              </Link>
                              <span className="text-xs text-gray-500">
                                {formatDate(relatedPost.publishedDate)}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Comments Section */}
                  <CommentSection comments={post.comments} />
                </article>
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

export default PostPage;
