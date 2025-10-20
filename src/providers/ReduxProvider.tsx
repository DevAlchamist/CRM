'use client';

import React, { useMemo, useEffect } from 'react';
import { Provider } from 'react-redux';
import { makeStore } from '@/store';
import { useDispatch } from 'react-redux';
import { initializeAuth } from '@/store/slices/authSlice';

interface ReduxProviderProps {
  children: React.ReactNode;
}

function AuthInitializer({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();

  useEffect(() => {
    // Only initialize auth on client side
    if (typeof window !== 'undefined') {
      console.log('ReduxProvider: Initializing auth state');
      dispatch(initializeAuth());
    }
  }, [dispatch]);

  return <>{children}</>;
}

export function ReduxProvider({ children }: ReduxProviderProps) {
  const store = useMemo(() => makeStore(), []);
  
  return (
    <Provider store={store}>
      <AuthInitializer>
        {children}
      </AuthInitializer>
    </Provider>
  );
}
