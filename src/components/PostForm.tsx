import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { savePost } from '../features/posts/postsSlice';
import { Post } from '../types';
import { AppDispatch } from '../app/store';

interface Props {
  post: Post | null;
  clearSelected: () => void;
}

type error = {
    isError: boolean,
    message: string;
}

export default function PostForm({ post, clearSelected }: Props) {
  const [title, setTitle] = useState<string>('');
  const [body, setBody] = useState<string>('');
const [error, setError] = useState<error>({isError: false, message: ''});

  const dispatch = useDispatch<AppDispatch>();
    const formRef = useRef<HTMLFormElement>(null);


  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setBody(post.body);
      formRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else {
      setTitle('');
      setBody('');
    }
  }, [post]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if(body && title) {
          e.preventDefault();
    dispatch(savePost({ id: post?.id, title, body }));
    clearSelected();
    setTitle('');
    setBody('');
    setError({isError: false, message: ''})
        } else {
    e.preventDefault();
    setError({isError: true, message: 'Add title and body to submit'})

    }

  };

   const handleCancel = () => {
    clearSelected();
    setTitle('');
    setBody('');
    setError({isError:false , message:''})
  };

return (
    <form ref={formRef} onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-lg mt-4">
      <h3 className="text-lg font-bold text-primary mb-2">{post ? 'Edit Post' : 'Add New Post'}</h3>
      <label htmlFor="title" className="block text-md font-bold text-gray-700">Title</label>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}
             className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" />
      <label htmlFor="body" className="block text-md font-bold text-gray-700 mt-4">Body</label>
      <textarea value={body} onChange={(e) => setBody(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"></textarea>
      <div className="flex justify-end space-x-4 mt-4">
        <button type="submit" className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark">{post ? 'Update' : 'Add'}</button>
        {post && <button type="button" onClick={handleCancel} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-gray-600">Cancel</button>}
      </div>
      {error.isError && (!title || !body) && <div className='bg-red-600 rounded text-white p-4 mt-4'>{error.message}</div>}
    </form>
  );
}
