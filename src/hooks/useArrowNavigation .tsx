import { useEffect, useCallback, useState } from "react";

type SpecialKeyAction = {
  key: string;
  optionIndex: number;
  callback: () => void;
};

const useArrowNavigation = (
  optionsLength: number,
  initialIndex = 0,
  direction = "vertical",
  isActive = true,
  specialKeyActions: SpecialKeyAction[] = []
) => {
  const [selectOpt, setSelectOpt] = useState(initialIndex);

  const handleKeyDown = useCallback(
    (event: { key: string }) => {
      if (!isActive) return;

      if (direction === "vertical") {
        if (event.key === "ArrowUp" && selectOpt > 0) {
          setSelectOpt((prevSelectOpt) => prevSelectOpt - 1);
        } else if (event.key === "ArrowDown" && selectOpt < optionsLength - 1) {
          setSelectOpt((prevSelectOpt) => prevSelectOpt + 1);
        }
      } else if (direction === "horizontal") {
        if (event.key === "ArrowLeft" && selectOpt > 0) {
          setSelectOpt((prevSelectOpt) => prevSelectOpt - 1);
        } else if (
          event.key === "ArrowRight" &&
          selectOpt < optionsLength - 1
        ) {
          setSelectOpt((prevSelectOpt) => prevSelectOpt + 1);
        }
      }
      specialKeyActions.forEach((action) => {
        if (event.key === action.key && selectOpt === action.optionIndex) {
          action.callback();
        }
      });
    },
    [selectOpt, optionsLength, direction, isActive, specialKeyActions]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return { selectOpt, setSelectOpt };
};

export default useArrowNavigation;
