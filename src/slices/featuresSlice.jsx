import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getLink = createAsyncThunk(
    'features/getLink',
    async (url, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BASE_URL}/service/generateurl`, url, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: 'An error occurred' });
        }
    }
);

export const getAnalysis = createAsyncThunk(
    'features/getAnalysis',
    async (shortId, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BASE_URL}/service/analytics/${shortId}`, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: 'An error occurred' });
        }
    }
);

export const sendEmailsInBulk = createAsyncThunk(
    'features/sendEmailsInBulk',
    async ({emailArray, subject, msg}, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BASE_URL}/service/sendbulkemails`, { emailArray, subject, msg }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: 'An error occurred' });
        }
    }
);


const featuresSlice = createSlice({
    name: 'features',
    initialState: {
        shortUrl: null,
        shortId: null,
        urlLoading: false,
        urlError: null,
        urlStatus: null,

        analytics: [],
        analysisLoading: false,
        analysisError: null,
        analysisStatus: null,

        emailLoading: false,
        emailMessage: null,
        emailStatus: null,
    },
    reducers: {
        clearShortUrl: (state) => {
            state.shortUrl = null;
            state.shortId = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getLink.pending, (state) => {
                state.urlLoading = true;
                state.urlError = null;
                state.urlStatus = null;
            })
            .addCase(getLink.fulfilled, (state, action) => {
                state.urlLoading = false;
                state.urlError = null;
                state.urlStatus = action.payload.status;
                state.shortUrl = action.payload.shortUrl;
                state.shortId = action.payload.shortId;
            })
            .addCase(getLink.rejected, (state, action) => {
                state.urlLoading = false;
                state.urlError = action.payload?.message || 'Failed to generate short URL';
                state.urlStatus = action.payload?.status || 'failed';
            })
            .addCase(getAnalysis.pending, (state) => {
                state.analysisLoading = true;
                state.analysisError = null;
                state.analysisStatus = null;
            })
            .addCase(getAnalysis.fulfilled, (state, action) => {
                state.analysisLoading = false;
                state.analysisError = null;
                state.analysisStatus = action.payload.status;
                state.analytics = action.payload.analytics;
            })
            .addCase(getAnalysis.rejected, (state, action) => {
                state.analysisLoading = false;
                state.analysisError = action.payload?.message || 'Failed to get analytics';
                state.analysisStatus = action.payload?.status || 'failed';
            })
            .addCase(sendEmailsInBulk.pending, (state) => {
                state.emailLoading = true;
                state.emailMessage = null;
                state.emailStatus = null;
            })
            .addCase(sendEmailsInBulk.fulfilled, (state, action) => {
                state.emailLoading = false;
                state.emailMessage = action.payload?.message;
                state.emailStatus = action.payload?.status || "success";
            })
            .addCase(sendEmailsInBulk.rejected, (state, action) => {
                state.emailLoading = false;
                state.emailMessage = action.payload?.message;
                state.emailStatus = action.payload?.status || "failed";
            })
    },
});

export const { clearShortUrl } = featuresSlice.actions;

export default featuresSlice.reducer;