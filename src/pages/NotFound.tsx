
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-blog-background dark:bg-gray-900 transition-colors duration-200">
      <div className="text-center p-8 rounded-lg shadow-md bg-white dark:bg-gray-800">
        <h1 className="text-6xl font-bold mb-6 text-blog-primary dark:text-gray-100">404</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">Oops! Page not found</p>
        <p className="text-gray-500 dark:text-gray-400 mb-8">
          The page you are looking for might have been removed, had its name changed, 
          or is temporarily unavailable.
        </p>
        <a 
          href="/" 
          className="px-6 py-3 bg-blog-primary text-white dark:bg-blue-600 rounded-md hover:bg-blog-hover dark:hover:bg-blue-700 transition-colors duration-200"
        >
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
