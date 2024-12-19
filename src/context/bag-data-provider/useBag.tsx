import { useContext } from "react";
import { BagDataContext, BagDataContextType } from "./BagDataProvider";

export const useBagData = (): BagDataContextType => {
  const context = useContext(BagDataContext);
  if (!context) {
    throw new Error("useBagData debe usarse dentro de un BagDataProvider");
  }
  return context;
};
