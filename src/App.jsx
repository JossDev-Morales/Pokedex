import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomeProtected from "./components/HomeProtected";
import RouteProtected from "./components/RouteProtected";
import Home from "./pages/Home";
import Pokedex from "./pages/Pokedex";
import Pokemon from "./pages/Pokemon";

function App() {
  const nameTrainer = useSelector((state) => state.nameTrainer);
  useEffect(() => {
    localStorage.setItem("nameTrainer", nameTrainer);
  }, [nameTrainer]);

  return (
    <div className="App">
      <Routes>
        <Route element={<HomeProtected />}>
          <Route path="/" element={<Home />} />
        </Route>

        <Route element={<RouteProtected />}>
          <Route path="/pokedex" element={<Pokedex />} />
          <Route path="/pokedex/:id" element={<Pokemon />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
