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

let mokepones = [];
let attacksPlayer = [];
let attacksEnemy = [];
let sequenceAttackPlayer = [];
let sequenceAttackEnemy = [];
let attackPlayer;
let attackEnemy;
let btnAttacks;
let winPlayer = 0;
let winEnemy = 0;

class Mokepon {
  constructor(name, photo, life) {
    this.name = name;
    this.photo = photo;
    this.life = life;
    this.attacks = [];
  }
}

let hipodoge = new Mokepon(
  "Hipodoge",
  "https://static.platzi.com/media/tmp/class-files/github/curso-programacion-basica/curso-programacion-basica-40-css-grid/programar/mokepon/assets/mokepons_mokepon_hipodoge_attack.png",
  5
);

let capipepo = new Mokepon(
  "Capipepo",
  "https://static.platzi.com/media/tmp/class-files/github/curso-programacion-basica/curso-programacion-basica-40-css-grid/programar/mokepon/assets/mokepons_mokepon_capipepo_attack.png",
  5
);

let ratigueya = new Mokepon(
  "Ratigueya",
  "https://static.platzi.com/media/tmp/class-files/github/curso-programacion-basica/curso-programacion-basica-40-css-grid/programar/mokepon/assets/mokepons_mokepon_ratigueya_attack.png",
  5
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

mokepones.push(hipodoge, capipepo, ratigueya);

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
        return mokepones.find(
          (mokepon) => mokepon.name === selectedPetInput.id
        );
      }
      return null;
    }
    case 2: {
      return mokepones[number];
    }
  }
}

function loadPets() {
  mokepones.forEach((mokepon) => {
    let mokeponOptions = `<input type="radio" name="pets" id="${mokepon.name}" />
    <label class="card-mokepon" for="${mokepon.name}">
      <p>${mokepon.name}</p>
      <img src="${mokepon.photo}" alt="${mokepon.name}"/>
    </label>`;
    containerAvailablePets.innerHTML += mokeponOptions;
  });
}

function selectPetPlayers() {
  const selectPetPlayer = petSelected(1, 0);
  const selectPetEnemy = petSelected(2, random(0, mokepones.length - 1));
  if (selectPetPlayer) {
    petPlayer.innerHTML = selectPetPlayer.name;
    petEnemy.innerHTML = selectPetEnemy.name;

    attacksPlayer = extractPetAttacks(selectPetPlayer.name);
    attacksEnemy = extractPetAttacks(selectPetEnemy.name);

    changeDisplay("select-pet", "none");
    changeDisplay("select-attack", "flex");

    loadAttackPlayer();
    playerAttackSequence();
  } else {
    alert("Error: No seleccionaste a tú mascota.");
  }
}

function extractPetAttacks(petName) {
  let attacks;
  for (let i = 0; i < mokepones.length; i++) {
    if (petName === mokepones[i].name) {
      attacks = mokepones[i].attacks;
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
  let randomNumber = random(0, attacksEnemy.length - 1);
  attackEnemy = typeAttack(2, randomNumber);
  sequenceAttackEnemy.push(attackEnemy);
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
  changeDisplay("reset-game", "none");
  loadPets();

  btnPetPlayer.addEventListener("click", selectPetPlayers);

  btnReset.addEventListener("click", () => {
    location.reload();
  });
}

window.addEventListener("load", innitGame);
