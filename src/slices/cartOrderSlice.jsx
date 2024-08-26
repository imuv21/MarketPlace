import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

// export const addMovie = createAsyncThunk(
//     'movies/addMovie',
//     async (movieData, { getState, rejectWithValue }) => {
//         try {
//             const { auth } = getState();
//             const token = auth.token;
//             const response = await axios.post(`${BASE_URL}/user/add-movie`, movieData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                     'Authorization': `Bearer ${token}`
//                 }
//             });

//             return response.data;
//         } catch (error) {
//             return rejectWithValue(error.response?.data || { message: 'An error occurred' });
//         }
//     }
// );

export const getOrders = createAsyncThunk(
    'cartorder/getOrders',
    async (_, { getState, rejectWithValue }) => {
        try {
            const { auth } = getState();
            const token = auth.token;
            const response = await axios.get(`${BASE_URL}/user/get-orders`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: 'An error occurred' });
        }
    }
);

// export const deleteMovie = createAsyncThunk(
//     'movies/deleteMovie',
//     async (movieId, { getState, rejectWithValue }) => {
//         try {
//             const { auth } = getState();
//             const token = auth.token;
//             const response = await axios.delete(`${BASE_URL}/user/delete-movie`, {
//                 headers: {
//                     'Authorization': `Bearer ${token}`
//                 },
//                 data: { movieId }
//             });

//             return response.data;
//         } catch (error) {
//             return rejectWithValue(error.response?.data || { message: 'An error occurred' });
//         }
//     }
// );

const cartOrderSlice = createSlice({
    name: 'cartorder',
    initialState: {
        orders: [],
        loading: false,
        error: null,
        orderStatus: false
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // .addCase(addMovie.pending, (state) => {
            //     state.loading = true;
            //     state.addMovieErrors = null;
            //     state.addMovieStatus = false;
            // })
            // .addCase(addMovie.fulfilled, (state, action) => {
            //     state.loading = false;
            //     state.addMovieErrors = null;
            //     state.addMovieStatus = true;
            // })
            // .addCase(addMovie.rejected, (state, action) => {
            //     state.loading = false;
            //     state.addMovieErrors = action.payload.message;
            //     state.addMovieStatus = false;
            // })


            .addCase(getOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.orderStatus = false;
            })
            .addCase(getOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload.orders; 
                state.orderStatus = true;
            })
            .addCase(getOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
                state.orderStatus = false;
            });


            // .addCase(deleteMovie.pending, (state) => {
            //     state.loading = true;
            //     state.deleteMovieError = null;
            //     state.deleteMovieStatus = false;
            // })
            // .addCase(deleteMovie.fulfilled, (state, action) => {
            //     state.loading = false;
            //     state.deleteMovieError = null;
            //     state.deleteMovieStatus = true;
            //     state.movies = state.movies.filter(movie => movie._id !== action.meta.arg);
            // })
            // .addCase(deleteMovie.rejected, (state, action) => {
            //     state.loading = false;
            //     state.deleteMovieError = action.payload.message;
            //     state.deleteMovieStatus = false;
            // });
    },
});

export default cartOrderSlice.reducer;