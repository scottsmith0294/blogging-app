// src/pages/SinglePostPage.js
import React, { useContext } from 'react'; // Import useContext
import { useParams, Link } from 'react-router-dom';
import { PostsContext } from '../context/PostsContext'; // Import PostsContext

function SinglePostPage() {
  const { postId } = useParams();
  const { posts } = useContext(PostsContext); // Consume the posts from context

  // Find the post that matches the postId from the URL
  const post = posts.find((p) => p.id === postId);

  // If no post is found (e.g., invalid URL), display a 404 message
  if (!post) {
    return (
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8 text-center max-w-2xl">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Post Not Found</h1>
        <p className="text-lg text-gray-600">The blog post you are looking for does not exist.</p>
        <Link to="/" className="mt-6 inline-block text-blue-600 hover:underline">
          Go back to Home
        </Link>
      </div>
    );
  }

  // If the post is found, render its details
  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 max-w-3xl">
      <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200 mb-8">
        <svg
          className="mr-2 w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          ></path>
        </svg>
        Back to All Posts
      </Link>

      <article className="bg-white rounded-xl shadow-lg p-6 sm:p-8 lg:p-10 border border-gray-200">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
          {post.title}
        </h1>
        <p className="text-sm sm:text-base text-gray-500 mb-6">
          By <span className="font-semibold">{post.author}</span> on {post.date}
        </p>
        <div
          className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </div>
  );
}

export default SinglePostPage;