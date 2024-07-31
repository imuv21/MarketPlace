
import { combineReducers } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import movieSlice from './slices/movieSlice';
import usersSlice from './slices/usersSlice';
import friendsSlice from './slices/friendsSlice';


const rootReducer = combineReducers({
  auth: authSlice,
  movies: movieSlice,
  users: usersSlice,
  friends: friendsSlice
});

export default rootReducer;