import "./App.css";
import SelectMenu from "./app/selec-menu/page";
import { Route, Routes } from "react-router-dom";
import StartGame from "./app/start-game/page";
import NewGame from "./app/selec-menu/new-game/page";
import World from "./app/world/page";

function App() {
  
  return (
    <div className="w-[750px] h-[490px] overflow">
      <Routes>
      <Route path="/" element={<StartGame />} />
      <Route path="/select-menu" element={<SelectMenu />} />
      <Route path="select-menu/new-game" element={<NewGame />} />
      <Route path="/world" element={<World />} />
    </Routes>
    </div>
  );
}

export default App;
