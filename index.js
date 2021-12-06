const score = document.querySelector(".score");
const startScreen = document.querySelector(".startScreen");
const gameArea = document.querySelector(".gameArea");

let player = {
  speed: 5,
  x: 0,
  y: 0,
  start: false,
};

let keys = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowRight: false,
  ArrowLeft: false,
};

startScreen.addEventListener("click", start);
document.addEventListener("keydown", pressOn);
document.addEventListener("keyup", pressOff);

function playgame() {
  console.log("inplay");
  if (player.start) {
    if (keys.ArrowUp) {
      player.y += player.speed;
    }
    if (keys.ArrowDown) {
      player.y -= player.speed;
    }
    if (keys.ArrowRight) {
      player.x += player.speed;
    }
    if (keys.ArrowLeft) {
      player.x -= player.speed;
    }
    car.style.left = player.x;
    car.style.top = player.y;
    window.requestAnimationFrame(playgame);
  }
}

function pressOn(e) {
  e.preventDefault();
  keys[e.key] = true;
  // console.log(keys);
}

function pressOff(e) {
  e.preventDefault();
  keys[e.key] = false;
  // console.log(keys);
}

let car = document.createElement("div");
function start() {
  // console.log("clicked");
  startScreen.classList.add("hide");
  gameArea.classList.remove("hide");
  player.start = true;
  car.setAttribute("class", "car");
  car.innerText = "Car";
  gameArea.appendChild(car);
  player.x = car.offsetLeft;
  player.y = car.offsetTop;
  console.log(player);
  window.requestAnimationFrame(playgame);
}
