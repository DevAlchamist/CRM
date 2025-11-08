// Utility functions for managing mock data mode

export const enableMockMode = () => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('useMockData', 'true');
    console.log('Mock data mode enabled. Refresh the page to apply changes.');
  }
};

export const disableMockMode = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('useMockData');
    console.log('Mock data mode disabled. Refresh the page to apply changes.');
  }
};

export const isMockModeEnabled = (): boolean => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('useMockData') === 'true';
  }
  return false;
};

// Add to window for easy access in browser console
declare global {
  interface Window {
    mockUtils?: {
      enable: () => void;
      disable: () => void;
      isEnabled: () => boolean;
    };
  }
}

if (typeof window !== 'undefined') {
  window.mockUtils = {
    enable: enableMockMode,
    disable: disableMockMode,
    isEnabled: isMockModeEnabled,
  };
}
