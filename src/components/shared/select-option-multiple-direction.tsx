import { Dispatch, SetStateAction, useEffect } from "react";
import cx from "../../lib/cx";
interface Props {
  options: string[][];
  className?: string;
  classNameOptions?: string;
  selectOpt: { row: number; column: number };
  setSelectOpt: Dispatch<SetStateAction<{ row: number; column: number }>>;
}

const SelectOptionMultipleDirection = ({
  options,
  selectOpt,
  setSelectOpt,
  className,
  classNameOptions,
}: Props) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const { row, column } = selectOpt;
      if (event.key === "ArrowUp" && row > 0) {
        setSelectOpt({ row: row - 1, column });
      } else if (event.key === "ArrowDown" && row < options.length - 1) {
        setSelectOpt({ row: row + 1, column });
      } else if (event.key === "ArrowLeft" && column > 0) {
        setSelectOpt({ row, column: column - 1 });
      } else if (
        event.key === "ArrowRight" &&
        column < options[row].length - 1
      ) {
        setSelectOpt({ row, column: column + 1 });
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [options, selectOpt, setSelectOpt]);
  return (
    <div
      className={cx(
        "bg-[#736984] p-2 text-3xl font-[400] font-nova rounded-[8px] border-[#293031] border-4",
        className
      )}
    >
      <div
        className={cx(
          "pl-8 pr-14 py-3 rounded-[5px] bg-[white] flex flex-col",
          classNameOptions
        )}
      >
        {options.map((file, i) => (
          <div className="flex flex-row justify-between" key={i}>
            {file.map((opt, j) => (
              <div key={j} className="relative uppercase">
                {opt}
                {i === selectOpt.row && j === selectOpt.column && (
                  <img
                    src="/newpokemon/icons/arrow-right.svg"
                    className="absolute right-[100%] top-1/2 translate-y-[-50%] w-[25px]"
                  />
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectOptionMultipleDirection;
