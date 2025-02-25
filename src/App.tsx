import "./App.css";
import SelectMenu from "./app/selec-menu/page";
import { Route, Routes, useLocation } from "react-router-dom";
import StartGame from "./app/start-game/page";
import NewGame from "./app/selec-menu/new-game/page";
import World from "./app/world/page";
import Duel from "./app/duel/page";
import { useContext, useEffect, useState } from "react";
import Options from "./app/selec-menu/options/page";
import map_1 from "./data/maps";

import { UserDataContext } from "./context/UserDataProvider";
import Team from "./app/team/page";
import Bag from "./app/bag/page";
import Pokedex from "./app/pokedex/page";

function App() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { setUserData } = useContext(UserDataContext);
  const location = useLocation();
  const [personajeCoordenadas, setPersonajeCoordenadas] = useState({
    x: 0,
    y: 10,
  });
  const [mapa, setMapa] = useState(map_1);
console.log(isNaN(1.223))
  useEffect(() => {
    if (location.pathname === "/") {
      setUserData([]);
    }
  }, [location]);

  return (
    <div className="w-[750px] h-[490px] overflow relative font-nova select-none">
      <Routes>
        <Route path="/" element={<StartGame />} />
        <Route path="/select-menu" element={<SelectMenu />} />
        <Route path="/select-menu/new-game" element={<NewGame />} />
        <Route path="/options" element={<Options />} />
        <Route
          path="/world"
          element={
            <World
              mapa={mapa}
              setMapa={setMapa}
              personajeCoordenadas={personajeCoordenadas}
              setPersonajeCoordenadas={setPersonajeCoordenadas}
            />
          }
        />
        <Route path="/duel" element={<Duel />} />
        <Route path="/team" element={<Team />} />
        <Route path="/bag" element={<Bag />} />
        <Route path="/pokedex" element={<Pokedex />} />
      </Routes>
      <div id="portal" />
    </div>
  );
}

export default App;
