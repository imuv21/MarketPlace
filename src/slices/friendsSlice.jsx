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

export const cancelFriendRequest = createAsyncThunk(
    'friends/cancelFriendRequest',
    async ({ friendId }, { getState, rejectWithValue }) => {
        try {
            const { auth } = getState();
            const token = auth.token;
            const response = await axios.post(
                `${BASE_URL}/user/cancel-friend-request`,
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

export const responseToFriendRequest = createAsyncThunk(
    'friends/responseToFriendRequest',
    async ({ response, friendId }, { getState, rejectWithValue }) => {
        try {
            const { auth } = getState();
            const token = auth.token;
            const result = await axios.post(
                `${BASE_URL}/user/response-friend-request`,
                { response, friendId },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            return result.data;
        } catch (error) {
            if (error.result && error.result.data) {
                return rejectWithValue(error.result.data);
            }
            return rejectWithValue(error.message);
        }
    }
);

export const unfriendTheUser = createAsyncThunk(
    'friends/unfriendTheUser',
    async ({ friendId }, { getState, rejectWithValue }) => {
        try {
            const { auth } = getState();
            const token = auth.token;
            const response = await axios.post(`${BASE_URL}/user/unfriend`, { friendId },
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

export const fetchMessages = createAsyncThunk(
    'friends/fetchMessages',
    async ({ senderId, receiverId }, { getState, rejectWithValue }) => {
        try {
            const { auth } = getState();
            const token = auth.token;
            const response = await axios.get(`${BASE_URL}/user/get-message/${senderId}/${receiverId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const sendMessage = createAsyncThunk(
    'friends/sendMessage',
    async ({ senderId, receiverId, content }, { getState, rejectWithValue }) => {
        try {
            const { auth } = getState();
            const token = auth.token;
            const response = await axios.post(`${BASE_URL}/user/send-message`, 
                { senderId, receiverId, content },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const friendsSlice = createSlice({
    name: 'friends',
    initialState: {
        sfrStatus: 'idle',
        sfrError: null,

        cfrStatus: 'idle',
        cfrError: null,

        rtrStatus: 'idle',
        rtrError: null,

        utuStatus: 'idle',
        utuError: null,

        chat: [],
        receiver: null,
        msgLoading: false,
        msgError: null,

        sendMsgError: null,
        sendMsgStatus: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(sendFriendRequest.pending, (state) => {
                state.sfrStatus = 'loading';
                state.sfrError = null;
            })
            .addCase(sendFriendRequest.fulfilled, (state) => {
                state.sfrStatus = 'success';
                state.sfrError = null;
            })
            .addCase(sendFriendRequest.rejected, (state, action) => {
                state.sfrStatus = 'failed';
                state.sfrError = action.payload;
            })
            .addCase(cancelFriendRequest.pending, (state) => {
                state.cfrStatus = 'loading';
                state.cfrError = null;
            })
            .addCase(cancelFriendRequest.fulfilled, (state) => {
                state.cfrStatus = 'success';
                state.cfrError = null;
            })
            .addCase(cancelFriendRequest.rejected, (state, action) => {
                state.cfrStatus = 'failed';
                state.cfrError = action.payload;
            })
            .addCase(responseToFriendRequest.pending, (state) => {
                state.rtrStatus = 'loading';
                state.rtrError = null;
            })
            .addCase(responseToFriendRequest.fulfilled, (state) => {
                state.rtrStatus = 'success';
                state.rtrError = null;
            })
            .addCase(responseToFriendRequest.rejected, (state, action) => {
                state.rtrStatus = 'failed';
                state.rtrError = action.payload;
            })
            .addCase(unfriendTheUser.pending, (state) => {
                state.utuStatus = 'loading';
                state.utuError = null;
            })
            .addCase(unfriendTheUser.fulfilled, (state) => {
                state.utuStatus = 'success';
                state.utuError = null;
            })
            .addCase(unfriendTheUser.rejected, (state, action) => {
                state.utuStatus = 'failed';
                state.utuError = action.payload;
            })
            .addCase(fetchMessages.pending, (state) => {
                state.msgLoading = true;
                state.msgError = null;
            })
            .addCase(fetchMessages.fulfilled, (state, action) => {
                state.msgLoading = false;
                state.chat = action.payload.chat;
                state.receiver = action.payload.receiver;
            })
            .addCase(fetchMessages.rejected, (state, action) => {
                state.msgLoading = false;
                state.msgError = action.payload;
            })
            .addCase(sendMessage.pending, (state) => {
                state.sendMsgError = null;
                state.sendMsgStatus = 'loading';
            })
            .addCase(sendMessage.fulfilled, (state, action) => {
                state.sendMsgError = null;
                state.sendMsgStatus = 'success';
            })
            .addCase(sendMessage.rejected, (state, action) => {
                state.sendMsgError = action.payload;
                state.sendMsgStatus = 'failed';
            });
    }
});

export default friendsSlice.reducer;