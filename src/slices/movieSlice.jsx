import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const addList = createAsyncThunk(
    'movies/addList',
    async (listData, { getState, rejectWithValue }) => {
        try {
            const { auth } = getState();
            const token = auth.token;
            const response = await axios.post(`${BASE_URL}/user/create-list`, listData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: 'An error occurred' });
        }
    }
);

export const editList = createAsyncThunk(
    'movies/editList',
    async ({ listData, listId }, { getState, rejectWithValue }) => {
        try {
            const { auth } = getState();
            const token = auth.token;
            const response = await axios.put(`${BASE_URL}/user/edit-list/${listId}`, listData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: 'An error occurred' });
        }
    }
);

export const getLists = createAsyncThunk(
    'movies/getLists',
    async (_, { getState, rejectWithValue }) => {
        try {
            const { auth } = getState();
            const token = auth.token;
            const response = await axios.get(`${BASE_URL}/user/get-lists`, {
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

export const getPublicLists = createAsyncThunk(
    'movies/getPublicLists',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BASE_URL}/user/get-all-lists`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: 'An error occurred' });
        }
    }
);

export const addMovie = createAsyncThunk(
    'movies/addMovie',
    async ({ movieData, listId }, { getState, rejectWithValue }) => {
        try {
            const { auth } = getState();
            const token = auth.token;
            const response = await axios.post(`${BASE_URL}/user/lists/${listId}/add-movie`, movieData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            });

            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: 'An error occurred' });
        }
    }
);

export const getMovies = createAsyncThunk(
    'movies/getMovies',
    async (listId, { getState, rejectWithValue }) => {
        try {
            const { auth } = getState();
            const token = auth.token;
            const response = await axios.get(`${BASE_URL}/user/get-movies/${listId}`, {
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

export const getPublicMovies = createAsyncThunk(
    'movies/getPublicMovies',
    async (listId, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BASE_URL}/user/get-all-movies/${listId}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: 'An error occurred' });
        }
    }
);

export const deleteMovie = createAsyncThunk(
    'movies/deleteMovie',
    async ({ movieId, listId }, { getState, rejectWithValue }) => {
        try {
            const { auth } = getState();
            const token = auth.token;
            const response = await axios.delete(`${BASE_URL}/user/delete-movie`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                data: { movieId, listId }
            });

            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: 'An error occurred' });
        }
    }
);

const movieSlice = createSlice({
    name: 'movies',
    initialState: {
        movies: [],
        loading: false,
        error: null,

        addMovieLoading: false,
        addMovieError: null,

        deleteMovieStatus: false,
        deleteMovieError: null,

        lists: [],
        getListsLoading: false,
        getListsError: null,

        addListLoading: false,
        addListError: null,

        editListLoading: false,
        editListError: null,

        publicLists: [],
        gplLoading: false,
        gplError: null,

        publicMovies: [],
        gpmLoading: false,
        gpmError: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addMovie.pending, (state) => {
                state.addMovieLoading = true;
                state.addMovieError = null;
            })
            .addCase(addMovie.fulfilled, (state) => {
                state.addMovieLoading = false;
                state.addMovieError = null;
            })
            .addCase(addMovie.rejected, (state, action) => {
                state.addMovieLoading = false;
                state.addMovieError = action.payload.message;
            })
            .addCase(getMovies.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getMovies.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.movies = action.payload.movies;
            })
            .addCase(getMovies.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })
            .addCase(deleteMovie.pending, (state) => {
                state.loading = true;
                state.deleteMovieError = null;
                state.deleteMovieStatus = false;
            })
            .addCase(deleteMovie.fulfilled, (state, action) => {
                state.loading = false;
                state.deleteMovieError = null;
                state.deleteMovieStatus = true;
                state.movies = state.movies.filter(movie => movie._id !== action.meta.arg);
            })
            .addCase(deleteMovie.rejected, (state, action) => {
                state.loading = false;
                state.deleteMovieError = action.payload.message;
                state.deleteMovieStatus = false;
            })
            .addCase(getLists.pending, (state) => {
                state.getListsLoading = true;
                state.getListsError = null;
            })
            .addCase(getLists.fulfilled, (state, action) => {
                state.getListsLoading = false;
                state.getListsError = null;
                state.lists = action.payload.lists;
            })
            .addCase(getLists.rejected, (state, action) => {
                state.getListsLoading = false;
                state.getListsError = action.payload.message;
            })
            .addCase(addList.pending, (state) => {
                state.addListLoading = true;
                state.addListError = null;
            })
            .addCase(addList.fulfilled, (state) => {
                state.addListLoading = false;
                state.addListError = null;
            })
            .addCase(addList.rejected, (state, action) => {
                state.addListLoading = false;
                state.addListError = action.payload.message;
            })
            .addCase(editList.pending, (state) => {
                state.editListLoading = true;
                state.editListError = null;
            })
            .addCase(editList.fulfilled, (state) => {
                state.editListLoading = false;
                state.editListError = null;
            })
            .addCase(editList.rejected, (state, action) => {
                state.editListLoading = false;
                state.editListError = action.payload.message;
            })
            .addCase(getPublicLists.pending, (state) => {
                state.gplLoading = true;
                state.gplError = null;
            })
            .addCase(getPublicLists.fulfilled, (state, action) => {
                state.gplLoading = false;
                state.gplError = null;
                state.publicLists = action.payload.lists;
            })
            .addCase(getPublicLists.rejected, (state, action) => {
                state.gplLoading = false;
                state.gplError = action.payload.message;
            })
            .addCase(getPublicMovies.pending, (state) => {
                state.gpmLoading = true;
                state.gpmError = null;
            })
            .addCase(getPublicMovies.fulfilled, (state, action) => {
                state.gpmLoading = false;
                state.gpmError = null;
                state.publicMovies = action.payload.movies;
            })
            .addCase(getPublicMovies.rejected, (state, action) => {
                state.gpmLoading = false;
                state.gpmError = action.payload.message;
            })
    },
});

export default movieSlice.reducer;
