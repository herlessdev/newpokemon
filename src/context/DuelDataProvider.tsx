import React, { createContext, useState, ReactNode } from "react";
import useRandomNumber from "../hooks/useRandomNumber";

type DuelDataContextType = {
  randomNumber: number | null;
  generateRandomNumber: () => void;
  sequence: string;
  setSequence: (sequence: string) => void;
};

export const DuelDataContext = createContext<DuelDataContextType | undefined>(
  undefined
);

export const DuelDataProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { randomNumber, generateRandomNumber } = useRandomNumber();
  const [sequence, setSequence] = useState<string>("inicio");
  console.log(sequence)
  return (
    <DuelDataContext.Provider value={{ randomNumber, generateRandomNumber, sequence, setSequence }}>
      {children}
    </DuelDataContext.Provider>
  );
};
