
import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Calendar } from 'lucide-react';
import { BlogPost } from '../services/blogService';

interface BlogPostCardProps {
  post: BlogPost;
  featured?: boolean;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({ post, featured = false }) => {
  // Format date
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(new Date(date));
  };

  // Truncate text if needed
  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  if (featured) {
    return (
      <div className="card relative overflow-hidden group h-full">
        <div className="relative">
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-64 object-cover rounded-t-lg transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-4 left-4">
            <Link
              to={`/category/${post.category.toLowerCase()}`}
              className="bg-blog-secondary text-blog-text px-3 py-1 rounded-full text-sm font-medium"
            >
              {post.category}
            </Link>
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-3">
            <div className="flex items-center text-gray-500 text-sm">
              <Calendar size={14} className="mr-1" />
              {formatDate(post.publishedDate)}
            </div>
            <div className="flex items-center text-gray-500 text-sm">
              <Clock size={14} className="mr-1" />
              {post.readingTime} min read
            </div>
          </div>
          <Link to={`/post/${post.id}`}>
            <h3 className="text-xl font-bold mb-2 text-blog-primary group-hover:text-blog-hover transition-colors">
              {post.title}
            </h3>
          </Link>
          <p className="text-gray-600 mb-4">
            {truncateText(post.excerpt, 150)}
          </p>
          <div className="flex items-center">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-10 h-10 rounded-full mr-3"
            />
            <span className="font-medium">{post.author.name}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card group h-full flex flex-col">
      <div className="relative overflow-hidden rounded-t-lg">
        <img
          src={post.imageUrl}
          alt={post.title}
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3">
          <Link
            to={`/category/${post.category.toLowerCase()}`}
            className="bg-blog-secondary text-blog-text px-2 py-1 rounded-full text-xs font-medium"
          >
            {post.category}
          </Link>
        </div>
      </div>
      <div className="p-5 flex-grow flex flex-col">
        <div className="flex items-center space-x-3 mb-2 text-xs">
          <div className="flex items-center text-gray-500">
            <Calendar size={12} className="mr-1" />
            {formatDate(post.publishedDate)}
          </div>
          <div className="flex items-center text-gray-500">
            <Clock size={12} className="mr-1" />
            {post.readingTime} min read
          </div>
        </div>
        <Link to={`/post/${post.id}`} className="mb-auto">
          <h3 className="text-lg font-bold mb-2 text-blog-primary group-hover:text-blog-hover transition-colors">
            {truncateText(post.title, 60)}
          </h3>
        </Link>
        <p className="text-gray-600 text-sm mb-3">
          {truncateText(post.excerpt, 100)}
        </p>
        <div className="flex items-center mt-auto pt-3 border-t border-gray-100">
          <img
            src={post.author.avatar}
            alt={post.author.name}
            className="w-8 h-8 rounded-full mr-2"
          />
          <span className="text-sm font-medium">{post.author.name}</span>
        </div>
      </div>
    </div>
  );
};

export default BlogPostCard;
