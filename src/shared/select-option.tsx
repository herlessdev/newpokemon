import { Dispatch, SetStateAction, useEffect } from "react";
import cx from "../lib/cx";

interface Props {
  options: string[];
  className?: string;
  selectOpt: number;
  setSelectOpt: Dispatch<SetStateAction<number>>;
}

const SelectOption = ({
  options,
  selectOpt,
  setSelectOpt,
  className,
}: Props) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowUp" && selectOpt > 0) {
        setSelectOpt((prevSelectOpt) => prevSelectOpt - 1);
      } else if (event.key === "ArrowDown" && selectOpt < options.length - 1) {
        setSelectOpt((prevSelectOpt) => prevSelectOpt + 1);
      } else if (event.key === "a") {
        if (options[selectOpt] === "NEW GAME") {
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectOpt]);

  return (
    <div
      className={cx(
        "bg-[#736984] p-2 text-3xl font-[400] font-nova rounded-[8px] border-[#293031] border-4",
        className
      )}
    >
      <div className="pl-8 pr-14 py-3 rounded-[5px] bg-[white]">
        {options.map((opt, i) => (
          <div key={i} className="relative">
            {opt}
            {selectOpt === i && (
              <img
                src="/public/icons/arrow-right.svg"
                className="absolute right-[100%] top-1/2 translate-y-[-50%] w-[25px]"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectOption;
