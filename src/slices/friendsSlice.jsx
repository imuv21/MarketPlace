import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const sendFriendRequest = createAsyncThunk(
    'friends/sendFriendRequest',
    async ({ friendId }, { getState, rejectWithValue }) => {
        try {
            const { auth } = getState();
            const token = auth.token;
            const response = await axios.post(
                `${BASE_URL}/user/send-friend-request`,
                { friendId },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            return response.data;
        } catch (error) {
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data);
            }
            return rejectWithValue(error.message);
        }
    }
);

const friendsSlice = createSlice({
    name: 'friends',
    initialState: {
        sfrStatus: 'idle',
        sfrError: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(sendFriendRequest.pending, (state) => {
                state.sfrStatus = 'loading';

            })
            .addCase(sendFriendRequest.fulfilled, (state) => {
                state.sfrStatus = 'success';
                state.sfrError = null;
            })
            .addCase(sendFriendRequest.rejected, (state, action) => {
                state.sfrStatus = 'failed';
                state.sfrError = action.payload;
            });
    }
});

export default friendsSlice.reducer;