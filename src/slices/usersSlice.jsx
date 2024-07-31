import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getAllUsers = createAsyncThunk(
    'users/getAllUsers',
    async (_, { getState, rejectWithValue }) => {
        try {
            const { auth } = getState();
            const token = auth.token;
            const response = await axios.get(`${BASE_URL}/user/all-users`, {
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

export const getFriends = createAsyncThunk(
    'users/getFriends',
    async (_, { getState, rejectWithValue }) => {
        try {
            const { auth } = getState();
            const token = auth.token;
            const response = await axios.get(`${BASE_URL}/user/friends`, {
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

export const getFriendReqs = createAsyncThunk(
    'users/getFriendReqs',
    async (_, { getState, rejectWithValue }) => {
        try {
            const { auth } = getState();
            const token = auth.token;
            const response = await axios.get(`${BASE_URL}/user/friend-reqs`, {
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

export const searching = createAsyncThunk(
    'users/searching',
    async ({ searchQuery }, { getState, rejectWithValue }) => {
        try {
            const { auth } = getState();
            const token = auth.token;
            const response = await axios.get(`${BASE_URL}/user/search?searchQuery=${searchQuery}`, {
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

export const getNotifications = createAsyncThunk(
    'users/getNotifications',
    async (_, { getState, rejectWithValue }) => {
        try {
            const { auth } = getState();
            const token = auth.token;
            const response = await axios.get(`${BASE_URL}/user/notifications`, {
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

export const deleteNotification = createAsyncThunk(
    'users/deleteNotification',
    async (notificationId, { getState, rejectWithValue }) => {
        try {
            const { auth } = getState();
            const token = auth.token;
            const response = await axios.delete(`${BASE_URL}/user/notifications/${notificationId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return { notificationId, ...response.data };
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: 'An error occurred' });
        }
    }
);


const initialState = {
    users: [],
    loading: false,
    error: null,

    friends: [],
    loadingFriends: false,
    errorFriends: null,

    friendReqs: [],
    loadingFriendReqs: false,
    errorFriendReqs: null,

    searchedUsers: [],
    loadingSearchedUsers: false,
    errorSearchedUsers: null,

    notifications: [],
    totalNotifications: 0,
    loadingNotifications: false,
    errorNotifications: null,
    deletingNotification: false,
    errorDeletingNotification: null
};

const usersSlice = createSlice({
    name: 'users',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getAllUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload.users;
            })
            .addCase(getAllUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getFriends.pending, (state) => {
                state.loadingFriends = true;
                state.errorFriends = null;
            })
            .addCase(getFriends.fulfilled, (state, action) => {
                state.loadingFriends = false;
                state.friends = action.payload.friends;
            })
            .addCase(getFriends.rejected, (state, action) => {
                state.loadingFriends = false;
                state.errorFriends = action.payload;
            })
            .addCase(getFriendReqs.pending, (state) => {
                state.loadingFriendReqs = true;
                state.errorFriendReqs = null;
            })
            .addCase(getFriendReqs.fulfilled, (state, action) => {
                state.loadingFriendReqs = false;
                state.friendReqs = action.payload.friendReqs;
            })
            .addCase(getFriendReqs.rejected, (state, action) => {
                state.loadingFriendReqs = false;
                state.errorFriendReqs = action.payload;
            })
            .addCase(searching.pending, (state) => {
                state.loadingSearchedUsers = true;
                state.errorSearchedUsers = null;
            })
            .addCase(searching.fulfilled, (state, action) => {
                state.loadingSearchedUsers = false;
                state.searchedUsers = action.payload.users;
            })
            .addCase(searching.rejected, (state, action) => {
                state.loadingSearchedUsers = false;
                state.errorSearchedUsers = action.payload;
            })
            .addCase(getNotifications.pending, (state) => {
                state.loadingNotifications = true;
                state.errorNotifications = null;
            })
            .addCase(getNotifications.fulfilled, (state, action) => {
                state.loadingNotifications = false;
                state.notifications = action.payload.notifications;
                state.totalNotifications = action.payload.totalNotifications;
            })
            .addCase(getNotifications.rejected, (state, action) => {
                state.loadingNotifications = false;
                state.errorNotifications = action.payload;
            })
            .addCase(deleteNotification.pending, (state) => {
                state.deletingNotification = true;
                state.errorDeletingNotification = null;
            })
            .addCase(deleteNotification.fulfilled, (state, action) => {
                state.deletingNotification = false;
                state.notifications = state.notifications.filter(not => not._id !== action.payload.notificationId);
            })
            .addCase(deleteNotification.rejected, (state, action) => {
                state.deletingNotification = false;
                state.errorDeletingNotification = action.payload;
            });
    }
});

export default usersSlice.reducer;
