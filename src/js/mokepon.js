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

let mokeponesPlayer = [];
let mokeponesEnemy = [];
let currentPet;
let attacksPlayer = [];
let attacksEnemy = [];
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
  constructor(name, photo, life, mapPhoto) {
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

let hipodogeEnemy = new Mokepon(
  "Hipodoge",
  "https://static.platzi.com/media/tmp/class-files/github/curso-programacion-basica/curso-programacion-basica-40-css-grid/programar/mokepon/assets/mokepons_mokepon_hipodoge_attack.png",
  5,
  "https://static.platzi.com/media/tmp/class-files/github/curso-programacion-basica/curso-programacion-basica-65-clases-methods/programar/mokepon/assets/hipodoge.png"
);

let capipepoEnemy = new Mokepon(
  "Capipepo",
  "https://static.platzi.com/media/tmp/class-files/github/curso-programacion-basica/curso-programacion-basica-40-css-grid/programar/mokepon/assets/mokepons_mokepon_capipepo_attack.png",
  5,
  "https://static.platzi.com/media/tmp/class-files/github/curso-programacion-basica/curso-programacion-basica-65-clases-methods/programar/mokepon/assets/capipepo.png"
);

let ratigueyaEnemy = new Mokepon(
  "Ratigueya",
  "https://static.platzi.com/media/tmp/class-files/github/curso-programacion-basica/curso-programacion-basica-40-css-grid/programar/mokepon/assets/mokepons_mokepon_ratigueya_attack.png",
  5,
  "https://static.platzi.com/media/tmp/class-files/github/curso-programacion-basica/curso-programacion-basica-65-clases-methods/programar/mokepon/assets/ratigueya.png"
);

hipodoge.attacks.push(
  { name: "💧", id: "btn-water-attack" },
  { name: "💧", id: "btn-water-attack" },
  { name: "💧", id: "btn-water-attack" },
  { name: "🔥", id: "btn-fire-attack" },
  { name: "🌱", id: "btn-earth-attack" }
);

capipepo.attacks.push(
  { name: "🌱", id: "btn-earth-attack" },
  { name: "🌱", id: "btn-earth-attack" },
  { name: "🌱", id: "btn-earth-attack" },
  { name: "💧", id: "btn-water-attack" },
  { name: "🔥", id: "btn-fire-attack" }
);

ratigueya.attacks.push(
  { name: "🔥", id: "btn-fire-attack" },
  { name: "🔥", id: "btn-fire-attack" },
  { name: "🔥", id: "btn-fire-attack" },
  { name: "💧", id: "btn-water-attack" },
  { name: "🌱", id: "btn-earth-attack" }
);

hipodogeEnemy.attacks.push(
  { name: "💧", id: "btn-water-attack" },
  { name: "💧", id: "btn-water-attack" },
  { name: "💧", id: "btn-water-attack" },
  { name: "🔥", id: "btn-fire-attack" },
  { name: "🌱", id: "btn-earth-attack" }
);

capipepoEnemy.attacks.push(
  { name: "🌱", id: "btn-earth-attack" },
  { name: "🌱", id: "btn-earth-attack" },
  { name: "🌱", id: "btn-earth-attack" },
  { name: "💧", id: "btn-water-attack" },
  { name: "🔥", id: "btn-fire-attack" }
);

ratigueyaEnemy.attacks.push(
  { name: "🔥", id: "btn-fire-attack" },
  { name: "🔥", id: "btn-fire-attack" },
  { name: "🔥", id: "btn-fire-attack" },
  { name: "💧", id: "btn-water-attack" },
  { name: "🌱", id: "btn-earth-attack" }
);

mokeponesPlayer.push(hipodoge, capipepo, ratigueya);
mokeponesEnemy.push(hipodogeEnemy, capipepoEnemy, ratigueyaEnemy);

function changeDisplay(label, status) {
  var element = document.getElementById(label);
  if (element) {
    element.style.display = status;
  }
}

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

function typeAttack(type, value) {
  let result;
  switch (type) {
    case 1: {
      result = attacksPlayer[value].name;
      break;
    }
    case 2: {
      result = attacksEnemy[value].name;
      break;
    }
  }
  return result;
}

function petSelected(type, number) {
  switch (type) {
    case 1: {
      const selectedPetInput = document.querySelector(
        'input[name="pets"]:checked'
      );
      if (selectedPetInput) {
        return mokeponesPlayer.find(
          (mokepon) => mokepon.name === selectedPetInput.id
        );
      }
      return null;
    }
    case 2: {
      return mokeponesEnemy[number];
    }
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
  const petSelectedPlayer = petSelected(1, 0);
  if (petSelectedPlayer) {
    petPlayer.innerHTML = petSelectedPlayer.name;
    currentPet = petSelectedPlayer;
    attacksPlayer = extractPetAttacks(1, petSelectedPlayer.name);

    changeDisplay("select-pet", "none");
    changeDisplay("see-map", "flex");
    innitMap();

    loadAttackPlayer();
    playerAttackSequence();
  } else {
    alert("Error: No seleccionaste a tú mascota.");
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
  loadPetEnemy();
}

function loadPetEnemy() {
  for (let i = 0; i < mokeponesEnemy.length; i++) {
    mokeponesEnemy[i].drawMokepon();
    if (currentPet.velocityX !== 0 || currentPet.velocityY !== 0) {
      checkCollision(mokeponesEnemy[i]);
    }
  }
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
  changeDisplay("select-attack", "flex");
  changeDisplay("see-map", "none");
  selectPetEnemy(enemy);
}

function selectPetEnemy(enemy) {
  petEnemy.innerHTML = enemy.name;
  attacksEnemy = extractPetAttacks(2, enemy.name);
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

function extractPetAttacks(type, petName) {
  let attacks;
  switch (type) {
    case 1: {
      for (let i = 0; i < mokeponesPlayer.length; i++) {
        if (petName === mokeponesPlayer[i].name) {
          attacks = mokeponesPlayer[i].attacks;
        }
      }
      break;
    }
    case 2: {
      for (let i = 0; i < mokeponesEnemy.length; i++) {
        if (petName === mokeponesEnemy[i].name) {
          attacks = mokeponesEnemy[i].attacks;
        }
      }
      break;
    }
  }
  return attacks;
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
      enemyAttackSequence();
      startCombat();
    });
  });
}

function enemyAttackSequence() {
  sequenceAttackEnemy = [];
  for (let i = 0; i < attacksEnemy.length; i++) {
    sequenceAttackEnemy.push(attacksEnemy[i].name);
  }

  for (let i = sequenceAttackEnemy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [sequenceAttackEnemy[i], sequenceAttackEnemy[j]] = [
      sequenceAttackEnemy[j],
      sequenceAttackEnemy[i],
    ];
  }
}

function startCombat() {
  if (sequenceAttackPlayer.length === 5) {
    resultCombat();
  }
}

function resultCombat() {
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

function innitGame() {
  changeDisplay("select-attack", "none");
  changeDisplay("see-map", "none");
  changeDisplay("reset-game", "none");
  loadPetPlayer();

  btnPetPlayer.addEventListener("click", selectPetPlayer);

  btnReset.addEventListener("click", () => {
    location.reload();
  });
}

window.addEventListener("load", innitGame);
