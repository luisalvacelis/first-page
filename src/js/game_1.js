const start_game = document.querySelector("#start_game");

function aleatorio(min,max){
    return Math.floor(Math.random()*(max-min+1)+1);
}
start_game.addEventListener("click", () => {
    let min=1;
    let max=3;
    let website=aleatorio(min,max);
    let player=0;
    player=prompt("Elije: 1 para piedra, 2 para papel o 3 para tijera");
    switch(player){
        case "1":{
            alert("Escojiste piedra");
            break;
        }
        case "2":{
            alert("Escojiste papel");
            break;
        }
        case "3":{
            alert("Escojiste tijera");
            break;
        }
        default: {
            alert("Elegiste PERDER!!!");
        }
    }

    switch(website){
        case 1:{
            alert("Website eligió piedra");
            break;
        }
        case 2:{
            alert("Website eligió papel");
            break;
        }
        case 3:{
            alert("Website eligió tijera");
            break;
        }
        default: {
            alert("Website eligió PERDER!!!");
        }
    }

    if(website==player){
        alert("Empate!");
    }else if(player==1 && website==3){
        alert("Ganaste mi king con cara de kong!");
    }else if(player==2 && website==1){
        alert("Ganaste mi king con cara de kong!");
    }else if(player==3 && website==2){
        alert("Ganaste mi king con cara de kong!");
    }else{
        alert("Perdiste pipipi :(");
    }
  });