window.onload = function () {
  const startBtn = document.getElementById("start");
  //const restartButton = document.getElementById("restart-button");
  let game;

  startBtn.addEventListener("click", function () {
    startGame();
  });

  function startGame() {
    game = new Game();
    game.start();
  }

  document.addEventListener("keydown", (event) => {
    if (event.code === "ArrowLeft") {
      // console.log("going left");
      game.player.directionX = -2;
    }
    if (event.code === "ArrowRight") {
      // console.log("going right");
      game.player.directionX = 2;
    }
    if (event.code === "ArrowUp") {
      // console.log("going up");
      game.player.directionY = -2;
    }
    if (event.code === "ArrowDown") {
      // console.log("going down");
      game.player.directionY = 2;
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
