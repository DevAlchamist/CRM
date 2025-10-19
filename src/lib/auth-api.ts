import api from './api';

// Types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: {
    id: string;
    email: string;
    name: string;
    role: 'super_admin' | 'admin' | 'manager' | 'employee';
    companyId: string;
    lastLoginAt?: string | null;
  };
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
  company?: Company; // Optional: present for /me or register
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  signupType: 'create_company' | 'join_company';
  companyName?: string; // Required for create_company
  companyId?: string; // Required for join_company
  companyInviteKey?: string; // Optional: join via invite key
  industry?: string;
  companySize?: string;
  website?: string;
  timezone?: string;
  currency?: string;
}

export interface RegisterResponse {
  user: LoginResponse['user'];
  company?: {
    id: string;
    name: string;
    logo?: string;
    industry: string;
    size: string;
    subscription: string;
    createdAt: string;
    isActive: boolean;
  };
  tokens: LoginResponse['tokens'];
}

export interface Company {
  id: string;
  name: string;
  industry: string;
  size: string;
  logo?: string;
  website?: string;
  isActive: boolean;
  createdAt: string;
}

export interface CompaniesResponse {
  companies: Company[];
  total: number;
  page: number;
  limit: number;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  password: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}

// Auth API functions
export const authApi = {
  // Public routes (no auth required)
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    console.log('Auth API: Attempting login with credentials:', credentials);
    
    try {
      const response = await api.post('auth/login', {
        json: credentials,
      });
      
      console.log('Auth API: Raw response:', response.body);
      
      // Handle the backend response structure and normalize to our expected shape
      const data = response.body as {
        error: boolean;
        message: string;
        result: {
          accessToken?: string;
          refreshToken?: string;
          tokens?: { accessToken: string; refreshToken: string };
          user: LoginResponse['user'];
        };
      };
      
      console.log('Auth API: Parsed response:', data);
      
      if (data.error) {
        console.error('Auth API: Login failed with error:', data.message);
        throw new Error(data.message || 'Login failed');
      }
      
      const tokens = data.result.tokens ?? {
        accessToken: data.result.accessToken || '',
        refreshToken: data.result.refreshToken || '',
      };
      
      const normalized: LoginResponse = {
        user: data.result.user,
        tokens,
      };
      
      console.log('Auth API: Login successful, returning normalized result:', normalized);
      return normalized;
    } catch (error: unknown) {
      console.error('Auth API: Login error caught:', error);
      
      // Type guard for custom error with response property
      const isHttpError = (err: unknown): err is Error & { 
        statusCode: number; 
        response: { status: number; body: { message?: string; reason?: string } };
        isTimeout?: boolean;
        isNetworkError?: boolean;
      } => {
        return err instanceof Error && 'statusCode' in err;
      };
      
      if (isHttpError(error)) {
        const statusCode = error.statusCode;
        const responseBody = error.response?.body || {};
        const message = responseBody.message || error.message;
        const reason = responseBody.reason;
        
        // Create enhanced error with specific status code
        const enhancedError = new Error(message) as Error & { 
          statusCode: number; 
          reason?: string;
          isTimeout?: boolean;
          isNetworkError?: boolean;
        };
        enhancedError.statusCode = statusCode;
        enhancedError.reason = reason;
        enhancedError.isTimeout = error.isTimeout;
        enhancedError.isNetworkError = error.isNetworkError;
        
        throw enhancedError;
      }
      
      throw error;
    }
  },

  async register(data: RegisterRequest): Promise<RegisterResponse> {
    const response = await api.post('auth/signup', {
      json: data,
    });
    
    // Handle the backend response structure
    const result = response.body as {
      error: boolean;
      message: string;
      result: {
        user: RegisterResponse['user'];
        company?: RegisterResponse['company'];
        accessToken?: string;
        refreshToken?: string;
        tokens?: RegisterResponse['tokens'];
      };
    };
    
    if (result.error) {
      throw new Error(result.message || 'Registration failed');
    }
    
    const tokens = result.result.tokens ?? {
      accessToken: result.result.accessToken || '',
      refreshToken: result.result.refreshToken || '',
    };
    
    return {
      user: result.result.user,
      company: result.result.company,
      tokens,
    };
  },

  async forgotPassword(data: ForgotPasswordRequest): Promise<{ message: string }> {
    const response = await api.post('auth/forgot-password', {
      json: data,
    });
    
    const result = response.body as { error: boolean; message: string; result?: { message: string } };
    
    if (result.error) {
      throw new Error(result.message);
    }
    
    return { message: result.message };
  },

  async resetPassword(data: ResetPasswordRequest): Promise<{ message: string }> {
    const response = await api.post('auth/reset-password', {
      json: data,
    });
    
    const result = response.body as { error: boolean; message: string; result?: { message: string } };
    
    if (result.error) {
      throw new Error(result.message);
    }
    
    return { message: result.message };
  },

  async getProviders(): Promise<{ providers: string[] }> {
    const response = await api.get('auth/providers');
    
    const result = response.body as { error: boolean; message: string; result?: { providers: string[] } };
    
    if (result.error) {
      throw new Error(result.message);
    }
    
    return result.result || { providers: [] };
  },

  // Protected routes (auth required)
  async logout(): Promise<{ message: string }> {
    console.log('Auth API: Attempting logout');
    
    const response = await api.post('auth/logout');
    
    console.log('Auth API: Logout response:', response.body);
    
    const result = response.body as { error: boolean; message: string; result?: { message: string } };
    
    if (result.error) {
      console.error('Auth API: Logout failed with error:', result.message);
      throw new Error(result.message);
    }
    
    console.log('Auth API: Logout successful');
    return { message: result.message };
  },

  async refreshToken(): Promise<RefreshTokenResponse> {
    console.log('Auth API: Attempting token refresh');
    
    const refreshToken = typeof window !== 'undefined' ? localStorage.getItem('refreshToken') : null;
    if (!refreshToken) {
      console.error('Auth API: No refresh token available');
      throw new Error('No refresh token available');
    }

    const response = await api.post('auth/refresh', {
      json: { refreshToken },
    });
    
    console.log('Auth API: Refresh token response:', response.body);
    
    const result = response.body as { error: boolean; message: string; result: RefreshTokenResponse };
    
    if (result.error) {
      console.error('Auth API: Token refresh failed with error:', result.message);
      throw new Error(result.message);
    }
    
    console.log('Auth API: Token refresh successful');
    return result.result;
  },

  async getMe(): Promise<LoginResponse> {
    console.log('Auth API: Attempting to get user profile');
    
    const response = await api.get('auth/me');
    
    console.log('Auth API: Get user profile response:', response.body);
    
    const result = response.body as {
      error: boolean;
      message: string;
      result: unknown;
    };
    
    if (result.error) {
      console.error('Auth API: Get user profile failed with error:', result.message);
      throw new Error(result.message || 'Failed to get user profile');
    }
    
    // Support both shapes:
    // 1) { user, company, tokens? }
    // 2) { id, email, name, role, companyId, company, accessToken?, refreshToken?, tokens? }
    const payload = result.result || {} as Record<string, unknown>;

    const user: LoginResponse['user'] = (payload as any).user
      ? (payload as any).user
      : {
          id: (payload as any).id,
          email: (payload as any).email,
          name: (payload as any).name,
          role: (payload as any).role,
          companyId: (payload as any).companyId,
          lastLoginAt: (payload as any).lastLoginAt ?? null,
        };

    const company: Company | undefined = (payload as any).company ?? undefined;

    const tokens = (payload as any).tokens ?? (
      (payload as any).accessToken && (payload as any).refreshToken
        ? { accessToken: (payload as any).accessToken, refreshToken: (payload as any).refreshToken }
        : { accessToken: '', refreshToken: '' }
    );
    
    console.log('Auth API: Get user profile successful');
    return { user, tokens, company };
  },

  async setup2FA(): Promise<{ qrCode: string; secret: string }> {
    const response = await api.post('auth/2fa/setup');
    
    const result = response.body as { error: boolean; message: string; result: { qrCode: string; secret: string } };
    
    if (result.error) {
      throw new Error(result.message);
    }
    
    return result.result;
  },

  async verify2FA(token: string): Promise<{ message: string }> {
    const response = await api.post('auth/2fa/verify', {
      json: { token },
    });
    
    const result = response.body as { error: boolean; message: string; result?: { message: string } };
    
    if (result.error) {
      throw new Error(result.message);
    }
    
    return { message: result.message };
  },

  async getCompanies(search?: string, limit: number = 10): Promise<CompaniesResponse> {
    console.log('Auth API: Getting companies list');
    
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    params.append('limit', limit.toString());
    
    const response = await api.get(`auth/companies?${params.toString()}`);
    
    console.log('Auth API: Get companies response:', response.body);
    
    const result = response.body as { error: boolean; message: string; result: CompaniesResponse };
    
    if (result.error) {
      console.error('Auth API: Get companies failed with error:', result.message);
      throw new Error(result.message);
    }
    
    console.log('Auth API: Get companies successful');
    return result.result;
  },
};
