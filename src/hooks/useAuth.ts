import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { RootState, AppDispatch } from '@/store';
import {
  login,
  register,
  logout,
  refreshToken,
  getMe,
  forgotPassword,
  resetPassword,
  clearError,
  initializeAuth,
  clearAuth,
} from '@/store/slices/authSlice';
import { LoginRequest, RegisterRequest, ForgotPasswordRequest, ResetPasswordRequest } from '@/lib/auth-api';

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const auth = useSelector((state: RootState) => state.auth);

  return {
    // State
    user: auth.user,
    company: auth.company,
    isAuthenticated: auth.isAuthenticated,
    isLoading: auth.isLoading,
    error: auth.error,
    tokens: auth.tokens,

    // Actions (memoized to provide stable references)
    login: useCallback((credentials: LoginRequest) => dispatch(login(credentials)), [dispatch]),
    register: useCallback((data: RegisterRequest) => dispatch(register(data)), [dispatch]),
    logout: useCallback(() => dispatch(logout()), [dispatch]),
    refreshToken: useCallback(() => dispatch(refreshToken()), [dispatch]),
    getMe: useCallback(() => dispatch(getMe()), [dispatch]),
    forgotPassword: useCallback((data: ForgotPasswordRequest) => dispatch(forgotPassword(data)), [dispatch]),
    resetPassword: useCallback((data: ResetPasswordRequest) => dispatch(resetPassword(data)), [dispatch]),
    clearError: useCallback(() => dispatch(clearError()), [dispatch]),
    initializeAuth: useCallback(() => dispatch(initializeAuth()), [dispatch]),
    clearAuth: useCallback(() => dispatch(clearAuth()), [dispatch]),
  };
};
