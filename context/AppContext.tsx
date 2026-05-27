'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AppContextType {
  activePostId: string | null;
  setActivePostId: (id: string | null) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isScrolled: boolean;
  setIsScrolled: (scrolled: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [activePostId, setActivePostId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  return (
    <AppContext.Provider value={{ 
      activePostId, 
      setActivePostId, 
      searchQuery, 
      setSearchQuery,
      isScrolled,
      setIsScrolled
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
