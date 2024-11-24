import React, { useState } from "react";
import axios from "axios";

const PretragaPoNazivu = () => {
  const [naziv, setNaziv] = useState("");
  const [artikli, setArtikli] = useState([]);
  const [greska, setGreska] = useState("");

  const handleSearch = async () => {
    if (naziv.trim() === "") {
      setGreska("Molimo unesite dio naziva za pretrazivanje.");
      return;
    }

    try {
      setGreska("");
      const response = await axios.get("http://localhost:5000/api/artikli", {
        params: { naziv },
      });
      setArtikli(response.data[0]?.artikli || []);
    } catch (error) {
      console.error("Greska prilikom dohvacanja artikala: ", error);
    }
  };

  return (
    <div>
      <h1>Pretraživanje artikala</h1>
      <input
        type="text"
        placeholder="Unesite dio naziva"
        value={naziv}
        onChange={(e) => setNaziv(e.target.value)}
      />
      <button onClick={handleSearch}>Pretraži</button>
      {greska && <p>{greska}</p>}
      <ul>
        {artikli.map((artikl, index) => (
          <li key={index}>
            <strong>Id: </strong> {artikl.id || "N/A"}, <strong>Naziv: </strong>{" "}
            {artikl.naziv || "N/A"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PretragaPoNazivu;
