import React, { createContext, useState, ReactNode } from "react";
import useRandomNumber from "../hooks/useRandomNumber";

export type DuelDataContextType = {
  randomNumber: number | null;
  generateRandomNumber: () => void;
  sequence: Sequence;
  setSequence: (sequence: Sequence) => void;
};

export const DuelDataContext = createContext<DuelDataContextType | undefined>(
  undefined
);

export const DuelDataProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { randomNumber, generateRandomNumber } = useRandomNumber();
  const [sequence, setSequence] = useState<Sequence>("inicio");
  console.log(sequence)
  return (
    <DuelDataContext.Provider value={{ randomNumber, generateRandomNumber, sequence, setSequence }}>
      {children}
    </DuelDataContext.Provider>
  );
};
