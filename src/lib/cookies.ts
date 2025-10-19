// Cookie utilities for authentication

export const setCookie = (name: string, value: string, days: number = 7) => {
  if (typeof window === 'undefined') return;
  
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;secure;samesite=strict`;
};

export const getCookie = (name: string): string | null => {
  if (typeof window === 'undefined') return null;
  
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  
  if (parts.length === 2) {
    return parts.pop()?.split(';').shift() || null;
  }
  
  return null;
};

export const deleteCookie = (name: string) => {
  if (typeof window === 'undefined') return;
  
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
};

export const setAuthCookies = (accessToken: string, refreshToken: string) => {
  setCookie('accessToken', accessToken, 1); // 1 day
  setCookie('refreshToken', refreshToken, 7); // 7 days
};

export const clearAuthCookies = () => {
  deleteCookie('accessToken');
  deleteCookie('refreshToken');
};

export const getAuthCookies = () => {
  return {
    accessToken: getCookie('accessToken'),
    refreshToken: getCookie('refreshToken'),
  };
};
