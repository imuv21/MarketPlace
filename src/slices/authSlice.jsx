import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const signupUser = createAsyncThunk(
    'auth/signupUser',
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BASE_URL}/user/signup`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.data.success === false) {
                return rejectWithValue(response.data.errors);
            }
            return response.data;
        } catch (error) {
            if (error.response && error.response.data) {
                if (error.response.data.message) {
                    return rejectWithValue({ message: error.response.data.message });
                }
                return rejectWithValue(error.response.data.errors);
            }
            return rejectWithValue({ message: error.message });
        }
    }
);

export const verifyOtp = createAsyncThunk(
    'auth/verifyOtp',
    async ({ email, otp, role }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BASE_URL}/user/verify-otp`, { email, otp, role }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.data.status === 'failed') {
                return rejectWithValue(response.data.message);
            }
            return response.data;
        } catch (error) {
            if (error.response && error.response.data) {
                if (error.response.data.message) {
                    return rejectWithValue({ message: error.response.data.message });
                }
                return rejectWithValue(error.response.data.errors);
            }
            return rejectWithValue({ message: error.message });
        }
    }
);

export const deleteUser = createAsyncThunk(
    'auth/deleteUser',
    async ({ email, password, role }, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`${BASE_URL}/user/delete-user`, {
                data: { email, password, role },
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.data.status === 'failed') {
                return rejectWithValue(response.data.message);
            }
            return response.data;
        } catch (error) {
            if (error.response && error.response.data) {
                if (error.response.data.message) {
                    return rejectWithValue({ message: error.response.data.message });
                }
                return rejectWithValue(error.response.data.errors);
            }
            return rejectWithValue({ message: error.message });
        }
    }
);

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BASE_URL}/user/login`, userData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.data.status === false) {
                return rejectWithValue(response.data.errors);
            }
            return response.data;
        } catch (error) {
            if (error.response && error.response.data) {
                if (error.response.data.message) {
                    return rejectWithValue({ message: error.response.data.message });
                }
                return rejectWithValue(error.response.data.errors);
            }
            return rejectWithValue({ message: error.message });
        }
    }
);

export const updateProfile = createAsyncThunk(
    'auth/updateProfile',
    async (formData, { getState, rejectWithValue }) => {
        try {
            const { auth } = getState();
            const token = auth.token;

            const response = await axios.put(`${BASE_URL}/user/update-profile`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (response.data.status === 'success') {
                return response.data;
            }
            return rejectWithValue(response.data.message);
        } catch (error) {
            if (error.response.data.message) {
                return rejectWithValue({ message: error.response.data.message });
            }
            return rejectWithValue({ message: error.message });
        }
    }
);

export const logoutUser = createAsyncThunk(
    'auth/logoutUser',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BASE_URL}/user/logout`);
            if (response.data.status === false) {
                return rejectWithValue(response.data.errors);
            }
            return response.data;
        } catch (error) {
            if (error.response && error.response.data) {
                if (error.response.data.message) {
                    return rejectWithValue({ message: error.response.data.message });
                }
                return rejectWithValue(error.response.data.errors);
            }
            return rejectWithValue({ message: error.message });
        }
    }
);

const initialState = {
    signupData: null,
    user: null,
    token: null,
    loading: false,
    errors: null,
    generalError: null,
    otpErrors: null,
    otpStatus: null,
    delUserLoading: false,
    delUserError: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearErrors: (state) => {
            state.errors = null;
            state.generalError = null;
            state.otpErrors = null;
        },
        setSignupData: (state, action) => {
            state.signupData = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(signupUser.pending, (state) => {
                state.loading = true;
                state.errors = null;
                state.generalError = null;
            })
            .addCase(signupUser.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(signupUser.rejected, (state, action) => {
                state.loading = false;
                if (Array.isArray(action.payload)) {
                    state.errors = action.payload;
                } else {
                    state.generalError = action.payload.message;
                }
            })
            .addCase(verifyOtp.pending, (state) => {
                state.loading = true;
                state.otpErrors = null;
                state.otpStatus = null;
            })
            .addCase(verifyOtp.fulfilled, (state) => {
                state.loading = false;
                state.otpStatus = 'success';
            })
            .addCase(verifyOtp.rejected, (state, action) => {
                state.loading = false;
                state.otpErrors = action.payload;
                state.otpStatus = 'failed';
            })
            .addCase(deleteUser.pending, (state) => {
                state.delUserLoading = true;
                state.delUserError = null;
            })
            .addCase(deleteUser.fulfilled, (state) => {
                state.delUserLoading = false;
                state.delUserError = null;
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.delUserLoading = false;
                state.delUserError = action.payload.message;
            })
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.errors = null;
                state.generalError = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                if (Array.isArray(action.payload)) {
                    state.errors = action.payload;
                } else {
                    state.generalError = action.payload.message;
                }
            })
            .addCase(updateProfile.pending, (state) => {
                state.loading = true;
                state.generalError = null;
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.user = {
                    ...state.user,
                    firstName: action.payload.user.firstName,
                    lastName: action.payload.user.lastName,
                    country: action.payload.user.country,
                    image: action.payload.user.image
                };
                state.generalError = null;
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.loading = false;
                state.generalError = action.payload;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
                state.token = null;
                state.loading = false;
                state.errors = null;
                state.generalError = null;
                state.otpErrors = null;
                state.otpStatus = null;
                state.signupData = null;
            });
    },
});

export const { clearErrors, setSignupData } = authSlice.actions;
export default authSlice.reducer;

