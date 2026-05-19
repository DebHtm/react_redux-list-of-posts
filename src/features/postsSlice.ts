/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getUserPosts } from '../api/posts';
import { Post } from '../types/Post';
import { User } from '../types/User';

export interface PostsState {
  posts: Post[];
  author: User | null;
  selectedPost: Post | null;
  loading: boolean;
  error: boolean;
}

const initialState: PostsState = {
  posts: [],
  author: null,
  selectedPost: null,
  loading: false,
  error: false,
};

export const loadUserPosts = createAsyncThunk(
  'posts/loadUserPosts',
  async (userId: number) => {
    return getUserPosts(userId);
  },
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setAuthor: (state, action: PayloadAction<User | null>) => {
      state.author = action.payload;
      state.selectedPost = null;

      if (!action.payload) {
        state.posts = [];
        state.error = false;
        state.loading = false;
      }
    },

    setSelectedPost: (state, action: PayloadAction<Post | null>) => {
      state.selectedPost = action.payload;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(loadUserPosts.pending, state => {
        state.loading = true;
        state.error = false;
      })
      .addCase(loadUserPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(loadUserPosts.rejected, state => {
        state.loading = false;
        state.error = true;
      });
  },
});

export const { setAuthor, setSelectedPost } = postsSlice.actions;

export default postsSlice.reducer;
