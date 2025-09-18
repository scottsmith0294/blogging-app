// src/pages/AdminDashboard.js
import React, { useState, useContext, useEffect } from 'react'; // Import useContext and useEffect
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { PostsContext } from '../context/PostsContext'; // Import PostsContext

function AdminDashboard() {
  // Consume posts and functions from PostsContext
  const { posts, addPost, updatePost, deletePost } = useContext(PostsContext);

  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostExcerpt, setNewPostExcerpt] = useState('');
  const [newPostAuthor, setNewPostAuthor] = useState('Admin'); // Default author for new posts
  const [editingPostId, setEditingPostId] = useState(null); // State to track which post is being edited

  // useEffect to populate form when editing a post
  useEffect(() => {
    if (editingPostId) {
      const postToEdit = posts.find(p => p.id === editingPostId);
      if (postToEdit) {
        setNewPostTitle(postToEdit.title);
        // Convert HTML content back to plain text for textarea
        // Simple conversion: remove <p> tags and trim. For complex HTML, a library might be needed.
        setNewPostContent(postToEdit.content.replace(/<\/?p>/g, '').trim());
        setNewPostExcerpt(postToEdit.excerpt);
        setNewPostAuthor(postToEdit.author);
      }
    } else {
      // Clear form when not editing
      setNewPostTitle('');
      setNewPostContent('');
      setNewPostExcerpt('');
      setNewPostAuthor('Admin');
    }
  }, [editingPostId, posts]); // Depend on editingPostId and posts to re-run when they change

  // Function to handle adding a new post
  const handleAddPost = (e) => {
    e.preventDefault();
    if (newPostTitle.trim() && newPostContent.trim() && newPostExcerpt.trim()) {
      // Call addPost from context
      addPost({
        title: newPostTitle.trim(),
        author: newPostAuthor,
        excerpt: newPostExcerpt.trim(),
        content: `<p>${newPostContent.trim().replace(/\n/g, '</p><p>')}</p>`, // Simple paragraph formatting
      });
      // Clear form fields after adding
      setNewPostTitle('');
      setNewPostContent('');
      setNewPostExcerpt('');
      console.log('New post added.');
    } else {
      // In a real application, replace with a custom modal/notification
      alert('Please fill in all fields for the new post.');
    }
  };

  // Function to handle updating an existing post
  const handleUpdatePost = (e) => {
    e.preventDefault();
    if (newPostTitle.trim() && newPostContent.trim() && newPostExcerpt.trim() && editingPostId) {
      // Call updatePost from context
      updatePost({
        id: editingPostId,
        title: newPostTitle.trim(),
        author: newPostAuthor,
        excerpt: newPostExcerpt.trim(),
        content: `<p>${newPostContent.trim().replace(/\n/g, '</p><p>')}</p>`,
      });
      setEditingPostId(null); // Exit editing mode
      // Clear form fields
      setNewPostTitle('');
      setNewPostContent('');
      setNewPostExcerpt('');
      console.log('Post updated.');
    } else {
      alert('Please fill in all fields to update the post.');
    }
  };

  // Function to start editing a post
  const startEditPost = (post) => {
    setEditingPostId(post.id);
  };

  // Function to handle deleting a post
  const handleDeleteClick = (id) => {
    // Call deletePost from context
    deletePost(id);
    console.log('Post deletion initiated.');
  };

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
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
        Back to Home
      </Link>

      <h1 className="text-4xl sm:text-5xl font-extrabold text-center text-gray-900 mb-12 tracking-tight drop-shadow-lg">
        Admin Dashboard
      </h1>

      {/* Create/Edit Post Section */}
      <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 mb-12 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          {editingPostId ? 'Edit Post' : 'Create New Post'}
        </h2>
        <form onSubmit={editingPostId ? handleUpdatePost : handleAddPost} className="space-y-4">
          <div>
            <label htmlFor="post-title" className="block text-gray-700 text-sm font-bold mb-2">
              Title:
            </label>
            <input
              type="text"
              id="post-title"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
              value={newPostTitle}
              onChange={(e) => setNewPostTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="post-excerpt" className="block text-gray-700 text-sm font-bold mb-2">
              Excerpt:
            </label>
            <textarea
              id="post-excerpt"
              rows="2"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
              value={newPostExcerpt}
              onChange={(e) => setNewPostExcerpt(e.target.value)}
              required
            ></textarea>
          </div>
          <div>
            <label htmlFor="post-content" className="block text-gray-700 text-sm font-bold mb-2">
              Content:
            </label>
            <textarea
              id="post-content"
              rows="8"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="flex justify-end gap-4">
            {editingPostId && (
              <button
                type="button"
                onClick={() => {
                  setEditingPostId(null);
                  setNewPostTitle('');
                  setNewPostContent('');
                  setNewPostExcerpt('');
                }}
                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-colors duration-200 shadow-md"
              >
                Cancel Edit
              </button>
            )}
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-colors duration-200 shadow-md flex items-center gap-2"
            >
              {editingPostId ? <Edit size={18} /> : <Plus size={18} />}
              {editingPostId ? 'Update Post' : 'Add Post'}
            </button>
          </div>
        </form>
      </div>

      {/* Manage Existing Posts Section */}
      <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Manage Existing Posts
        </h2>
        {posts.length === 0 ? (
          <p className="text-center text-gray-500">No posts available to manage.</p>
        ) : (
          <ul className="space-y-4">
            {posts.map((post) => (
              <li key={post.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-gray-50 p-4 rounded-lg border border-gray-200 shadow-sm">
                <span className="font-semibold text-lg text-gray-800 mb-2 sm:mb-0 sm:mr-4 flex-grow">
                  {post.title}
                </span>
                <div className="flex space-x-3">
                  <button
                    onClick={() => startEditPost(post)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-lg flex items-center justify-center transition-colors duration-200 shadow-md"
                    aria-label={`Edit ${post.title}`}
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => handleDeleteClick(post.id)}
                    className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg flex items-center justify-center transition-colors duration-200 shadow-md"
                    aria-label={`Delete ${post.title}`}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;