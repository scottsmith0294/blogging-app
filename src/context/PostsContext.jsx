
// src/context/PostsContext.js
import React, { createContext, useState, useEffect } from 'react';
import initialPosts from '../data/posts'; // Import your initial mock data

// Create the context
export const PostsContext = createContext();

// Utility to generate unique IDs
const generateUniqueId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

// Create the Provider component
export const PostsProvider = ({ children }) => {
  // Use localStorage for persistence, similar to your To-Do app
  const [posts, setPosts] = useState(() => {
    try {
      const savedPosts = localStorage.getItem('blog-posts');
      // If no posts are saved in localStorage, use the initial mock data
      return savedPosts ? JSON.parse(savedPosts) : initialPosts;
    } catch (error) {
      console.error("Failed to load posts from localStorage:", error);
      return initialPosts; // Fallback to initial mock data on error
    }
  });

  // Save posts to localStorage whenever the posts state changes
  useEffect(()=> {
    try {
      localStorage.setItem('blog-posts', JSON.stringify(posts));
    } catch (error) {
      console.error("Failed to save posts to localStorage:", error);
    }
  }, [posts]); // Dependency array: effect runs when 'posts' changes

  // Functions to manage posts
  const addPost = (newPostData) => {
    const newPost = {
      id: generateUniqueId(),
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      ...newPostData, // Spread newPostData to include title, author, excerpt, content
    };
    setPosts((prevPosts) => [newPost, ...prevPosts]); // Add new post to the beginning
  };

  const updatePost = (updatedPostData) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === updatedPostData.id
          ? { ...post, ...updatedPostData } // Update only the changed fields
          : post
      )
    );
  };

  const deletePost = (id) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
    }
  };

  // The value provided to consumers of this context
  const contextValue = {
    posts,
    addPost,
    updatePost,
    deletePost,
  };

  return (
    <PostsContext.Provider value={contextValue}>
      {children} {/* Render child components that will consume this context */}
    </PostsContext.Provider>
  );
};