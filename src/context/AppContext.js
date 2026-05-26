
import React, { createContext, useState } from 'react';

export const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [currentMember, setCurrentMember] = useState(null);
  return (
    <AppContext.Provider value={{ currentMember, setCurrentMember }}>
      {children}
    </AppContext.Provider>
  );
}
