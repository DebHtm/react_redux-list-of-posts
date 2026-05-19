/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';

export const loadUsers = createAsyncThunk('users/loadUsers', async () => {
  return getUsers();
});

const usersSlice = createSlice({
  name: 'users',
  initialState: { users: [] as User[] },
  reducers: {},

  extraReducers: builder => {
    builder.addCase(loadUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    });
  },
});

// export const { setAuthor, setSelectedPost } = postsSlice.actions;

export default usersSlice.reducer;
