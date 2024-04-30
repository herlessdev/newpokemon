import { useEffect, useRef, useState } from "react";
import cx from "../../lib/cx";
import { useNavigate } from "react-router-dom";

const SelectMenu = () => {
  const [selectOpt, setSelectOpt] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const optionsMenu = ["NEW GAME", "OPTIONS"] ;
  const navigate = useNavigate();

  const ChooseOpt = (index: number) => {
    setSelectOpt(index);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowUp" && selectOpt > 0) {
        setSelectOpt((prevSelectOpt) => prevSelectOpt - 1);
      } else if (
        event.key === "ArrowDown" &&
        selectOpt < optionsMenu.length - 1
      ) {
        setSelectOpt((prevSelectOpt) => prevSelectOpt + 1);
      } else if (event.key === "a") {
        if(optionsMenu[selectOpt] === 'NEW GAME') {
          navigate('/select-menu/new-game')
        }
      }
    };
    const container = containerRef.current;

    const lineHeight = 40;
    if (container) {
      container.scrollTop = lineHeight * selectOpt;
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectOpt]);

  return (
    <div
      style={{ scrollbarWidth: "none" }}
      className="flex flex-col px-8 py-2 bg-[#8c92ff] gap-2 w-full h-full overflow-y-[auto]"
    >
      {optionsMenu.map((optMenu, i) => (
        <div
          key={i}
          className={cx(
            "bg-[#736984] cursor-pointer p-2 text-3xl font-[400] font-nova rounded-[8px] border-[#293031] border-4",
            selectOpt === i
              ? null
              : "relative before:absolute before:content-[''] before:bg-[#00000050] before:top-0 before:left-0 before:w-full before:h-full before:z-[999]"
          )}
        >
          <div
            ref={containerRef}
            className="px-2 py-3 rounded-[5px] bg-[white]"
          >
            {optMenu}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SelectMenu;
