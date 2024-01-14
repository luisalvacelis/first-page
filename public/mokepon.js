const btnPetPlayer = document.getElementById("btn-select-pet");
const btnFire = document.getElementById("btn-fire-attack");
const btnWater = document.getElementById("btn-water-attack");
const btnEarth = document.getElementById("btn-earth-attack");
const btnReset = document.getElementById("btn-reset-game");

const petPlayer = document.getElementById("pet-player");
const petEnemy = document.getElementById("pet-enemy");

const spanWinsPlayer = document.getElementById("wins-player");
const spanWinsEnemy = document.getElementById("wins-enemy");

const containerAvailablePets = document.getElementById(
  "container-available-pets"
);
const containerBtnAttacks = document.getElementById("container-btn-attacks");

const sectionSeeMap = document.getElementById("see-map");
const map = document.getElementById("map");

let playerID = null;
let enemyID = null;
let mokeponesPlayer = [];
let mokeponesEnemy = [];
let currentPet;
let attacksPlayer = [];
let sequenceAttackPlayer = [];
let sequenceAttackEnemy = [];
let keysPressed = {};
let attackPlayer;
let attackEnemy;
let btnAttacks;
let winPlayer = 0;
let winEnemy = 0;
let interval = 0;
let mainCanva = map.getContext("2d");
let mapBackground = new Image();
mapBackground.src =
  "https://static.platzi.com/media/tmp/class-files/github/curso-programacion-basica/curso-programacion-basica-64-imgs-personajes-fondo/programar/mokepon/assets/mokemap.png";
let heightToSearch;
let widthMap = window.innerWidth - 80;
const widthMaxMap = 360;
if (widthMap > widthMaxMap) {
  widthMap = widthMaxMap;
}

heightToSearch = (widthMap * 600) / 800;
map.width = widthMap;
map.height = heightToSearch;

class Mokepon {
  constructor(name, photo, life, mapPhoto, id = null) {
    this.id = id;
    this.name = name;
    this.photo = photo;
    this.life = life;
    this.attacks = [];
    this.width = 40;
    this.height = 40;
    this.x = random(0, map.width - this.width);
    this.y = random(0, map.height - this.height);
    this.mapPhoto = new Image();
    this.mapPhoto.src = mapPhoto;
    this.velocityX = 0;
    this.velocityY = 0;
  }

  drawMokepon() {
    mainCanva.drawImage(this.mapPhoto, this.x, this.y, this.width, this.height);
  }
}

let hipodoge = new Mokepon(
  "Hipodoge",
  "https://static.platzi.com/media/tmp/class-files/github/curso-programacion-basica/curso-programacion-basica-40-css-grid/programar/mokepon/assets/mokepons_mokepon_hipodoge_attack.png",
  5,
  "https://static.platzi.com/media/tmp/class-files/github/curso-programacion-basica/curso-programacion-basica-65-clases-methods/programar/mokepon/assets/hipodoge.png"
);

let capipepo = new Mokepon(
  "Capipepo",
  "https://static.platzi.com/media/tmp/class-files/github/curso-programacion-basica/curso-programacion-basica-40-css-grid/programar/mokepon/assets/mokepons_mokepon_capipepo_attack.png",
  5,
  "https://static.platzi.com/media/tmp/class-files/github/curso-programacion-basica/curso-programacion-basica-65-clases-methods/programar/mokepon/assets/capipepo.png"
);

let ratigueya = new Mokepon(
  "Ratigueya",
  "https://static.platzi.com/media/tmp/class-files/github/curso-programacion-basica/curso-programacion-basica-40-css-grid/programar/mokepon/assets/mokepons_mokepon_ratigueya_attack.png",
  5,
  "https://static.platzi.com/media/tmp/class-files/github/curso-programacion-basica/curso-programacion-basica-65-clases-methods/programar/mokepon/assets/ratigueya.png"
);

const HIPODOGE_ATTACKS = [
  { name: "💧", id: "btn-water-attack" },
  { name: "💧", id: "btn-water-attack" },
  { name: "💧", id: "btn-water-attack" },
  { name: "🔥", id: "btn-fire-attack" },
  { name: "🌱", id: "btn-earth-attack" },
];

const CAPIPEPO_ATTACKS = [
  { name: "🌱", id: "btn-earth-attack" },
  { name: "🌱", id: "btn-earth-attack" },
  { name: "🌱", id: "btn-earth-attack" },
  { name: "💧", id: "btn-water-attack" },
  { name: "🔥", id: "btn-fire-attack" },
];

const RATIGUEYA_ATTACKS = [
  { name: "🔥", id: "btn-fire-attack" },
  { name: "🔥", id: "btn-fire-attack" },
  { name: "🔥", id: "btn-fire-attack" },
  { name: "💧", id: "btn-water-attack" },
  { name: "🌱", id: "btn-earth-attack" },
];

capipepo.attacks.push(...CAPIPEPO_ATTACKS);
ratigueya.attacks.push(...RATIGUEYA_ATTACKS);
hipodoge.attacks.push(...HIPODOGE_ATTACKS);

mokeponesPlayer.push(hipodoge, capipepo, ratigueya);

function desactiveAllButtonAttack() {
  btnAttacks.forEach((button) => {
    button.disabled = true;
  });
}

function generalConsole(label, msg) {
  let console = document.getElementById(label);
  let paragraph = document.createElement("p");
  paragraph.innerHTML = msg;
  console.appendChild(paragraph);
}

function overwriteConsole(msg) {
  let console = document.getElementById("console");
  console.innerHTML = msg;
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function extractPetAttacks(petName) {
  let attacks;
  for (let i = 0; i < mokeponesPlayer.length; i++) {
    if (petName === mokeponesPlayer[i].name) {
      attacks = mokeponesPlayer[i].attacks;
    }
  }
  return attacks;
}

function stopMove() {
  currentPet.velocityX = 0;
  currentPet.velocityY = 0;
}

function moveRight() {
  currentPet.velocityX = 2;
}

function moveLeft() {
  currentPet.velocityX = -2;
}

function moveUp() {
  currentPet.velocityY = -2;
}

function moveDown() {
  currentPet.velocityY = 2;
}

function diagonalTopRight() {
  currentPet.velocityX = 2;
  currentPet.velocityY = -2;
}

function diagonalTopLeft() {
  currentPet.velocityX = -2;
  currentPet.velocityY = -2;
}

function diagonalDownLeft() {
  currentPet.velocityX = -2;
  currentPet.velocityY = 2;
}

function diagonalDownRight() {
  currentPet.velocityX = 2;
  currentPet.velocityY = 2;
}

function loadAttackPlayer() {
  attacksPlayer.forEach((attack) => {
    let attacksOptions = `<button id="${attack.id}" class="availables-attacks">${attack.name}</button>`;
    containerBtnAttacks.innerHTML += attacksOptions;
  });

  btnAttacks = document.querySelectorAll(".availables-attacks");
}

function playerAttackSequence() {
  btnAttacks.forEach((button) => {
    button.addEventListener("click", (e) => {
      if (e.target.textContent === "🔥") {
        sequenceAttackPlayer.push("🔥");
        button.style.background = "#82109A";
        button.disabled = true;
        attackPlayer = "🔥";
      } else if (e.target.textContent === "💧") {
        sequenceAttackPlayer.push("💧");
        button.style.background = "#82109A";
        button.disabled = true;
        attackPlayer = "💧";
      } else if (e.target.textContent === "🌱") {
        sequenceAttackPlayer.push("🌱");
        button.style.background = "#82109A";
        button.disabled = true;
        attackPlayer = "🌱";
      }
      if (sequenceAttackPlayer.length === 5) {
        sendAttacks();
      }
    });
  });
}

function startCombat() {
  clearInterval(interval);
  for (let i = 0; i < sequenceAttackPlayer.length; i++) {
    generalConsole("console-player", sequenceAttackPlayer[i]);
    generalConsole("console-enemy", sequenceAttackEnemy[i]);

    if (sequenceAttackPlayer[i] === sequenceAttackEnemy[i]) {
      overwriteConsole("Empate! 🤷‍♂️");
    } else if (
      sequenceAttackPlayer[i] == "🔥" &&
      sequenceAttackEnemy[i] == "🌱"
    ) {
      winPlayer++;
      overwriteConsole("Ganaste ronda 🎈🎉");
    } else if (
      sequenceAttackPlayer[i] == "💧" &&
      sequenceAttackEnemy[i] == "🔥"
    ) {
      winPlayer++;
      overwriteConsole("Ganaste ronda 🎈🎉");
    } else if (
      sequenceAttackPlayer[i] == "🌱" &&
      sequenceAttackEnemy[i] == "💧"
    ) {
      winPlayer++;
      overwriteConsole("Ganaste ronda 🎈🎉");
    } else {
      winEnemy++;
      overwriteConsole("Perdiste ronda 😢");
    }
    validateResultWin();
  }
}

function validateResultWin() {
  spanWinsEnemy.innerHTML = winEnemy + " 👑";
  spanWinsPlayer.innerHTML = winPlayer + " 👑";
  changeDisplay("reset-game", "flex");
  desactiveAllButtonAttack();
  if (winPlayer == winEnemy) {
    overwriteConsole(
      "¡La partida quedo en empate! 🎈🎉 <br>- - - Juego finalizado - - -"
    );
  } else if (winPlayer > winEnemy) {
    overwriteConsole(
      "¡Ganaste la partida! 🎈🎉 <br>- - - Juego finalizado - - -"
    );
  } else if (winPlayer < winEnemy) {
    overwriteConsole(
      "¡Perdiste la partida! 😭 <br>- - - Juego finalizado - - -"
    );
  }
}

function mokeponSelected(mokeponPlayer) {
  fetch(`http://192.168.0.7:8080/mokepon/${playerID}`, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ mokepon: mokeponPlayer }),
  });
}

function sendAttacks() {
  fetch(`http://192.168.0.7:8080/mokepon/${playerID}/attacks`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      attacks: sequenceAttackPlayer,
    }),
  });
  interval = setInterval(getAttacks, 50);
}

function getAttacks() {
  fetch(`http://192.168.0.7:8080/mokepon/${enemyID}/attacks`).then(function (
    res
  ) {
    if (res.ok) {
      res.json().then(function ({ attacks }) {
        if (attacks.length === 5) {
          sequenceAttackEnemy = attacks;
          startCombat();
        }
      });
    }
  });
}

window.addEventListener("load", initGame);

function initGame() {
  changeDisplay("select-attack", "none");
  changeDisplay("see-map", "none");
  changeDisplay("reset-game", "none");

  loadPetPlayer();

  btnPetPlayer.addEventListener("click", selectPetPlayer);

  btnReset.addEventListener("click", () => {
    location.reload();
  });

  joinGame();
}

function changeDisplay(label, status) {
  var element = document.getElementById(label);
  if (element) {
    element.style.display = status;
  }
}

function loadPetPlayer() {
  mokeponesPlayer.forEach((mokepon) => {
    let mokeponOptions = `<input type="radio" name="pets" id="${mokepon.name}" />
    <label class="card-mokepon" for="${mokepon.name}">
      <p>${mokepon.name}</p>
      <img src="${mokepon.photo}" alt="${mokepon.name}"/>
    </label>`;
    containerAvailablePets.innerHTML += mokeponOptions;
  });
}

function selectPetPlayer() {
  const petSelectedPlayer = petSelected();
  if (petSelectedPlayer) {
    petPlayer.innerHTML = petSelectedPlayer.name;
    currentPet = petSelectedPlayer;
    attacksPlayer = extractPetAttacks(petSelectedPlayer.name);

    changeDisplay("select-pet", "none");
    changeDisplay("see-map", "flex");
    mokeponSelected(currentPet.name);

    innitMap();

    loadAttackPlayer();
    playerAttackSequence();
  } else {
    alert("Error: No seleccionaste a tú mascota.");
  }
}

function joinGame() {
  fetch("http://192.168.0.7:8080/unirse").then((res) => {
    if (res.ok) {
      res.text().then((response) => {
        playerID = response;
      });
    }
  });
}

function petSelected() {
  const selectedPetInput = document.querySelector('input[name="pets"]:checked');
  if (selectedPetInput) {
    return mokeponesPlayer.find(
      (mokepon) => mokepon.name === selectedPetInput.id
    );
  }
}

function innitMap() {
  interval = setInterval(drawCanvas, 50);

  document.addEventListener("keydown", handleKeyDown);

  document.addEventListener("keyup", handleKeyUp);
}

function drawCanvas() {
  currentPet.x = currentPet.x + currentPet.velocityX;
  currentPet.y = currentPet.y + currentPet.velocityY;

  mainCanva.clearRect(0, 0, map.width, map.height);

  mainCanva.drawImage(mapBackground, 0, 0, map.width, map.height);
  currentPet.drawMokepon();

  sendPosition(currentPet.x, currentPet.y);
  try {
    loadPetEnemy();
  } catch (error) {}
}

function handleKeyDown(event) {
  keysPressed[event.key] = true;
  if (currentPet) {
    if (keysPressed["a"]) {
      moveLeft();
    }
    if (keysPressed["d"]) {
      moveRight();
    }
    if (keysPressed["w"]) {
      moveUp();
    }
    if (keysPressed["s"]) {
      moveDown();
    }
    if (keysPressed["w"] && keysPressed["d"]) {
      diagonalTopRight();
    }
    if (keysPressed["w"] && keysPressed["a"]) {
      diagonalTopLeft();
    }
    if (keysPressed["s"] && keysPressed["d"]) {
      diagonalDownRight();
    }
    if (keysPressed["s"] && keysPressed["a"]) {
      diagonalDownLeft();
    }
  }
}

function handleKeyUp(event) {
  if (currentPet) {
    keysPressed[event.key] = false;
    stopMove();
  }
}

function sendPosition(x, y) {
  fetch(`http://192.168.0.7:8080/mokepon/${playerID}/position`, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      x,
      y,
    }),
  }).then(function (res) {
    if (res.ok) {
      res.json().then(function ({ enemys }) {
        mokeponesEnemy = enemys.map(function (enemy) {
          let mokeponEnemy = null;
          try {
            const mokeponName = enemy.mokepon.name || "";
            if (mokeponName === "Hipodoge") {
              mokeponEnemy = new Mokepon(
                "Hipodoge",
                "https://static.platzi.com/media/tmp/class-files/github/curso-programacion-basica/curso-programacion-basica-40-css-grid/programar/mokepon/assets/mokepons_mokepon_hipodoge_attack.png",
                5,
                "https://static.platzi.com/media/tmp/class-files/github/curso-programacion-basica/curso-programacion-basica-65-clases-methods/programar/mokepon/assets/hipodoge.png",
                enemy.id
              );
            } else if (mokeponName === "Capipepo") {
              mokeponEnemy = new Mokepon(
                "Capipepo",
                "https://static.platzi.com/media/tmp/class-files/github/curso-programacion-basica/curso-programacion-basica-40-css-grid/programar/mokepon/assets/mokepons_mokepon_capipepo_attack.png",
                5,
                "https://static.platzi.com/media/tmp/class-files/github/curso-programacion-basica/curso-programacion-basica-65-clases-methods/programar/mokepon/assets/capipepo.png",
                enemy.id
              );
            } else if (mokeponName === "Ratigueya") {
              mokeponEnemy = new Mokepon(
                "Ratigueya",
                "https://static.platzi.com/media/tmp/class-files/github/curso-programacion-basica/curso-programacion-basica-40-css-grid/programar/mokepon/assets/mokepons_mokepon_ratigueya_attack.png",
                5,
                "https://static.platzi.com/media/tmp/class-files/github/curso-programacion-basica/curso-programacion-basica-65-clases-methods/programar/mokepon/assets/ratigueya.png",
                enemy.id
              );
            }
            mokeponEnemy.x = enemy.x || 0;
            mokeponEnemy.y = enemy.y || 0;
            return mokeponEnemy;
          } catch (error) {}
        });
      });
    }
  });
}

function loadPetEnemy() {
  mokeponesEnemy.forEach(function (mokepon) {
    mokepon.drawMokepon();
    checkCollision(mokepon);
  });
}

function checkCollision(enemy) {
  const upPetEnemy = enemy.y;
  const downPetEnemy = enemy.y + enemy.height;
  const rightPetEnemy = enemy.x + enemy.width;
  const leftPetEnemy = enemy.x;

  const upPetPlayer = currentPet.y;
  const downPetPlayer = currentPet.y + currentPet.height;
  const rightPetPlayer = currentPet.x + currentPet.width;
  const leftPetPlayer = currentPet.x;

  if (
    downPetPlayer < upPetEnemy ||
    upPetPlayer > downPetEnemy ||
    rightPetPlayer < leftPetEnemy ||
    leftPetPlayer > rightPetEnemy
  ) {
    return;
  }
  stopMove();
  keysPressed = [];
  clearInterval(interval);
  enemyID = enemy.id;
  changeDisplay("select-attack", "flex");
  changeDisplay("see-map", "none");

  selectPetEnemy(enemy);
}

function selectPetEnemy(enemy) {
  petEnemy.innerHTML = enemy.name;
}
