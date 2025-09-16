class Player {
  constructor(gameScreen, left, top) {
    this.gameScreen = gameScreen;
    this.left = left;
    this.top = top;
    this.width = 50;
    this.height = 140;
    this.directionX = 0;
    this.directionY = 0;

    this.imgElemet = document.createElement("img");
    this.imgElemet.src = "/assets/player.png";
    this.imgElemet.style.position = "absolute";
    // Set up the default element's property values
    this.imgElemet.style.width = `${this.width}px`;
    this.imgElemet.style.height = `${this.height}px`;
    this.imgElemet.style.left = `${left}px`;
    this.imgElemet.style.top = `${top}px`;

    this.gameScreen.appendChild(this.imgElemet);
  }

  move() {
    // Update player's car position based on directionX and directionY
    this.left += this.directionX;
    this.top += this.directionY;

    // Ensure the player's car stays within the game screen
    // handles left hand side
    if (this.left < 10) {
      this.left = 10;
    }

    // handles top side
    if (this.top < 110) {
      this.top = 110;
    }

    // handles right hand side
    if (this.left > this.gameScreen.offsetWidth - this.width - 10) {
      this.left = this.gameScreen.offsetWidth - this.width - 10;
    }

    // handles bottom side
    if (this.top > this.gameScreen.offsetHeight - this.height - 10) {
      this.top = this.gameScreen.offsetHeight - this.height - 10;
    }

    // Update the player's car position on the screen
    this.updatePosition();
  }

  updatePosition() {
    this.imgElemet.style.left = `${this.left}px`;
    this.imgElemet.style.top = `${this.top}px`;
  }

  didChoose(activity) {
    const playerRect = this.imgElemet.getBoundingClientRect();
    const activityRect = activity.activityImg.getBoundingClientRect();

    return (
      playerRect.left < activityRect.right &&
      playerRect.right > activityRect.left &&
      playerRect.top < activityRect.bottom &&
      playerRect.bottom > activityRect.top
    );
  }
}
