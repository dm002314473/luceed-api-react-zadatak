import React, { useState } from "react";
import axios from "axios";

const ObracunPoArtiklima = () => {
  const [pjUid, setPjUid] = useState("");
  const [odDatuma, setOdDatuma] = useState("");
  const [doDatuma, setDoDatuma] = useState("");
  const [obracunArtikli, setObracunArtikli] = useState([]);
  const [greska, setGreska] = useState("");

  const handleSearch = async () => {
    if (!pjUid || !odDatuma || !doDatuma) {
      setGreska("Molimo unesite sve podatke.");
      return;
    }

    try {
      setGreska("");
      const response = await axios.get(
        "http://localhost:5000/api/obracun/artikli",
        {
          params: {
            pjUid,
            odDatuma,
            doDatuma,
          },
        }
      );

      setObracunArtikli(response.data.artikli || []);
    } catch (error) {
      console.error("Greška prilikom dohvaćanja obračuna: ", error);
      setGreska("Došlo je do greške prilikom dohvaćanja obračuna.");
    }
  };

  return (
    <div>
      <h1>Obracun po artiklima</h1>
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
        {obracunArtikli.map((artikl, index) => (
          <li key={index}>
            <strong>Artikl UID:</strong> {artikl.artikl_uid} <br />
            <strong>Naziv artikla:</strong> {artikl.naziv_artikla} <br />
            <strong>Količina:</strong> {artikl.kolicina} <br />
            <strong>Iznos:</strong> {artikl.iznos} €<br />
            <strong>Usluga:</strong> {artikl.usluga} <br />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ObracunPoArtiklima;
