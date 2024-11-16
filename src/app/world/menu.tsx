import { useEffect, useState } from "react";
import SelectOption from "../../components/shared/select-option";
import { useNavigate } from "react-router-dom";

const Menu = ({ userData, menuOnToggle }) => {
  const navigate = useNavigate();

  const optionsMenu = [
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
      name: userData?.user?.[1],
      action: () => navigate(`/profile/${userData?.user?.[1]}`),
    },
    { name: "SAVE", action: () => menuOnToggle() }, // función que maneje la lógica de guardado
    { name: "OPTION", action: () => navigate("/options") }, // función que maneje las opciones
    { name: "EXIT", action: () => menuOnToggle() },
  ];
  const [indexOptionMenu, setIndexOptionMenu] = useState<number>(0);

  useEffect(() => {
    const handleKeyPress = (event) => {
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
  }, [indexOptionMenu, menuOnToggle, navigate]);

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
