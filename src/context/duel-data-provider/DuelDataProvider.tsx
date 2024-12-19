import React, { createContext, useState, ReactNode } from "react";
import useRandomNumber from "../../hooks/useRandomNumber";

export type DuelDataContextType = {
  randomNumber: number | null;
  generateRandomNumber: () => void;
  sequence: Sequence;
  setSequence: (sequence: Sequence) => void;
  usedItem: string | null;
  setUsedItem: (item: string | null) => void;
};

export const DuelDataContext = createContext<DuelDataContextType | undefined>(
  undefined
);

export const DuelDataProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { randomNumber, generateRandomNumber } = useRandomNumber();
  const [sequence, setSequence] = useState<Sequence>("inicio");
  const [usedItem, setUsedItem] = useState<string | null>(null);

  return (
    <DuelDataContext.Provider
      value={{
        randomNumber,
        generateRandomNumber,
        sequence,
        setSequence,
        usedItem,
        setUsedItem,
      }}
    >
      {children}
    </DuelDataContext.Provider>
  );
};
