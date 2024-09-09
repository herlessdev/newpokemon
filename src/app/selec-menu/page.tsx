import { useContext, useEffect, useState } from "react";
import cx from "../../lib/cx";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { cargarPartidaByID, cargarPartidas } from "../../services/get";
import { UserDataContext } from "../../context/UserDataProvider";

interface OptionMenuProps {
  ID?: number;
  PLAYER?: string;
  TIME?: string;
  BADGES?: number;
}

type MenuOption = (string | OptionMenuProps)[];

const SelectMenu = () => {
  const { setUserData } = useContext(UserDataContext);
  const [selectOpt, setSelectOpt] = useState<number>(0);
  const [optionsMenu, setOptionsMenu] = useState<MenuOption>([
    "NEW GAME",
    "OPTIONS",
  ]);
  const { isLoading, isError } = useQuery("partidas", cargarPartidas, {
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      const partidasObject = data.map((partida: string[]) => {
        return {
          ID: partida[0],
          PLAYER: partida[1],
          TIME: "0:00",
          BADGES: 0,
        };
      });
      setOptionsMenu((prevOptions) => [...partidasObject, ...prevOptions]);
    },
  });
  const navigate = useNavigate();
  /*const ChooseOpt = (index: number) => {
    setSelectOpt(index);
  };*/
  useEffect(() => {
    const handleKeyDown = async (event: KeyboardEvent) => {
      if (event.key === "ArrowUp" && selectOpt > 0) {
        setSelectOpt((prevSelectOpt) => prevSelectOpt - 1);
      } else if (
        event.key === "ArrowDown" &&
        selectOpt < optionsMenu.length - 1
      ) {
        setSelectOpt((prevSelectOpt) => prevSelectOpt + 1);
      } else if (event.key === "a") {
        if (optionsMenu[selectOpt] === "NEW GAME") {
          navigate("/select-menu/new-game");
        }

        if (
          optionsMenu[selectOpt] !== "NEW GAME" &&
          optionsMenu[selectOpt] !== "OPTIONS"
        ) {
          const user_id =
            typeof optionsMenu[selectOpt] === "object" &&
            optionsMenu[selectOpt] !== null
              ? optionsMenu[selectOpt].ID
              : undefined;
          const partida = await cargarPartidaByID(Number(user_id));
          setUserData(partida);
          navigate("/world");
        }
        if (optionsMenu[selectOpt] === "OPTIONS") {
          navigate("/options");
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate, optionsMenu, selectOpt]);

  return (
    <div
      style={{ scrollbarWidth: "none" }}
      className="flex flex-col px-8 py-2 bg-[#8c92ff] w-full h-full overflow-hidden relative"
    >
      <div
        className="flex flex-col gap-2 absolute w-full px-8 py-2 left-0 top-0"
        style={{
          transform: `translateY(-${Math.floor(selectOpt / 3) * 29.5}%)`,
          transition: "transform 0.3s ease-in-out",
        }}
      >
        {isLoading && (
          <div className="text-[white] px-6">Download Games...</div>
        )}
        {isError && (
          <div className="text-[red] px-6">
            An error occurred while loading data.
          </div>
        )}
        {optionsMenu.map((optMenu, i) => (
          <div
            key={i}
            className={cx(
              "bg-[#736984] cursor-pointer p-2 text-3xl font-[400] font-nova rounded-[8px] border-[#293031] border-4",
              selectOpt === i
                ? null
                : "relative before:absolute before:content-[''] before:bg-[#00000050] before:top-0 before:left-0 before:w-full before:h-full"
            )}
          >
            <div className="px-2 py-3 rounded-[5px] bg-[white]">
              {typeof optMenu === "string" ? (
                optMenu
              ) : (
                <div style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}>
                  <p>CONTINUE</p>
                  <div className="flex gap-6 text-[#2186ff]">
                    <div className="flex-[1] flex justify-between">
                      <p>PLAYER</p>
                      <p>{optMenu.PLAYER}</p>
                    </div>
                    <div className="flex-[1] flex flex-col justify-between">
                      <div className="flex justify-between w-full">
                        <p>TIME</p>
                        <p>{optMenu.TIME}</p>
                      </div>
                      <div className="flex justify-between w-full">
                        <p>BADGES</p>
                        <p>{optMenu.BADGES}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectMenu;
