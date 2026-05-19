/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createComment, deleteComment, getPostComments } from '../api/comments';
import { Comment } from '../types/Comment';

interface CommentData {
  name: string;
  email: string;
  body: string;
}

export const loadComents = createAsyncThunk(
  'posts/loadComents',
  async (postId: number) => {
    return getPostComments(postId);
  },
);

export const addComents = createAsyncThunk(
  'posts/addComents',
  async (data: CommentData & { postId: number }) => {
    return createComment(data);
  },
);

export const deleteComents = createAsyncThunk(
  'posts/deleteComents',
  async (commentId: number) => {
    return deleteComment(commentId);
  },
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    comments: [] as Comment[],
    loaded: false,
    hasError: false,
    visible: false,
  },
  reducers: {
    setVisible: (state, action: PayloadAction<boolean>) => {
      state.visible = action.payload;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(loadComents.pending, state => {
        state.loaded = false;
        state.hasError = false;
        state.visible = false;
      })
      .addCase(loadComents.fulfilled, (state, action) => {
        state.loaded = true;
        state.comments = action.payload;
      })
      .addCase(loadComents.rejected, state => {
        state.loaded = true;
        state.hasError = true;
      })
      .addCase(addComents.fulfilled, (state, action) => {
        state.comments.push(action.payload);
      })
      .addCase(addComents.rejected, state => {
        state.hasError = true;
      })
      .addCase(deleteComents.pending, (state, action) => {
        state.comments = state.comments.filter(
          com => com.id !== action.meta.arg,
        );
      });
  },
});

export const { setVisible } = commentsSlice.actions;

export default commentsSlice.reducer;
