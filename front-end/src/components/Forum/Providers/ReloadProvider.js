import React, { useContext, createContext, useState } from "react";

export const ReloadContext = createContext();

export function useReload() {
  return useContext(ReloadContext);
}

export function ReloadProvider({ children }) {
  const [isReload, setIsReload] = useState(false);

  console.log(isReload);

  return (
    <ReloadContext.Provider value={{ isReload, setIsReload }}>
      {children}
    </ReloadContext.Provider>
  );
}
