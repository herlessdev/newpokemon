import "./App.css";
import SelectMenu from "./app/selec-menu/page";
import { Route, Routes } from "react-router-dom";
import StartGame from "./app/start-game/page";
import NewGame from "./app/selec-menu/new-game/page";
import World from "./app/world/page";
import Duel from "./app/duel/page";
import { PokemonDataProvider } from "./app/context/PokemonDataProvider";
import useRandomNumber from "./hooks/useRandomNumber";
import { useState } from "react";
import crearSeed from "./data/data";

function App() {
  const { randomNumber, generateRandomNumber } = useRandomNumber();
  const [personajeCoordenadas, setPersonajeCoordenadas] = useState({
    x: 0,
    y: 10,
  });
  const [mapa, setMapa] = useState(crearSeed());


  return (
    <PokemonDataProvider>
      <div className="w-[750px] h-[490px] overflow">
        <Routes>
          <Route path="/" element={<StartGame />} />
          <Route path="/select-menu" element={<SelectMenu />} />
          <Route path="select-menu/new-game" element={<NewGame />} />
          <Route
            path="/world"
            element={<World mapa={mapa} setMapa={setMapa} personajeCoordenadas={personajeCoordenadas} setPersonajeCoordenadas={setPersonajeCoordenadas} randomNumber={randomNumber} generateRandomNumber={generateRandomNumber} />}
          />
          <Route path="/duel" element={<Duel randomNumber={randomNumber} />} />
        </Routes>
      </div>
    </PokemonDataProvider>
  );
}

export default App;
