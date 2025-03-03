import { useEffect, useMemo, useState } from "react";
import SelectOption from "../../components/shared/select-option";
import { useNavigate } from "react-router-dom";

interface Props {
  userData: UserData;
  menuOnToggle: () => void;
}

const Menu = ({ userData, menuOnToggle }: Props) => {
  const navigate = useNavigate();
  const optionsMenu = useMemo(
    () => [
      {
        name: "POKéDEX",
        action: () => navigate("/pokedex"),
      },
      { name: "POKéMON", action: () => navigate("/team") },
      {
        name: "BAG",
        action: () => navigate("/bag", { state: { someProp: "world" } }),
      },
      {
        name: userData?.user?.name,
        action: () => navigate(`/profile/${userData?.user?.name}`),
      },
      { name: "SAVE", action: () => menuOnToggle() },
      { name: "OPTION", action: () => navigate("/options") },
      { name: "EXIT", action: () => menuOnToggle() },
    ],
    [navigate, menuOnToggle, userData]
  );
  const [indexOptionMenu, setIndexOptionMenu] = useState<number>(0);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      switch (event.key) {
        case "x":
          optionsMenu[indexOptionMenu]?.action();
          break;
        case "Enter":
          menuOnToggle();
          break;
        default:
          return;
      }
    };
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [indexOptionMenu, menuOnToggle, navigate, optionsMenu]);

  return (
    <SelectOption
      className="absolute right-2 top-2 z-[9999]"
      classNameOptions="gap-3 py-10"
      options={optionsMenu?.map((optMenu) => optMenu?.name)}
      selectOpt={indexOptionMenu}
      setSelectOpt={setIndexOptionMenu}
    />
  );
};

export default Menu;
