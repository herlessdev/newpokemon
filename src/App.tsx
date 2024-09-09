import "./App.css";
import SelectMenu from "./app/selec-menu/page";
import { Route, Routes } from "react-router-dom";
import StartGame from "./app/start-game/page";
import NewGame from "./app/selec-menu/new-game/page";
import World from "./app/world/page";
import Duel from "./app/duel/page";
import {
  PokemonDataContext,
} from "./context/PokemonDataProvider";
import useRandomNumber from "./hooks/useRandomNumber";
import { useContext, useState } from "react";
import Options from "./app/selec-menu/options/page";
import map_1 from "./data/maps";

import { Pokemon } from "./data/types";
import { UserDataContext } from "./context/UserDataProvider";
import Team from "./app/team/page";

function App() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pokemonData = useContext<any>(PokemonDataContext);
  const { userData } = useContext(UserDataContext);
  const { randomNumber, generateRandomNumber } = useRandomNumber();
  const [personajeCoordenadas, setPersonajeCoordenadas] = useState({
    x: 0,
    y: 10,
  });
  const [myPokemonData] = useState({
    number: 25,
    level: 10,
  });
  const [myPokemon] = useState(
    new Pokemon(
      myPokemonData.number,
      myPokemonData.level,
      pokemonData[myPokemonData.number]?.stats?.[0].base_stat,
      1000
    )
  );
  console.log(myPokemon)
  const [mapa, setMapa] = useState(map_1);
  console.log(userData);
  return (
    <div className="w-[750px] h-[490px] overflow relative font-nova">
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
              randomNumber={randomNumber}
              generateRandomNumber={generateRandomNumber}
            />
          }
        />
        <Route path="/duel" element={<Duel randomNumber={randomNumber} />} />
        <Route path="/team" element={<Team />} />
      </Routes>
      <div id="portal" />
    </div>
  );
}

export default App;
