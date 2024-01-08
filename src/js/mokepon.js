let attackPlayer;
let attackEnemy;
let lifesPlayer = 3;
let lifesEnemy = 3;

function typeAttack(value) {
  let attack = "";
  switch (value) {
    case 1: {
      attack = "Fuego";
      break;
    }
    case 2: {
      attack = "Agua";
      break;
    }
    case 3: {
      attack = "Tierra";
      break;
    }
    default: {
      attack = "ATTACK NOT FOUND";
      break;
    }
  }
  return attack;
}

function changeDisplay(label, status) {
  var element = document.getElementById(label);
  if (element) {
    element.style.display = status;
  }
}

function changeStatusVisible(label, status) {
  let element = document.getElementById(label);
  if (element) {
    element.disabled = status;
  }
}

function petSelected(numberPet) {
  let pet = "";
  switch (numberPet) {
    case 1: {
      pet = "Hipodoge";
      break;
    }
    case 2: {
      pet = "Capipepo";
      break;
    }
    case 3: {
      pet = "Ratigueya";
      break;
    }
    case 4: {
      pet = "Langotelvis";
      break;
    }
    case 5: {
      pet = "Tucapalma";
      break;
    }
    case 6: {
      pet = "Pydos";
      break;
    }
    default: {
      pet = "PET NO ENCONTRADA";
      break;
    }
  }
  return pet;
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function selectPetPlayer() {
  let inputHipodoge = document.getElementById("hipodoge");
  let inputCapipepo = document.getElementById("capipepo");
  let inputRatigueya = document.getElementById("ratigueya");
  let inputLangostelvis = document.getElementById("langostelvis");
  let inputTucapalma = document.getElementById("tucapalma");
  let inputPydos = document.getElementById("pydos");
  let petPlayer = document.getElementById("pet-player");

  if (inputHipodoge.checked) {
    petPlayer.innerHTML = petSelected(1);
    selectPetEnemy();
    changeDisplay("select-attack", "block");
    changeDisplay("select-pet", "none");
  } else if (inputCapipepo.checked) {
    petPlayer.innerHTML = petSelected(2);
    selectPetEnemy();
    changeDisplay("select-attack", "block");
    changeDisplay("select-pet", "none");
  } else if (inputRatigueya.checked) {
    petPlayer.innerHTML = petSelected(3);
    selectPetEnemy();
    changeDisplay("select-attack", "block");
    changeDisplay("select-pet", "none");
  } else if (inputLangostelvis.checked) {
    petPlayer.innerHTML = petSelected(4);
    selectPetEnemy();
    changeDisplay("select-attack", "block");
    changeDisplay("select-pet", "none");
  } else if (inputTucapalma.checked) {
    petPlayer.innerHTML = petSelected(5);
    selectPetEnemy();
    changeDisplay("select-attack", "block");
    changeDisplay("select-pet", "none");
  } else if (inputPydos.checked) {
    petPlayer.innerHTML = petSelected(6);
    selectPetEnemy();
    changeDisplay("select-attack", "block");
    changeDisplay("select-pet", "none");
  } else {
    alert("Error: No seleccionaste a tú mascota.");
  }
}

function selectPetEnemy() {
  let attackRandomNumber = random(1, 6);
  let petEnemySelected = petSelected(attackRandomNumber);
  let petEnemy = document.getElementById("pet-enemy");
  petEnemy.innerHTML = petEnemySelected;
}

function resultCombat() {
  let spanLifesPlayer = document.getElementById("lifes-player");
  let spanLifesEnemy = document.getElementById("lifes-enemy");

  let result = "";
  if (lifesEnemy == 0 || lifesPlayer == 0) {
    createMessage(3, "Juego finalizado");
  } else {
    if (lifesEnemy > 0 && lifesPlayer > 0) {
      if (attackEnemy == attackPlayer) {
        result = "Empate! 🤷‍♂️";
        createMessage(1, result);
      } else if (attackPlayer == "Fuego" && attackEnemy == "Tierra") {
        result = "Ganaste! 🎉";
        lifesEnemy--;
        createMessage(1, result);
      } else if (attackPlayer == "Agua" && attackEnemy == "Fuego") {
        result = "Ganaste! 🎉";
        lifesEnemy--;
        createMessage(1, result);
      } else if (attackPlayer == "Tierra" && attackEnemy == "Agua") {
        result = "Ganaste! 🎉";
        lifesEnemy--;
        createMessage(1, result);
      } else {
        result = "Perdiste! 😢";
        lifesPlayer--;
        createMessage(1, result);
      }
    }
    if (lifesEnemy == 0) {
      result = "ganaste";
      createMessage(2, result);
      createMessage(3, "Juego finalizado");
    } else if (lifesPlayer == 0) {
      result = "perdiste";
      createMessage(2, result);
      createMessage(3, "Juego finalizado");
    }
  }
  spanLifesEnemy.innerHTML = lifesEnemy;
  spanLifesPlayer.innerHTML = lifesPlayer;
}

function createMessage(typeMessage, result) {
  let console = document.getElementById("console");
  let paragraph = document.createElement("p");
  switch (typeMessage) {
    case 1: {
      paragraph.innerHTML =
        "Tú mascota atacó con " +
        attackPlayer +
        ", la mascota del enemigo atacó con " +
        attackEnemy +
        " - " +
        result;
      break;
    }
    case 2: {
      if (result == "perdiste") {
        paragraph.innerHTML = "Perdiste la partida 😢";
      } else if (result == "ganaste") {
        paragraph.innerHTML = "Ganaste la partida 😀🎉";
      } else {
        paragraph.innerHTML = "Sin resultados 🤷‍♂️";
      }
      changeStatusVisible("btn-fire-attack", true);
      changeStatusVisible("btn-water-attack", true);
      changeStatusVisible("btn-earth-attack", true);
      changeDisplay("reset-game", "block");
      break;
    }
    case 3: {
      paragraph.innerHTML = result;
      break;
    }
  }
  console.appendChild(paragraph);
}

function startGame() {
  changeDisplay("select-attack", "none");
  changeDisplay("reset-game", "none");

  let btnPetPlayer = document.getElementById("btn-select-pet");
  btnPetPlayer.addEventListener("click", selectPetPlayer);

  let btnFire = document.getElementById("btn-fire-attack");
  btnFire.addEventListener("click", () => {
    if (document.getElementById("pet-player").innerText != "") {
      attackPlayer = typeAttack(1);
      attackEnemy = typeAttack(random(1, 3));
      resultCombat();
    } else {
      createMessage(3, "Error: Mascota no seleccionada!");
    }
  });

  let btnWater = document.getElementById("btn-water-attack");
  btnWater.addEventListener("click", () => {
    if (document.getElementById("pet-player").innerText != "") {
      attackPlayer = typeAttack(2);
      attackEnemy = typeAttack(random(1, 3));
      resultCombat();
    } else {
      createMessage(3, "Error: Mascota no seleccionada!");
    }
  });

  let btnEarth = document.getElementById("btn-earth-attack");
  btnEarth.addEventListener("click", () => {
    if (document.getElementById("pet-player").innerText != "") {
      attackPlayer = typeAttack(3);
      attackEnemy = typeAttack(random(1, 3));
      resultCombat();
    } else {
      createMessage(3, "Error: Mascota no seleccionada!");
    }
  });

  let btnReset = document.getElementById("btn-reset-game");
  btnReset.addEventListener("click", () => {
    location.reload();
  });
}

window.addEventListener("load", startGame);
