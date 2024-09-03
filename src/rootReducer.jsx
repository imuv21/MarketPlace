
import { combineReducers } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import movieSlice from './slices/movieSlice';
import usersSlice from './slices/usersSlice';
import friendsSlice from './slices/friendsSlice';
import cartOrderSlice from './slices/cartOrderSlice';
import featuresSlice from './slices/featuresSlice';


const rootReducer = combineReducers({
  auth: authSlice,
  movies: movieSlice,
  users: usersSlice,
  friends: friendsSlice,
  cartorder: cartOrderSlice,
  features: featuresSlice,
});

export default rootReducer;