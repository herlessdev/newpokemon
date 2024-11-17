import { useContext } from "react";
import {
  DuelDataContext,
  DuelDataContextType,
} from "../context/DuelDataProvider";

export const useDuelData = (): DuelDataContextType => {
  const context = useContext(DuelDataContext);
  if (!context) {
    throw new Error("useDuelData debe usarse dentro de un DuelDataProvider");
  }
  return context;
};
