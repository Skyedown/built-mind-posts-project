import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts, deletePost } from '../features/posts/postsSlice';
import { AppDispatch, RootState } from '../app/store';
import { Post } from '../types';

interface Props {
  onSelectPost: (post: Post) => void;
}

export default function PostsList({ onSelectPost }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const posts = useSelector((state: RootState) => state.posts.posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleDelete = (id: number | undefined) => {
    if (id !== undefined) {
      dispatch(deletePost(id));
    } else {
      console.error("Cannot delete post without an id");
    }
  };

return (
    <div className="bg-white p-4">
      {posts.map((post) => (
        <div key={post.id} className="mb-4 p-4 rounded shadow-lg bg-primary text-white flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className='w-7/8 md:w-5/6'>
            <h2 className="text-xl mx-auto font-bold">{post.title}</h2>
            <p>{post.body}</p>
          </div>
          <div className="w-1/8 md:w-1/6 flex flex-col space-y-2 mt-2 md:mt-0">
            <button onClick={() => onSelectPost(post)} 
                    className="bg-white text-black p-2 rounded hover:bg-gray-200 flex items-center justify-center w-full">
              <span role="img" aria-label="Edit" className="mr-2">✏️</span> Edit
            </button>
            <button onClick={() => handleDelete(post.id)} 
                    className="bg-red-600 text-white p-2 rounded hover:bg-red-700 flex items-center justify-center w-full">
              <span role="img" aria-label="Delete" className="mr-2">🗑</span> Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
