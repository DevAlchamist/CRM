// API Configuration
const getApiBaseUrl = () => {
  // In production, use the environment variable
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }
  
  // In development, use localhost
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:53321/api/';
  }
  
  // Fallback for production without env var
  console.warn('NEXT_PUBLIC_API_URL not set. Please configure your API URL in environment variables.');
  return '/api/'; // Assume API routes are in the same domain
};

const API_BASE_URL = getApiBaseUrl();

// Browser-compatible HTTP client with got-like API
class ApiClient {
  private baseUrl: string;
  private defaultHeaders: Record<string, string>;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    };
  }

  private async makeRequest(
    method: string,
    url: string,
    options: {
      json?: unknown;
      headers?: Record<string, string>;
      timeout?: number;
    } = {}
  ) {
    const { json, headers = {}, timeout = 10000 } = options;
    
    // Add auth token if available
    let token = null;
    try {
      token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
    } catch (error) {
      console.warn('Failed to access localStorage:', error);
    }
    
    // Prepare authorization headers
    const authHeaders: Record<string, string> = {};
    if (token) {
      authHeaders['Authorization'] = `Bearer ${token}`;
    }
    
    // Add cookies for server-side requests
    const cookieHeaders: Record<string, string> = {};
    if (typeof window !== 'undefined') {
      // Include cookies in requests for same-origin requests
      cookieHeaders['credentials'] = 'include';
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const requestUrl = `${this.baseUrl}${url}`;
      const requestBody = json ? JSON.stringify(json) : undefined;
      
      console.log('Making API request:', {
        url: requestUrl,
        method,
        headers: {
          ...this.defaultHeaders,
          ...authHeaders,
          ...headers,
        },
        body: requestBody,
      });

      const response = await fetch(requestUrl, {
        method,
        headers: {
          ...this.defaultHeaders,
          ...authHeaders,
          ...headers,
        },
        body: requestBody,
        signal: controller.signal,
        credentials: 'include', // Include cookies for authentication
      });

      clearTimeout(timeoutId);

      // Handle token refresh if needed
      if (response.status === 401) {
        console.log('API: Received 401 Unauthorized, attempting token refresh');
        
        try {
          const refreshToken = typeof window !== 'undefined' ? localStorage.getItem('refreshToken') : null;
          if (refreshToken) {
            console.log('API: Dispatching token-expired event for automatic refresh');
            window.dispatchEvent(new CustomEvent('token-expired'));
            
            // Try to refresh the token automatically
            try {
              const { authApi } = await import('./auth-api');
              const refreshResponse = await authApi.refreshToken();
              
              // Update localStorage with new tokens
              if (typeof window !== 'undefined') {
                localStorage.setItem('accessToken', refreshResponse.accessToken);
                localStorage.setItem('refreshToken', refreshResponse.refreshToken);
              }
              
              console.log('API: Token refreshed successfully, retrying original request');
              
              // Retry the original request with new token
              const newToken = refreshResponse.accessToken;
              const retryResponse = await fetch(requestUrl, {
                method,
                headers: {
                  ...this.defaultHeaders,
                  'Authorization': `Bearer ${newToken}`,
                  ...headers,
                },
                body: requestBody,
                signal: controller.signal,
                credentials: 'include',
              });
              
              if (retryResponse.ok) {
                const retryData = await retryResponse.json();
                console.log('API: Retry request successful:', retryData);
                return {
                  body: retryData,
                  statusCode: retryResponse.status,
                };
              }
            } catch (refreshError) {
              console.error('API: Token refresh failed:', refreshError);
            }
          }
        } catch (error) {
          console.warn('Failed to access localStorage for refresh token:', error);
        }
      }

      if (!response.ok) {
        const errorText = await response.text();
        let errorData;
        try {
          errorData = JSON.parse(errorText);
        } catch {
          errorData = { message: errorText };
        }
        
        const error = new Error(errorData.message || `HTTP ${response.status}`) as Error & { 
          response: { status: number; body: unknown }; 
          statusCode: number;
          isTimeout?: boolean;
        };
        error.response = {
          status: response.status,
          body: errorData,
        };
        error.statusCode = response.status;
        throw error;
      }

      const data = await response.json();
      console.log('API response:', {
        status: response.status,
        data,
      });
      return {
        body: data,
        statusCode: response.status,
      };
    } catch (error) {
      clearTimeout(timeoutId);
      
      // Handle timeout and network errors
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          const timeoutError = new Error('Request timeout. Please try again.') as Error & { 
            isTimeout: boolean; 
            statusCode: number;
            response: { status: number; body: unknown };
          };
          timeoutError.isTimeout = true;
          timeoutError.statusCode = 408;
          timeoutError.response = {
            status: 408,
            body: { message: 'Request timeout' },
          };
          throw timeoutError;
        }
        
        // Network error (server down, no internet, or CORS issues)
        if (error.message.includes('fetch') || error.message.includes('network') || error.message.includes('Failed to fetch')) {
          const isProduction = process.env.NODE_ENV === 'production';
          const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'localhost:53321';
          
          let errorMessage = 'Unable to reach server. ';
          if (isProduction) {
            errorMessage += `API URL: ${apiUrl}. Please check if the API server is running and accessible.`;
          } else {
            errorMessage += 'Check your internet connection or try again.';
          }
          
          const networkError = new Error(errorMessage) as Error & { 
            isNetworkError: boolean; 
            statusCode: number;
            response: { status: number; body: unknown };
          };
          (networkError as typeof networkError & { isNetworkError: boolean }).isNetworkError = true;
          networkError.statusCode = 0;
          networkError.response = {
            status: 0,
            body: { message: 'Network error', apiUrl },
          };
          throw networkError;
        }
      }
      
      throw error;
    }
  }

  async get(url: string, options?: { json?: unknown; headers?: Record<string, string>; timeout?: number }) {
    return this.makeRequest('GET', url, options);
  }

  async post(url: string, options?: { json?: unknown; headers?: Record<string, string>; timeout?: number }) {
    return this.makeRequest('POST', url, options);
  }

  async put(url: string, options?: { json?: unknown; headers?: Record<string, string>; timeout?: number }) {
    return this.makeRequest('PUT', url, options);
  }

  async patch(url: string, options?: { json?: unknown; headers?: Record<string, string>; timeout?: number }) {
    return this.makeRequest('PATCH', url, options);
  }

  async delete(url: string, options?: { json?: unknown; headers?: Record<string, string>; timeout?: number }) {
    return this.makeRequest('DELETE', url, options);
  }
}

// Create API client instance
const api = new ApiClient(API_BASE_URL);

export default api;
