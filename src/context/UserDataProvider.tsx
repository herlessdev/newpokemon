import React, { createContext, useState, ReactNode } from "react";
import mockPartida from "../mock/user";

const mockToogle = true;
export const UserDataContext = createContext<any>([]);

export const UserDataProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [userData, setUserData] = useState(mockToogle ? mockPartida : []);
  return (
    <UserDataContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserDataContext.Provider>
  );
};
