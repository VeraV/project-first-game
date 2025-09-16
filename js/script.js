window.onload = function () {
  const startBtn = document.getElementById("start");
  const restartBtn = document.getElementById("play-again");
  let game;

  startBtn.addEventListener("click", function () {
    startGame();
  });

  restartBtn.addEventListener("click", function () {
    startGame();
  });

  function startGame() {
    game = new Game();
    game.start();
  }

  document.addEventListener("keydown", (event) => {
    if (event.code === "ArrowLeft") {
      // console.log("going left");
      game.player.directionX = -3;
    }
    if (event.code === "ArrowRight") {
      // console.log("going right");
      game.player.directionX = 3;
    }
    if (event.code === "ArrowUp") {
      // console.log("going up");
      game.player.directionY = -3;
    }
    if (event.code === "ArrowDown") {
      // console.log("going down");
      game.player.directionY = 3;
    }
  });

  //this event listener stop the car when a key is released
  document.addEventListener("keyup", (event) => {
    if (event.code === "ArrowLeft") {
      game.player.directionX = 0;
    }
    if (event.code === "ArrowRight") {
      game.player.directionX = 0;
    }
    if (event.code === "ArrowUp") {
      game.player.directionY = 0;
    }
    if (event.code === "ArrowDown") {
      game.player.directionY = 0;
    }
  });
};
