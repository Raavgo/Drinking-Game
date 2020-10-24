let card =  $( "#flipListener" )

jQuery(document).ready(function($){
	$('.card-flip').click('click', toggle);
});

async function toggle() {

  let randint = getRandomInt(0, 10, 0);
  const myStorage = window.sessionStorage;
  let side = myStorage.getItem("side");

  if (side === "front") {
    myStorage.setItem("side", "back");
	$("#back-title").text(await buildHTML(randint));
  }
  
  if (side === "back") {
    myStorage.setItem("side", "front");
	$("#front-title").text(await buildHTML(randint));
  }
	$( this ).closest(".card").toggleClass( "flip" );
  //card.classList.toggle('.card-flip');
}


function getRandomInt(min, max, i) {
  let cleanedInt = Math.floor(Math.random() * (max - min)) + min;

  const myStorage = window.sessionStorage;
  let usedIds = myStorage.getItem("usedIds");
  if (usedIds == "null") {
    myStorage.setItem("usedIds", cleanedInt)
    return cleanedInt;

  } else {
    let arr = usedIds.split(",")
    console.log(i)
    if (arr.includes(cleanedInt.toString())) {
      if (i <= 100)
        return getRandomInt(min, max, ++i);
      else
        return -2;
    } else {
      myStorage.setItem("usedIds", usedIds + "," + cleanedInt)
      return cleanedInt
    }
  }
}

async function restart() {
  const myStorage = window.sessionStorage;
  let front_title = document.getElementById("front-title")
  let front_text = document.getElementById("front-text")
  let back_title = document.getElementById("back-title")
  let back_text = document.getElementById("back-text")

  if (myStorage.getItem("side") == "back") {
    myStorage.setItem("side", "front");
	front_title.innerHTML = "Start";
	front_text.innerHTML = "Drücke auf die Karte um das Spiel zu starten";
    card.toggleClass( "card-flip" );
  } else if (myStorage.getItem("side") == "front") {
    myStorage.setItem("side", "back");
    back_title.innerHTML = "Start";
	back_text.innerHTML = "Drücke auf die Karte um das Spiel zu starten";
    card.toggleClass( "card-flip" );
  }

  myStorage.setItem("usedIds", null)
}

async function buildHTML(id) {
  if (id >= 0)
    return `<h3>Ich hab noch nie!</h3><p>Ich habe noch nie versucht etwas zu kaufen für das ich mich geschämt habe und bin daher unauffällig durch die Regale geschlendert um nicht aufzufallen</p>`;
  else  if(id == -1)
          return `<h3>Start</h3><p>Drücke auf die Karte um das Spiel zu starten</p>`;
        else if(id == -2)
        	  return `<h3>Fertig</h3><p>Drücke auf Neu Starten um nochmal zu spielen</p>`;
}

window.onload = async function() {
	const myStorage = window.sessionStorage;
	let front_title = document.getElementById("front-title")
	let front_text = document.getElementById("front-text")
	front_title.innerHTML = "Start";
	front_text.innerHTML = "Drücke auf die Karte um das Spiel zu starten";
	myStorage.setItem("side", "front");
	myStorage.setItem("usedIds", null)
}
