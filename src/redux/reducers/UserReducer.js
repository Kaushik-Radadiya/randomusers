import {createSlice} from '@reduxjs/toolkit';

const UserSlice = createSlice({
  name: 'user',
  initialState: {
    users: [],
    favorites: [],
  },
  reducers: {
    setUser: (state, action) => {
      state.users = action.payload;
    },
    addFavorite: (state, action) => {
      state.favorites = [...state.favorites, action.payload];
    },
    removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter(
        user => user.id.value !== action.payload.id.value,
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const {setUser, addFavorite, removeFavorite} = UserSlice.actions;

export default UserSlice.reducer;
