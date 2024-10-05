let points;
let liv;

let prevScrollPos = window.pageYOffset;

window.onscroll = function () {
  let currentScrollPos = window.pageYOffset;

  if (prevScrollPos > currentScrollPos) {
    document.getElementById("navbar").classList.remove("navbar-hidden");
  } else {
    document.getElementById("navbar").classList.add("navbar-hidden");
  }

  prevScrollPos = currentScrollPos;
};

const good1 = document.querySelector("#good_container1");
const good2 = document.querySelector("#good_container2");
const good3 = document.querySelector("#good_container3");
const bad1 = document.querySelector("#bad_container1");
const bad2 = document.querySelector("#bad_container2");
const bad3 = document.querySelector("#bad_container3");

const introMusic = document.querySelector("#introMusic");
const backgroundMusic = document.querySelector("#backgroundMusic");
const tabtMusic = document.querySelector("#tabtMusic");
const vundetMusic = document.querySelector("#vundetMusic");
const aflives = document.querySelector("#aflives");
const lev_med_det = document.querySelector("#lev_med_det");
window.addEventListener("load", sidenVises);

document.addEventListener("DOMContentLoaded", function () {
  // Lydobjekter
  const minkDødSound = document.getElementById("mink_død");
  const spisemakrelSound = document.getElementById("spisemakrel");

  // A-tag
  const muteUnmuteLink = document.getElementById("mute");

  // Initial tilstand: ikke muted
  let isMuted = false;

  // Funktion for at mute og unmute
  function toggleMute() {
    isMuted = !isMuted;

    backgroundMusic.muted = isMuted;
    introMusic.muted = isMuted;
    minkDødSound.muted = isMuted;
    spisemakrelSound.muted = isMuted;

    muteUnmuteLink.textContent = isMuted ? "Unmute" : "Mute";
  }

  muteUnmuteLink.addEventListener("click", toggleMute);
});

function sidenVises() {
  console.log("sidenVises");

  backgroundMusic.pause();
  backgroundMusic.currentTime = 0;

  tabtMusic.pause();
  tabtMusic.currentTime = 0;

  vundetMusic.pause();
  vundetMusic.currentTime = 0;

  document.querySelector("#game_background").classList.add("hide");
  document.querySelector("#game_foreground").classList.add("hide");

  // Skjul andre skærme
  document.querySelector("#level_complete").classList.add("hide");
  document.querySelector("#game_over").classList.add("hide");
  // Vis start skærm
  document.querySelector("#start").classList.remove("hide");
  // Klik på start_knap
  document.querySelector("#start_knap").addEventListener("click", startGame);
  introMusic.play();
  introMusic.volume = 0.12;
  aflives.play();
  aflives.volume = 1;
}

function startGame() {
  console.log("startGame");

  introMusic.pause();
  introMusic.currentTime = 0;

  tabtMusic.pause();
  tabtMusic.currentTime = 0;

  vundetMusic.pause();
  vundetMusic.currentTime = 0;

  const backgroundMusic = document.querySelector("#backgroundMusic");
  backgroundMusic.volume = 0.5;
  backgroundMusic.src = "sounds/spil.mp3";
  backgroundMusic.play();

  document.querySelector("#game_background").classList.remove("hide");
  document.querySelector("#game_foreground").classList.remove("hide");

  //Skjul andre skærme
  document.querySelector("#level_complete").classList.add("hide");
  document.querySelector("#game_over").classList.add("hide");
  document.querySelector("#start").classList.add("hide");

  //Nulstil point og udskriv
  points = 0;
  document.querySelector("#points").textContent = points.toString().padStart(2, "0");

  //reset liv til 3
  liv = 3;
  document.querySelector("#liv").textContent = liv;

  //Start timer
  document.querySelector("#time_sprite").classList.add("time");
  document.querySelector("#time_sprite").addEventListener("animationend", stopSpillet);

  //Giv en random position, start fald-animationer
  good1.classList.add("pos" + nytRand(6), "fald", "delay" + nytRand(4));
  good2.classList.add("pos" + nytRand(6), "fald", "delay" + nytRand(4));
  good3.classList.add("pos" + nytRand(6), "fald", "delay" + nytRand(4));
  //Lyt efter fald-animationer er kørt en gang
  good1.addEventListener("animationiteration", genstartGood);
  good2.addEventListener("animationiteration", genstartGood);
  good3.addEventListener("animationiteration", genstartGood);
  //Lyt efter klik
  good1.addEventListener("mousedown", clickGood);
  good2.addEventListener("mousedown", clickGood);
  good3.addEventListener("mousedown", clickGood);

  //Giv en random position, start fald-animationer
  bad1.classList.add("pos" + nytRand(6), "fald", "delay" + nytRand(4));
  bad2.classList.add("pos" + nytRand(6), "fald", "delay" + nytRand(4));
  bad3.classList.add("pos" + nytRand(6), "fald", "delay" + nytRand(4));
  //Lyt efter fald-animationer er er kørt en gang
  bad1.addEventListener("animationiteration", genstartBad);
  bad2.addEventListener("animationiteration", genstartBad);
  bad3.addEventListener("animationiteration", genstartBad);
  //Lyt efter klik
  bad1.addEventListener("mousedown", clickBad);
  bad2.addEventListener("mousedown", clickBad);
  bad3.addEventListener("mousedown", clickBad);
}

function clickGood() {
  console.log("clickGood");
  //ryd op, så man ikke kan kilkke på den samme flere gange
  this.removeEventListener("mousedown", clickGood);

  //frys (pause), fald-animationen
  this.classList.add("frys");

  //Tæl en op på points og udskriv
  points++;
  document.querySelector("#points").textContent = points.toString().padStart(2, "0");

  //Start forsvind-animationer på sprite element (firstElementChild er sprite elementet)
  this.firstElementChild.classList.add("forsvind_good");

  document.querySelector("#mink_død").currentTime = 0;
  document.querySelector("#mink_død").play();

  //Lyt efter forsvind-animationer er færdig
  this.addEventListener("animationend", genstartGood);
}

function genstartGood() {
  console.log("genstartGood");
  //ryd op, fjern alt er på container og sprite
  this.classList = "";
  this.firstElementChild.classList = "";

  //For at kunne genstarte fald animationen, da vi fjener og tilføjer den i samme function
  this.offsetLeft;

  //Giv en random position til container og fald-animationer på element
  this.classList.add("pos" + nytRand(6), "fald");

  //Lyt efter klik på element
  this.addEventListener("mousedown", clickGood);
}

function clickBad() {
  console.log("clickBad");
  //ryd op, så man ikke kan kilkke på den samme flere gange
  this.removeEventListener("mousedown", clickBad);

  //frys (pause), fald-animationen
  this.classList.add("frys");

  //Start forsvind-animationer på sprite element (firstElementChild er sprite elementet)
  this.firstElementChild.classList.add("forsvind_bad");

  document.querySelector("#spise_makrel").currentTime = 0;
  document.querySelector("#spise_makrel").play();

  //Lyt efter forsvind-animationer er færdig
  this.addEventListener("animationend", genstartBad);

  //Tæl en ned på liv og udskriv
  liv--;
  document.querySelector("#liv").textContent = liv;
  if (liv <= 0) {
    stopSpillet();
  }
}

function genstartBad() {
  console.log("genstartBad");
  //ryd op, fjern alt er på container og sprite
  this.classList = "";
  this.firstElementChild.classList = "";

  //For at kunne genstarte fald animationen, da vi fjener og tilføjer den i samme function
  this.offsetLeft;

  //Giv en random position til container og fald-animationer på element
  this.classList.add("pos" + nytRand(6), "fald");

  //Lyt efter klik på element
  this.addEventListener("mousedown", clickBad);
}

function stopSpillet() {
  console.log("stopSpillet");

  //Stop timer

  document.querySelector("#time_sprite").classList.remove("time");

  //fjern alt er på alle elementers container og sprite
  good1.classList = "";
  good1.firstElementChild.classList = "";
  //fjern alle event listener på alle containere
  good1.removeEventListener("animationiteration", genstartGood);
  good1.removeEventListener("animationend", genstartGood);
  good1.removeEventListener("mousedown", clickGood);

  good2.classList = "";
  good2.firstElementChild.classList = "";
  //fjern alle event listener på alle containere
  good2.removeEventListener("animationiteration", genstartGood);
  good2.removeEventListener("animationend", genstartGood);
  good2.removeEventListener("mousedown", clickGood);

  good3.classList = "";
  good3.firstElementChild.classList = "";
  //fjern alle event listener på alle containere
  good3.removeEventListener("animationiteration", genstartGood);
  good3.removeEventListener("animationend", genstartGood);
  good3.removeEventListener("mousedown", clickGood);

  //fjern alt er på alle elementers container og sprite
  bad1.classList = "";
  bad1.firstElementChild.classList = "";
  //fjern alle event listener på alle containere
  bad1.removeEventListener("animationiteration", genstartBad);
  bad1.removeEventListener("animationend", genstartBad);
  bad1.removeEventListener("mousedown", clickBad);

  bad2.classList = "";
  bad2.firstElementChild.classList = "";
  //fjern alle event listener på alle containere
  bad2.removeEventListener("animationiteration", genstartBad);
  bad2.removeEventListener("animationend", genstartBad);
  bad2.removeEventListener("mousedown", clickBad);

  bad3.classList = "";
  bad3.firstElementChild.classList = "";
  //fjern alle event listener på alle containere
  bad3.removeEventListener("animationiteration", genstartBad);
  bad3.removeEventListener("animationend", genstartBad);
  bad3.removeEventListener("mousedown", clickBad);

  console.log("Points:", points);

  if (liv <= 0) {
    gameover();
  } else if (points >= 20) {
    levelComplete();
  } else {
    gameover();
  }
}

function gameover() {
  console.log();

  backgroundMusic.pause();
  backgroundMusic.currentTime = 0;

  tabtMusic.play();
  tabtMusic.volume = 0.3;

  //Vis gameover skærm
  document.querySelector("#game_over").classList.remove("hide");
  if (liv == 0) {
    document.querySelector("#game_over_points").textContent = `Øv, jeg kan ikke styre mig selv, når der er makrelmadder! ${points} points!`;
  } else {
    document.querySelector("#game_over_points").textContent = `Øv, jeg bliver simpelthen så distraheret af makrelmadder! ${points} points!`;
  }
  document.querySelector("#forside1").addEventListener("click", sidenVises);
  //Klik på genstart1
  document.querySelector("#genstart1").addEventListener("click", startGame);
  lev_med_det.play();
  lev_med_det.volume = 1;
}

function levelComplete() {
  console.log();

  backgroundMusic.pause();
  backgroundMusic.currentTime = 0;

  vundetMusic.play();
  vundetMusic.volume = 0.5;

  //Vis levelComplete skærm
  document.querySelector("#level_complete").classList.remove("hide");
  if (points >= 10) {
    document.querySelector("#level_complete_points").textContent = `Danmark længe leve! ${points} points`;
  }
  document.querySelector("#forside2").addEventListener("click", sidenVises);
  //Klik på genstart2
  document.querySelector("#genstart2").addEventListener("click", startGame);
}
function nytRand(max) {
  return Math.floor(Math.random() * max) + 1;
}
