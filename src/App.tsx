import { useState } from "react";
import Navbar from "./components/Navbar";
import TerminalMode from "./terminal/TerminalMode";
import BottomNavBar from "./components/BottomNavBar";
import CharacterArena from "./components/CharacterArena";

const App = () => {
  const [terminalMode, setTerminalMode] = useState(false);

  return (
    <div className="w-full max-h-fit overflow-hidden text-foreground relative">
      <Navbar terminalMode={terminalMode} setTerminalMode={setTerminalMode} />
      {!terminalMode ? <BottomNavBar /> : <TerminalMode />}
      {!terminalMode && <CharacterArena />}
    </div>
  );
};

export default App;
