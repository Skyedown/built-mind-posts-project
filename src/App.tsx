import React, { useState } from 'react';
import './App.css';
import PostsList from './components/PostsList';
import PostForm from './components/PostForm';
import { Post } from './types';

function App() {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const handleSelectPost = (post: Post) => {
    setSelectedPost(post);
  };

  const clearSelectedPost = () => {
    setSelectedPost(null);
  };

  return (
    <div className="App">
      <header className="bg-primary p-10">
        <h1 className="text-xl font-bold text-white">Share a post with us! What's on your Mind?</h1>
      </header>
      <main className="p-4">
        <PostForm post={selectedPost} clearSelected={clearSelectedPost} />
        <PostsList onSelectPost={handleSelectPost} />
      </main>
    </div>
  );
}

export default App;
