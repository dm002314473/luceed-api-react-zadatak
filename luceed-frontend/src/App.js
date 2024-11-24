import React from "react";
import PretragaPoNazivu from "./components/PretragaPoNazivu";
import ObracunPoVrstamaPlacanja from "./components/ObracunPoVrstamaPlacanja";
import ObracunPoArtiklima from "./components/ObracunPoArtiklima";

function App() {
  return (
    <div>
      <PretragaPoNazivu />
      <ObracunPoVrstamaPlacanja />
      <ObracunPoArtiklima />
    </div>
  );
}

export default App;
