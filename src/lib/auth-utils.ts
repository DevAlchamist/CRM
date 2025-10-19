/**
 * Auth utility functions for token management
 */

/**
 * Check if tokens exist in localStorage
 */
export function hasStoredTokens(): boolean {
  if (typeof window === 'undefined') return false;
  
  try {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    return !!(accessToken || refreshToken);
  } catch {
    return false;
  }
}

/**
 * Clear all auth tokens from storage
 */
export function clearStoredTokens(): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    console.log('Auth tokens cleared from storage');
  } catch (error) {
    console.warn('Failed to clear tokens from storage:', error);
  }
}

/**
 * Validate if a token looks valid (basic format check)
 * This doesn't verify the signature, just checks if it's a JWT
 */
export function isValidTokenFormat(token: string): boolean {
  if (!token || typeof token !== 'string') return false;
  
  // JWT tokens have 3 parts separated by dots
  const parts = token.split('.');
  if (parts.length !== 3) return false;
  
  try {
    // Try to decode the payload (middle part)
    const payload = JSON.parse(atob(parts[1]));
    
    // Check if token has an expiration
    if (payload.exp) {
      const expirationTime = payload.exp * 1000; // Convert to milliseconds
      const now = Date.now();
      
      // Token is expired
      if (now >= expirationTime) {
        return false;
      }
    }
    
    return true;
  } catch {
    return false;
  }
}

/**
 * Clean up invalid or expired tokens silently
 * Useful to run on app initialization
 */
export function cleanupInvalidTokens(): void {
  if (typeof window === 'undefined') return;
  
  try {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    
    let shouldClear = false;
    
    // Check access token
    if (accessToken && !isValidTokenFormat(accessToken)) {
      console.log('Auth: Access token is invalid or expired, will clean up');
      shouldClear = true;
    }
    
    // Check refresh token
    if (refreshToken && !isValidTokenFormat(refreshToken)) {
      console.log('Auth: Refresh token is invalid or expired, will clean up');
      shouldClear = true;
    }
    
    if (shouldClear) {
      clearStoredTokens();
    }
  } catch (error) {
    console.warn('Failed to cleanup invalid tokens:', error);
  }
}






