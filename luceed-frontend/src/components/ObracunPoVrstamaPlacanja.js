import React, { useState } from "react";
import axios from "axios";

const ObracunPoVrstamaPlacanja = () => {
  const [pjUid, setPjUid] = useState("");
  const [odDatuma, setOdDatuma] = useState("");
  const [doDatuma, setDoDatuma] = useState("");
  const [placanja, setPlacanja] = useState([]);
  const [greska, setGreska] = useState("");

  const handleSearch = async () => {
    if (!pjUid || !odDatuma || !doDatuma) {
      setGreska("Molimo unesite sve podatke.");
      return;
    }

    try {
      setGreska("");
      const response = await axios.get(
        "http://localhost:5000/api/obracun/placanja",
        {
          params: {
            pjUid,
            odDatuma,
            doDatuma,
          },
        }
      );

      setPlacanja(response.data.placanja || []);
    } catch (error) {
      console.error("Greška prilikom dohvaćanja obračuna: ", error);
      setGreska("Došlo je do greške prilikom dohvaćanja obračuna.");
    }
  };

  return (
    <div>
      <h1>Obračun po vrstama plaćanja</h1>
      <div>
        <input
          type="text"
          placeholder="Unesite PJ UID"
          value={pjUid}
          onChange={(e) => setPjUid(e.target.value)}
        />
        <input
          type="text"
          placeholder="Od datuma (npr. 1.1.2023)"
          value={odDatuma}
          onChange={(e) => setOdDatuma(e.target.value)}
        />
        <input
          type="text"
          placeholder="Do datuma (npr. 31.12.2023)"
          value={doDatuma}
          onChange={(e) => setDoDatuma(e.target.value)}
        />
        <button onClick={handleSearch}>Pretraži</button>
      </div>

      {greska && <p>{greska}</p>}

      <ul>
        {placanja.map((placanje, index) => (
          <li key={index}>
            <strong>vrsta_placanja_uid: </strong>
            {placanje.vrste_placanja_uid}
            <br />
            <strong>Naziv: </strong>
            {placanje.naziv}
            <br />
            <strong>Iznos: </strong>
            {placanje.iznos} €
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ObracunPoVrstamaPlacanja;
