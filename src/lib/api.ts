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

// Document Assignment API
import type { DocumentAssignment, DocumentAssignmentStats, AssignmentInput, DocumentActivity, DocumentActivityStats } from '@/types';

// Document API
export const documentApi = {
  // Upload document
  async upload(formData: FormData) {
    // Get auth token
    let token = null;
    try {
      token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
    } catch (error) {
      console.warn('Failed to access localStorage:', error);
    }

    const headers: Record<string, string> = {};
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    // Don't set Content-Type - let browser set it with boundary for multipart/form-data

    const requestUrl = `${API_BASE_URL}documents`;
    const response = await fetch(requestUrl, {
      method: 'POST',
      headers: headers,
      body: formData,
      credentials: 'include',
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorData;
      try {
        errorData = JSON.parse(errorText);
      } catch {
        errorData = { message: errorText };
      }
      throw new Error(errorData.message || `HTTP ${response.status}`);
    }

    const data = await response.json();
    return {
      body: data,
      statusCode: response.status,
    } as {
      body: {
        success?: boolean;
        error?: boolean;
        message: string;
        data?: {
          id: string;
          name: string;
          mimeType: string;
          size: number;
          url: string;
          createdAt: Date;
        };
        result?: {
          id: string;
          name: string;
          mimeType: string;
          size: number;
          url: string;
          externalUrl: string;
          createdAt: Date;
        };
      };
      statusCode: number;
    };
  },

  // Get documents
  async getAll(params?: { folder?: string; search?: string }) {
    const queryParams = new URLSearchParams();
    if (params?.folder) queryParams.append('folder', params.folder);
    if (params?.search) queryParams.append('search', params.search);
    
    const url = `documents${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    const response = await api.get(url);
    return response.body as {
      error: boolean;
      message: string;
      result: {
        data: Array<{
          id: string;
          name: string;
          mimeType: string;
          size: number;
          externalUrl: string;
          url?: string;
          folder?: string;
          tags?: string[];
          isStarred?: boolean;
          description?: string;
          createdAt: string;
          uploader: {
            id: string;
            name: string;
            email: string;
            avatar?: string;
          };
        }>;
        pagination: {
          page: number;
          limit: number;
          total: number;
          pages: number;
        };
      };
    };
  },

  // Delete document
  async delete(documentId: string) {
    const response = await api.delete(`documents/${documentId}`);
    return response.body as {
      success: boolean;
      message: string;
    };
  },

  // Update document
  async update(documentId: string, data: {
    name?: string;
    folder?: string;
    tags?: string[];
    description?: string;
    isStarred?: boolean;
  }) {
    const response = await api.patch(`documents/${documentId}`, {
      json: data
    });
    return response.body as {
      success: boolean;
      message: string;
      data: object;
    };
  },

  // Download document
  async getDownloadUrl(documentId: string) {
    const response = await api.get(`documents/${documentId}/download`);
    return response.body as {
      success: boolean;
      data: {
        downloadUrl: string;
        name: string;
        mimeType: string;
      };
    };
  }
};

export const documentAssignmentApi = {
  // Assign users to document (single or multiple)
  async assignUsers(documentId: string, assignments: AssignmentInput[]) {
    const response = await api.post(`documents/${documentId}/assign`, {
      json: { assignments }
    });
    return response.body as {
      success: boolean;
      message: string;
      data: DocumentAssignment[];
    };
  },

  // Remove user assignment
  async removeAssignment(documentId: string, userId: string) {
    const response = await api.delete(`documents/${documentId}/assign/${userId}`);
    return response.body as {
      success: boolean;
      message: string;
      data: DocumentAssignment;
    };
  },

  // Update user access type
  async updateAccessType(documentId: string, userId: string, accessType: 'READ_ONLY' | 'EDIT') {
    const response = await api.patch(`documents/${documentId}/assign/${userId}`, {
      json: { accessType }
    });
    return response.body as {
      success: boolean;
      message: string;
    };
  },

  // Get document assignments
  async getAssignments(documentId: string, includeInactive: boolean = false) {
    const url = `documents/${documentId}/assignments${includeInactive ? '?includeInactive=true' : ''}`;
    const response = await api.get(url);
    return response.body as {
      success: boolean;
      data: DocumentAssignment[];
    };
  },

  // Get assignment statistics
  async getStats(documentId: string) {
    const response = await api.get(`documents/${documentId}/assignments/stats`);
    return response.body as {
      success: boolean;
      data: DocumentAssignmentStats;
    };
  },

  // Get my assigned documents
  async getMyAssignedDocuments(includeInactive: boolean = false) {
    const url = `documents/my-assigned/list${includeInactive ? '?includeInactive=true' : ''}`;
    const response = await api.get(url);
    return response.body as {
      success: boolean;
      data: Array<{
        id: string;
        name: string;
        mimeType: string;
        size: number;
        createdAt: Date;
        assignment: {
          id: string;
          accessType: 'READ_ONLY' | 'EDIT';
          assignedAt: Date;
          assignedBy: {
            id: string;
            name: string;
            email: string;
          };
          isActive: boolean;
        };
      }>;
    };
  }
};

// Document Activity API
export const documentActivityApi = {
  // Get recent document activity
  async getRecent(limit: number = 20) {
    const response = await api.get(`documents/activity/recent?limit=${limit}`);
    return response.body as {
      success: boolean;
      data: DocumentActivity[];
    };
  },

  // Get activity for a specific document
  async getDocumentActivity(documentId: string, limit: number = 50) {
    const response = await api.get(`documents/activity/${documentId}?limit=${limit}`);
    return response.body as {
      success: boolean;
      data: DocumentActivity[];
    };
  },

  // Get current user's document activity
  async getMyActivity(limit: number = 50) {
    const response = await api.get(`documents/activity/my?limit=${limit}`);
    return response.body as {
      success: boolean;
      data: DocumentActivity[];
    };
  },

  // Get activity statistics
  async getStats(startDate?: string, endDate?: string) {
    const params = new URLSearchParams();
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);
    
    const url = `documents/activity/stats${params.toString() ? `?${params.toString()}` : ''}`;
    const response = await api.get(url);
    return response.body as {
      success: boolean;
      data: DocumentActivityStats;
    };
  },

  // Track document view
  async trackView(documentId: string) {
    const response = await api.post(`documents/activity/${documentId}/view`);
    return response.body as {
      success: boolean;
      message: string;
    };
  },

  // Track document download
  async trackDownload(documentId: string) {
    const response = await api.post(`documents/activity/${documentId}/download`);
    return response.body as {
      success: boolean;
      message: string;
    };
  }
};