import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Post, PostsState } from '../../types';

const initialState: PostsState = {
  posts: [],
};

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await axios.get<Post[]>('https://jsonplaceholder.typicode.com/posts');
  return response.data;
});

export const savePost = createAsyncThunk('posts/savePost', async (post: Post) => {
  if (post.id) {
    const response = await axios.put<Post>(`https://jsonplaceholder.typicode.com/posts/${post.id}`, post);
    return response.data;
  } else {
    const response = await axios.post<Post>('https://jsonplaceholder.typicode.com/posts', post);
    return response.data;
  }
});

export const deletePost = createAsyncThunk('posts/deletePost', async (id: number) => {
  await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
  return id;
});

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
        state.posts = action.payload;
      })
      .addCase(savePost.fulfilled, (state, action: PayloadAction<Post>) => {
        if (action.payload.id && state.posts.some(post => post.id === action.payload.id)) {
          const index = state.posts.findIndex(post => post.id === action.payload.id);
          state.posts[index] = action.payload;
        } else {
          state.posts.unshift(action.payload);
        }
      })
      .addCase(deletePost.fulfilled, (state, action: PayloadAction<number>) => {
        state.posts = state.posts.filter(post => post.id !== action.payload);
      });
  },
});

export default postsSlice.reducer;
