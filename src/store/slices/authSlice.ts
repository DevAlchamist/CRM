import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { authApi, LoginRequest, RegisterRequest, ForgotPasswordRequest, ResetPasswordRequest } from '@/lib/auth-api';
import { setAuthCookies, clearAuthCookies, getAuthCookies } from '@/lib/cookies';

// Types
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'super_admin' | 'admin' | 'manager' | 'employee';
  companyId: string;
  lastLoginAt?: string | null;
}

export interface Company {
  id: string;
  name: string;
  logo?: string;
  industry: string;
  size: string;
  subscription: string;
  createdAt: string;
  isActive: boolean;
}

export interface AuthState {
  user: User | null;
  company: Company | null;
  tokens: {
    accessToken: string | null;
    refreshToken: string | null;
  };
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  company: null,
  tokens: {
    accessToken: null,
    refreshToken: null,
  },
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

// Async thunks
export const login = createAsyncThunk(
  'auth/login',
  async (credentials: LoginRequest, { rejectWithValue }) => {
    try {
      console.log('Login thunk: Starting login process');
      const response = await authApi.login(credentials);
      console.log('Login thunk: Auth API response received:', response);
      
      // Store tokens in localStorage and cookies
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem('accessToken', response.tokens.accessToken);
          localStorage.setItem('refreshToken', response.tokens.refreshToken);
          setAuthCookies(response.tokens.accessToken, response.tokens.refreshToken);
          console.log('Login thunk: Tokens stored in localStorage and cookies');
        } catch (storageError) {
          console.warn('Login thunk: Failed to store tokens:', storageError);
        }
      }
      
      console.log('Login thunk: Returning response:', response);
      return response;
    } catch (error: unknown) {
      console.error('Login thunk: Error occurred:', error);
      
      // Type guard for enhanced error
      const isEnhancedError = (err: unknown): err is Error & { 
        statusCode?: number; 
        reason?: string;
        isTimeout?: boolean;
        isNetworkError?: boolean;
      } => {
        return err instanceof Error;
      };
      
      if (isEnhancedError(error)) {
        let errorMessage = error.message;
        
        // Handle specific HTTP status codes
        if (error.statusCode === 401 || error.statusCode === 403) {
          // Check for email not verified reason
          if (error.reason === 'email_not_verified') {
            errorMessage = 'Please verify your email before logging in.';
          } else {
            errorMessage = 'Invalid email or password.';
          }
        } else if (error.statusCode === 404) {
          errorMessage = 'No account found with this email.';
        } else if (error.statusCode === 429) {
          errorMessage = 'Too many login attempts. Please try again later.';
        } else if (error.isTimeout) {
          errorMessage = 'Request timeout. Please try again.';
        } else if (error.isNetworkError || error.statusCode === 0) {
          errorMessage = 'Unable to reach server. Check your internet connection or try again.';
        }
        
        console.error('Login thunk: Rejecting with error:', errorMessage);
        return rejectWithValue(errorMessage);
      }
      
      return rejectWithValue('Login failed. Please try again.');
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (data: RegisterRequest, { rejectWithValue }) => {
    try {
      const response = await authApi.register(data);
      
      // Store tokens in localStorage and cookies
      if (typeof window !== 'undefined') {
        localStorage.setItem('accessToken', response.tokens.accessToken);
        localStorage.setItem('refreshToken', response.tokens.refreshToken);
        setAuthCookies(response.tokens.accessToken, response.tokens.refreshToken);
      }
      
      return response;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error && 'response' in error 
        ? (error as Error & { response: { body: { message?: string } } }).response?.body?.message 
        : 'Registration failed';
      return rejectWithValue(errorMessage || 'Registration failed');
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async () => {
    try {
      await authApi.logout();
      
      // Clear tokens from localStorage and cookies
      if (typeof window !== 'undefined') {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        clearAuthCookies();
      }
      
      return true;
    } catch {
      // Even if API call fails, clear local state
      if (typeof window !== 'undefined') {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        clearAuthCookies();
      }
      return true;
    }
  }
);

export const refreshToken = createAsyncThunk(
  'auth/refreshToken',
  async (_, { rejectWithValue }) => {
    try {
      const response = await authApi.refreshToken();
      
      // Update tokens in localStorage and cookies
      if (typeof window !== 'undefined') {
        localStorage.setItem('accessToken', response.accessToken);
        localStorage.setItem('refreshToken', response.refreshToken);
        setAuthCookies(response.accessToken, response.refreshToken);
      }
      
      return response;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error && 'response' in error 
        ? (error as Error & { response: { body: { message?: string } } }).response?.body?.message 
        : 'Token refresh failed';
      return rejectWithValue(errorMessage || 'Token refresh failed');
    }
  }
);

export const getMe = createAsyncThunk(
  'auth/getMe',
  async (_, { rejectWithValue }) => {
    try {
      const response = await authApi.getMe();
      return response;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error && 'response' in error 
        ? (error as Error & { response: { body: { message?: string } } }).response?.body?.message 
        : 'Failed to get user profile';
      return rejectWithValue(errorMessage || 'Failed to get user profile');
    }
  }
);

export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async (data: ForgotPasswordRequest, { rejectWithValue }) => {
    try {
      const response = await authApi.forgotPassword(data);
      return response;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error && 'response' in error 
        ? (error as Error & { response: { body: { message?: string } } }).response?.body?.message 
        : 'Failed to send reset email';
      return rejectWithValue(errorMessage || 'Failed to send reset email');
    }
  }
);

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async (data: ResetPasswordRequest, { rejectWithValue }) => {
    try {
      const response = await authApi.resetPassword(data);
      return response;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error && 'response' in error 
        ? (error as Error & { response: { body: { message?: string } } }).response?.body?.message 
        : 'Failed to reset password';
      return rejectWithValue(errorMessage || 'Failed to reset password');
    }
  }
);

// Auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    initializeAuth: (state) => {
      // Initialize auth state from localStorage and cookies on app start
      if (typeof window !== 'undefined') {
        try {
          // Check localStorage first
          let accessToken = localStorage.getItem('accessToken');
          let refreshToken = localStorage.getItem('refreshToken');

          // If not in localStorage, check cookies
          if (!accessToken || !refreshToken) {
            const cookies = getAuthCookies();
            accessToken = cookies.accessToken;
            refreshToken = cookies.refreshToken;
          }

          if (accessToken && refreshToken) {
            state.tokens = { accessToken, refreshToken };
            state.isAuthenticated = true;
            console.log('Auth initialized from storage');
          }
        } catch (error) {
          // Handle storage errors gracefully
          console.warn('Failed to initialize auth from storage:', error);
        }
      }
    },
    clearAuth: (state) => {
      state.user = null;
      state.company = null;
      state.tokens = { accessToken: null, refreshToken: null };
      state.isAuthenticated = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Login
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        console.log('Login fulfilled with payload:', action.payload);
        state.isLoading = false;
        state.user = action.payload.user;
        // Company data not included in backend response
        state.company = null;
        state.tokens = action.payload.tokens;
        state.isAuthenticated = true;
        state.error = null;
        console.log('Login state updated successfully');
      })
      .addCase(login.rejected, (state, action) => {
        console.error('Login rejected:', action.payload);
        state.isLoading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
      });

    // Register
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        // Company data not included in backend response
        state.company = action.payload.company || null;
        state.tokens = action.payload.tokens;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
      });

    // Logout
    builder
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.company = null;
        state.tokens = { accessToken: null, refreshToken: null };
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(logout.rejected, (state) => {
        state.isLoading = false;
        // Still clear auth state even if API call fails
        state.user = null;
        state.company = null;
        state.tokens = { accessToken: null, refreshToken: null };
        state.isAuthenticated = false;
      });

    // Refresh token
    builder
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.tokens = action.payload;
      })
      .addCase(refreshToken.rejected, (state) => {
        // If refresh fails, clear auth state
        state.user = null;
        state.company = null;
        state.tokens = { accessToken: null, refreshToken: null };
        state.isAuthenticated = false;
      });

    // Get me
    builder
      .addCase(getMe.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMe.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.company = (action.payload as any).company || state.company;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(getMe.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
      });

    // Forgot password
    builder
      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Reset password
    builder
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, setLoading, initializeAuth, clearAuth } = authSlice.actions;
export default authSlice.reducer;
