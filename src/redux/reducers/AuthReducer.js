import {createSlice} from '@reduxjs/toolkit';

const AuthSlice = createSlice({
  name: 'auth',
  initialState: {
    logIn: false,
  },
  reducers: {
    setLogin: (state, action) => {
      state.logIn = action.payload;
    },
  },
});

export const {setLogin} = AuthSlice.actions;

export default AuthSlice.reducer;
