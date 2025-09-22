 // src/pages/HomePage.js
import React, { useContext } from 'react'; // Import useContext
import { Link } from 'react-router-dom';
import { PostsContext } from '../context/PostsContext'; // Import PostsContext

function HomePage() {
  const { posts } = useContext(PostsContext); // Consume the posts from context

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 bg-gray-800">
      <h1 className="text-4xl sm:text-5xl font-bold text-center text-red-900 mb-8 sm:mb-12 tracking-tight drop-shadow-lg">
        Recent Blog Posts
      </h1>

      {posts.length === 0 ? (
        <p className="text-center text-xl text-gray-600 mt-10">No posts available yet. Go to Admin to add some!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-200 transform hover:-translate-y-1"
            >
              <div className="p-5 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 leading-tight">
                  <Link
                    to={`/post/${post.id}`}
                    className="hover:text-blue-600 transition-colors duration-200"
                  >
                    {post.title}
                  </Link>
                </h2>
                <p className="text-sm text-gray-500 mb-3">
                  By {post.author} on {post.date}
                </p>
                <p className="text-base text-gray-700 leading-relaxed mb-4">
                  {post.excerpt}
                </p>
                <Link
                  to={`/post/${post.id}`}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-md"
                >
                  Read More
                  <svg
                    className="ml-2 w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    ></path>
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default HomePage;