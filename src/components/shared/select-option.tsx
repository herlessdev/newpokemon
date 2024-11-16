import { Dispatch, SetStateAction, useEffect } from "react";
import cx from "../../lib/cx";
interface Props {
  options: string[];
  className?: string;
  classNameOptions?: string;
  selectOpt: number;
  setSelectOpt: Dispatch<SetStateAction<number>>;
  active?: boolean
}

const SelectOption = ({
  options,
  selectOpt,
  setSelectOpt,
  className,
  classNameOptions,
  active = true
}: Props) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if(!active) return
      if (event.key === "ArrowUp" && selectOpt > 0) {
        setSelectOpt((prevSelectOpt) => prevSelectOpt - 1);
      } else if (event.key === "ArrowDown" && selectOpt < options.length - 1) {
        setSelectOpt((prevSelectOpt) => prevSelectOpt + 1);
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
        {options?.map((opt, i) => (
          <div key={i} className="relative">
            {opt}
            {selectOpt === i && (
              <img
                src="/newpokemon/icons/arrow-right.svg"
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
