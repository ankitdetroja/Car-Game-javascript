const score = document.querySelector(".score");
const startScreen = document.querySelector(".startScreen");
const gameArea = document.querySelector(".gameArea");
const selmon = document.querySelector(".selmon");
const code = document.querySelector('.code');
let player = {
  speed: 5,
  score: 0,
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

function moveLines() {
  let lines = document.querySelectorAll(".line");
  lines.forEach(function (item) {
    if (item.y > 1050) {
      item.y = item.y - 1200;
    }
    item.y = item.y + player.speed;
    item.style.top = item.y + "px";
  });
}

function isCollide(a, b) {
  let aRect = a.getBoundingClientRect();
  let bRect = b.getBoundingClientRect();

  return !(
    (aRect.bottom < bRect.top) || (aRect.top > bRect.bottom) || (aRect.left > bRect.right) || (aRect.right < bRect.left)
  )

}

function endGame() {
  player.start = false;
  score.innerHTML = "Game Over <br> Score: " + player.score;
  selmon.classList.remove('hide');
  startScreen.classList.remove('hide');
  startScreen.innerText = 'RESTART';
  startScreen.style.color = 'white';
}

function moveEnemy(car) {
  let ele = document.querySelectorAll(".enemy");
  ele.forEach(function (item) {
    if (isCollide(car, item)) {
      console.log('Selmon Bhoi is Here!');
      endGame();
    }
    if (item.y > 1050) {
      item.y = item.y - 1200;
      item.style.left = Math.floor(Math.random() * 450) + 'px';
    }
    item.y = item.y + player.speed;
    item.style.top = item.y + "px";
  });
}

function playgame() {
  let car = document.querySelector(".car");
  moveLines();
  moveEnemy(car);
  let road = gameArea;
  if (player.start) {
    if (keys.ArrowUp && car.offsetTop > 510) {
      player.y -= player.speed;
    }
    if (keys.ArrowDown && car.offsetTop < 830) {
      player.y += player.speed;
    }
    if (keys.ArrowRight && car.offsetLeft < 446) {
      player.x += player.speed;
    }
    if (keys.ArrowLeft && car.offsetLeft > 0) {
      player.x -= player.speed;
    }
    car.style.left = player.x + "px";
    car.style.top = player.y + "px";
    window.requestAnimationFrame(playgame);
    player.score++;
    score.innerText = "Score: " + player.score;
    score.style.top = 30 + 'px';
    score.style.left = '50px';
    score.style.padding = '20px 50px';
    score.style.boxShadow = "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,rgba(0, 0, 0, 0.08) 0px 0px 0px 1px";


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

function start() {
  // console.log("clicked");
  startScreen.classList.add("hide");
  gameArea.classList.remove("hide");
  selmon.classList.add('hide');
  code.classList.add('hide');
  gameArea.innerHTML = '';
  player.start = true;
  player.score = 0;
  for (let x = 0; x < 10; x++) {
    let div = document.createElement("div");
    div.classList.add("line");
    div.y = x * 150;
    div.style.top = (x * 150) + "px";
    gameArea.appendChild(div);
  }
  let car = document.createElement("div");
  car.setAttribute("class", "car");
  // car.innerText = "Car";
  gameArea.appendChild(car);
  player.x = car.offsetLeft;
  player.y = car.offsetTop;
  window.requestAnimationFrame(playgame);

  for (let x = 0; x < 6; x++) {
    let enemy = document.createElement("div");
    enemy.classList.add("enemy");
    enemy.y = ((x + 1) * 1000) * -1;
    enemy.style.left = Math.floor(Math.random() * 450) + 'px';
    enemy.style.top = enemy.y + "px";
    gameArea.appendChild(enemy);
  }
}
