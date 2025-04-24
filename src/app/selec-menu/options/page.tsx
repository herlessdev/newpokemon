import { useNavigate } from "react-router-dom";
import useArrowNavigation from "../../../hooks/useArrowNavigation ";
import cx from "../../../lib/cx";
import SelectOpt from "./select-opt";
import { useContext } from "react";
import { UserDataContext } from "../../../context/UserDataProvider";
import { controls } from "../../../data/controllers";

const options = [
  {
    principal: "TEXT SPEED",
    list_opt: ["SLOW", "MID", "FAST"],
  },
  {
    principal: "BATTLE SCENE",
    list_opt: ["ON", "OFF"],
  },
  {
    principal: "BATTLE STYLE",
    list_opt: ["SHIFT", "SET"],
  },
  {
    principal: "SOUND",
    list_opt: ["MONO", "ESTEREO"],
  },
  {
    principal: "BUTTON MODE",
    list_opt: ["NORMAL", "LR", "L=A"],
  },
  {
    principal: "FRAME",
    list_opt: ["TYPE1"],
  },
  {
    principal: "CANCEL",
  },
];

const Options = () => {
  const navigate = useNavigate();
  const { userData } = useContext(UserDataContext);
  const { selectOpt } = useArrowNavigation(
    options.length,
    0,
    "vertical",
    true,
    [
      {
        key: controls?.retroceder,
        optionIndex: options.length - 1, // Índice de la primera opción
        callback: () => {
          if (userData.length === 0) {
            navigate("/select-menu");
          } else {
            navigate("/world");
          }
        },
      },
      // Puedes agregar más configuraciones de teclas aquí
    ]
  );

  return (
    <div
      style={{ scrollbarWidth: "none" }}
      className="flex flex-col gap-4 px-8 py-2 bg-[#8c92ff] w-full h-full overflow-hidden relative text-[#ffb652]"
    >
      <div className={cx("border-options-1")}>
        <div className="pl-8 pr-14 py-3 rounded-[5px] bg-[white]">OPTION</div>
      </div>
      <div className={cx("border-options-1", "h-full")}>
        <div className="rounded-[5px] bg-[#c6c7c6] p-1 flex flex-col h-full justify-between">
          {options &&
            options.map((opt, i) => {
              return (
                <div
                  key={i}
                  className={cx(
                    "flex justify-between px-8 py-1",
                    selectOpt === i
                      ? "bg-[white]"
                      : "bg-[#c6c7c6] text-[#c68e42]"
                  )}
                >
                  <div>{opt.principal}</div>
                  <div className="flex items-center justify-between w-1/2 text-[red]">
                    {opt.list_opt && (
                      <SelectOpt
                        optsLength={opt.list_opt.length}
                        options={opt.list_opt}
                        isActive={selectOpt === i}
                      />
                    )}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Options;
