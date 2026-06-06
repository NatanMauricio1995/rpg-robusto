'use client';

import React from 'react';
// import { AuthProvider } from '@/contexts/AuthContext'; // Placeholder para futura integração

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <>
      {/* 
          Exemplo de encadeamento:
          <AuthProvider>
            <ThemeProvider>
              {children}
            </ThemeProvider>
          </AuthProvider>
      */}
      {children}
    </>
  );
}
