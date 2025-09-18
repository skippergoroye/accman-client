"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";



const RefetchContext = createContext(undefined);

export const RefetchProvider = ({ children }) => {
  const [refetchFlag, setRefetchFlag] = useState(false);

  const triggerRefetch = () => setRefetchFlag(true);
  const clearRefetch = () => setRefetchFlag(false);

  return (
    <RefetchContext.Provider value={{ refetchFlag, triggerRefetch, clearRefetch }}>
      {children}
    </RefetchContext.Provider>
  );
};


export const useRefetch = () => {
  const context = useContext(RefetchContext);
  if (!context) {
    throw new Error("useRefetch must be used within a RefetchProvider");
  }
  return context;
};
