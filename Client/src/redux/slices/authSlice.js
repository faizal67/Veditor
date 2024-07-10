import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null,
  error: null,
  signupSuccess: false,
};

const apiUrl = import.meta.env.VITE_API_URL;


// Thunks
export const loadUser = createAsyncThunk('auth/loadUser', async (_, thunkAPI) => {
  try {
    const res = await axios.get(`${apiUrl}/api/auth/me`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return res.data.user;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

export const login = createAsyncThunk('auth/login', async ({ email, password }, thunkAPI) => {
  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post(`${apiUrl}/api/auth/login`, body, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    localStorage.setItem('token', res.data.token);
    thunkAPI.dispatch(loadUser());
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

export const signup = createAsyncThunk('auth/signup', async ({ email, password, username }, thunkAPI) => {
  const body = JSON.stringify({ username, email, password });
  try {
    const res = await axios.post(`${apiUrl}/api/auth/register`, body, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

export const logout = createAsyncThunk('auth/logout', async () => {
  localStorage.removeItem('token');
});

export const resetAuthError = createAction('auth/resetAuthError');

// New thunk to add document ID to user
export const addDocumentToUser = createAsyncThunk('auth/addDocumentToUser', async ({ docId, fileName }, thunkAPI) => {
  const body = JSON.stringify({ docId, fileName });
  try {
    const res = await axios.post(`${apiUrl}/api/auth/addDocument`, body, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loadUser.rejected, (state) => {
        state.isAuthenticated = false;
        state.loading = false;
        state.user = null;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.token = null;
        state.isAuthenticated = false;
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state) => {
        state.loading = false;
        state.signupSuccess = true;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.signupSuccess = false;
      })
      .addCase(logout.fulfilled, (state) => {
        state.token = null;
        state.isAuthenticated = false;
        state.loading = false;
        state.user = null;
        state.signupSuccess = false;
      })
      .addCase(resetAuthError, (state) => {
        state.error = null;
      })
      .addCase(addDocumentToUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(addDocumentToUser.fulfilled, (state, action) => {
        state.user = { ...state.user, docs: action.payload.docs };
        state.loading = false;
      })
      .addCase(addDocumentToUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
