const start_game = document.querySelector("#start_game");

function selectionRandom(min,max){
    return Math.floor(Math.random()*(max-min+1)+1) + "";
}

function selection(move){
    let result="";
    switch(move){
        case "1":{
            result="piedra";
            break;
        }
        case "2":{
            result="papel";
            break;
        }
        case "3":{
            result="tijera";
            break;
        }
        default: {
            result="PERDER!!!";
        }
    }
    return result;
}

start_game.addEventListener("click", () => {
    let min=1;
    let max=3;
    let player=0;
    let website=0;
    let wins=0;
    let lose=0;
    while(wins<3 && lose<3){
        website=selectionRandom(min,max);
        player=prompt("Elije: 1 para piedra, 2 para papel o 3 para tijera");

        alert("Usted eligió: " + selection(player));
        alert("Website eligió: " + selection(website));

        if(website==player){
            alert("Empate!");
        }else if(player==1 && website==3){
            alert("Ganaste mi king con cara de kong!");
            wins++;
        }else if(player==2 && website==1){
            alert("Ganaste mi king con cara de kong!");
            wins++;
        }else if(player==3 && website==2){
            alert("Ganaste mi king con cara de kong!");
            wins++;
        }else{
            alert("Perdiste pipipi :(");
            lose++;
        }
        
        alert("Llevas " + wins + " ganadas y " + lose + " perdidas");
    }
  });