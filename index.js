const express = require("express");
const cors = require("cors");
const app = express();
const players = [];

app.use(express.static("public"));
app.use(cors());
app.use(express.json());

class Player {
  constructor(id) {
    this.id = id;
  }
  assignMokepon(mokepon) {
    this.mokepon = mokepon;
  }
  assignAttacks(attacks) {
    this.attacks = attacks;
  }
  updatePosition(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Mokepon {
  constructor(name) {
    this.name = name;
  }
}

app.get("/unirse", (req, res) => {
  const id = `${Math.random()}`;
  const player = new Player(id);
  players.push(player);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.send(id);
});

app.post("/mokepon/:playerID", (req, res) => {
  const playerID = req.params.playerID || "";
  const nameMokepon = req.body.mokepon || "";
  const mokepon = new Mokepon(nameMokepon);
  const playerIndex = players.findIndex((player) => playerID === player.id);
  if (playerIndex >= 0) {
    players[playerIndex].assignMokepon(mokepon);
  }
  res.end();
});

app.post("/mokepon/:playerID/attacks", (req, res) => {
  const playerID = req.params.playerID || "";
  const attacks = req.body.attacks || [];

  const playerIndex = players.findIndex((player) => playerID === player.id);
  if (playerIndex >= 0) {
    players[playerIndex].assignAttacks(attacks);
  }
  res.end();
});

app.get("/mokepon/:playerID/attacks", (req, res) => {
  const playerID = req.params.playerID || "";
  const player = players.find((player) => playerID === player.id);
  res.send({
    attacks: player.attacks || [],
  });
});

app.post("/mokepon/:playerID/position", (req, res) => {
  const playerID = req.params.playerID || "";
  const x = req.body.x || 0;
  const y = req.body.y || 0;
  const playerIndex = players.findIndex((player) => playerID === player.id);
  if (playerIndex >= 0) {
    players[playerIndex].updatePosition(x, y);
  }
  const enemys = players.filter((player) => playerID !== player.id);
  res.send({ enemys });
});

app.listen(8080, () => {
  console.log("Servidor funcionando");
});
