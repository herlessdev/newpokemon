import React, { createContext, ReactNode } from "react";

export type BagDataContextType = object;

export const BagDataContext = createContext<BagDataContextType | undefined>(
  undefined
);

export const BagDataProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  return (
    <BagDataContext.Provider value={{}}>{children}</BagDataContext.Provider>
  );
};
