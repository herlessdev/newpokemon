import { useState } from "react";
import "./App.css";
import IntroVideo from "./app/intro-video/page";
import Step1 from "./app/selec-menu/new-game/step-1";
import SelectMenu from "./app/selec-menu/page";
import { Route, Routes } from "react-router-dom";
import StartGame from "./app/start-game/page";
import NewGame from "./app/selec-menu/new-game/page";

function App() {
  const [startGame, setStartGame] = useState(false);
  const handleStartGame = () => {
    setStartGame(true);
  };
  return (
    <div className="w-[750px] h-[500px]">
      <Routes>
      <Route path="/" element={<StartGame />} />
      <Route path="/select-menu" element={<SelectMenu />} />
      <Route path="select-menu/new-game" element={<NewGame />} />
    </Routes>
    </div>
  );
}

export default App;
