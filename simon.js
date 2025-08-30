let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");
const levelLabel = document.getElementById("level-label");
const highscoreEl = document.getElementById("highscore");
const messageEl = document.getElementById("message");

let best = parseInt(localStorage.getItem("simonBest") || "0");
if (highscoreEl) {
  highscoreEl.textContent = `Best: ${best}`;
}

const levelMessages = [
  "We got this, my love! 💖✨",
  "Your memory shines brighter than stars ✨🌙",
  "I adore your focus 😘🎯",
  "You + Me = Unbeatable team 💑💪",
  "That was flawless! 🌟💗",
  "Sweet and smart, just like you 🍬🌸",
  "You make my heart say beep-boop 💓🤖",
  "Cutest champion alert! 🏆🐻",
  "Our love levels up together 💞🎮",
  "You're magic, babe ✨🧚"
];

function getLevelMessage(lv){
  if (lv <= 0) return "Press any key to start 💝";
  const msg = levelMessages[(lv - 1) % levelMessages.length];
  return `Level ${lv}: ${msg}`;
}

function startGame(){
  if (started === false) {
    console.log("Game is started");
    started = true;
    levelUp();
  }
}

document.addEventListener("keypress", function () {
  startGame();
});

// Start on touch/click (mobile friendly). Ignore taps on game buttons to avoid accidental input on first move.
document.addEventListener("pointerdown", function(e){
  const isButton = e.target && typeof e.target.closest === "function" && e.target.closest(".btn");
  if (!isButton) {
    startGame();
  }
});

function gameFlash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 200);
}
function userFlash(btn) {
  btn.classList.add("userflash");
  setTimeout(function () {
    btn.classList.remove("userflash");
  }, 200);
}

function levelUp() {
  userSeq = [];
  level++;
  h2.innerText = `Level ${level}`;
  if (levelLabel) levelLabel.textContent = `Level ${level}`;
  if (messageEl) messageEl.textContent = getLevelMessage(level);

  //random button choose
  let randIdx = Math.floor(Math.random() * btns.length);
  let randColor = btns[randIdx];
  let randBtn = document.querySelector(`.${randColor}`);
  // console.log(randIdx);
  // console.log(randColor);
  // console.log(randBtn);
  gameSeq.push(randColor);
  console.log(gameSeq);
  gameFlash(randBtn);
}

function checkAns(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length == gameSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    const score = level;
    if (score > best) {
      best = score;
      localStorage.setItem("simonBest", String(best));
    }
    if (highscoreEl) highscoreEl.textContent = `Best: ${best}`;
    h2.innerHTML = `Game Over 💗 Not the end, just a hug break! 🤗<br>Your score: <b>${score}</b> • Best: <b>${best}</b><br>Press any key to try again 🌷`;
    if (levelLabel) levelLabel.textContent = `Level ${level}`;
    if (messageEl) messageEl.textContent = "I believe in you, sweetheart 💞 You’re doing amazing! 🌟";
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function(){
      document.querySelector("body").style.backgroundColor = "white";
    }, 300);
    reset();
  }
}

function btnPress() {
  // console.log(this);
  let btn = this;
  userFlash(btn);

  userColor = btn.getAttribute("id");
  userSeq.push(userColor);
  checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
  btn.addEventListener("click", btnPress);
}

function reset(){
  started = false;
  userSeq = [];
  gameSeq = [];
  level = 0;
}