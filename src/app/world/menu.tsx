import { useEffect, useMemo, useState } from "react";
import SelectOption from "../../components/shared/select-option";
import { useNavigate, useLocation } from "react-router-dom";
import { controls } from "../../data/controllers";

interface Props {
  userData: UserData;
  menuOnToggle: () => void;
}

const Menu = ({ userData, menuOnToggle }: Props) => {
  const navigate = useNavigate();
  const history = useLocation();

  const optionsMenu = useMemo(
    () => [
      {
        name: "POKéDEX",
        action: () => navigate("/pokedex"),
      },
      {
        name: "POKéMON",
        action: () =>
          navigate("/team", {
            state: { someProp: history?.pathname.slice(1) },
          }),
      },
      {
        name: "BAG",
        action: () =>
          navigate("/bag", { state: { someProp: history?.pathname.slice(1) } }),
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
        case controls?.interactuar:
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
