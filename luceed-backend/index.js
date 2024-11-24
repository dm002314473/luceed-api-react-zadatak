const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

const LUCEED_API_BASE = process.env.LUCEED_API_BASE;

app.use(cors());

app.get("/", (req, res) => {
  res.send("Luceed API Backend je pokrenut!");
});

// Dohvat artikala prema dijelu naziva
app.get("/api/artikli", async (req, res) => {
  const { naziv } = req.query;
  if (!naziv) {
    return res.status(400).json({ error: "Naziv parametar je obavezan." });
  }

  try {
    const response = await axios.get(
      `${LUCEED_API_BASE}/artikli/naziv/${naziv}/[0,10]`,
      {
        auth: {
          username: process.env.LUCEED_USERNAME,
          password: process.env.LUCEED_PASSWORD,
        },
      }
    );

    const artikli = response.data.result || [];
    res.json(artikli);
  } catch (error) {
    console.error(error.response ? error.response.data : error.message);
    res
      .status(500)
      .json({ error: "Greška prilikom dohvata artikala po nazivu." });
  }
});

// Dohvat obračuna prema točki 3.3 dokumentacije
app.get("/api/obracun/placanja", async (req, res) => {
  const { pjUid, odDatuma, doDatuma } = req.query;

  if (!pjUid || !odDatuma || !doDatuma) {
    return res.status(400).json({ error: "Svi parametri su obavezni." });
  }
  console.log(
    `${LUCEED_API_BASE}/mpobracun/placanja/${pjUid}/${odDatuma}/${doDatuma}`
  );

  try {
    const url = `${LUCEED_API_BASE}/mpobracun/placanja/${pjUid}/${odDatuma}/${doDatuma}`;
    const response = await axios.get(url, {
      auth: {
        username: process.env.LUCEED_USERNAME,
        password: process.env.LUCEED_PASSWORD,
      },
    });

    const placanja = response.data.result[0]?.obracun_placanja || [];
    res.json({ placanja });
  } catch (error) {
    console.error(error.response ? error.response.data : error.message);
    res.status(500).json({ error: "Greška prilikom dohvata obračuna." });
  }
});

// Dohvat obračuna prema točki 3.4 dokumentacije
app.get("/api/obracun/artikli", async (req, res) => {
  const { pjUid, odDatuma, doDatuma } = req.query;

  if (!pjUid || !odDatuma || !doDatuma) {
    return res.status(400).json({ error: "Svi parametri su obavezni." });
  }
  console.log(
    `${LUCEED_API_BASE}/mpobracun/artikli/${pjUid}/${odDatuma}/${doDatuma}`
  );

  try {
    const url = `${LUCEED_API_BASE}/mpobracun/artikli/${pjUid}/${odDatuma}/${doDatuma}`;
    const response = await axios.get(url, {
      auth: {
        username: process.env.LUCEED_USERNAME,
        password: process.env.LUCEED_PASSWORD,
      },
    });

    const artikli = response.data.result[0]?.obracun_artikli || [];
    res.json({ artikli });
  } catch (error) {
    console.error(error.response ? error.response.data : error.message);
    res.status(500).json({ error: "Greška prilikom dohvata obračuna." });
  }
});

app.listen(port, () => {
  console.log(`Backend pokrenut na http://localhost:${port}`);
});
