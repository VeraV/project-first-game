class Activity {
  constructor(
    gameScreen,
    width,
    height,
    imgSrc,
    energyLevel,
    resilienceLevel,
    moneyLevel,
    timeLevel
  ) {
    this.gameScreen = gameScreen;
    this.left = 1350; //the initial horizontal position of the obstacle.
    this.top = Math.ceil(Math.random() * 540 + 100); //randomly generated number representing the vertical position of the activity element.
    this.width = width; //the width of activity icon
    this.height = height; //the height of activity icon

    this.activityImg = document.createElement("img");
    this.activityImg.src = imgSrc; //"./images/redCar.png";
    this.activityImg.style.position = "absolute";
    this.activityImg.style.width = `${this.width}px`;
    this.activityImg.style.height = `${this.height}px`;
    this.activityImg.style.left = `${this.left}px`;
    this.activityImg.style.top = `${this.top}px`;

    this.gameScreen.appendChild(this.activityImg);

    this.energyLevel = energyLevel;
    this.resilienceLevel = resilienceLevel;
    this.moneyLevel = moneyLevel;
    this.timeLevel = timeLevel;
  }

  updatePosition() {
    // Update the obstacle's position based on the properties left and top
    this.activityImg.style.left = `${this.left}px`;
    this.activityImg.style.top = `${this.top}px`;
  }

  move() {
    // Move the activity icon to left by 3px
    this.left -= 3;
    // Update the obstacle's position on the screen
    this.updatePosition();
  }
}

class ExtraWork extends Activity {
  constructor(gameScreen) {
    const imgSrc = "/project-first-game/assets/more-money.png";
    const width = 50;
    const height = 60;

    /*the score changes*/
    const energyLevel = -20;
    const resilienceLevel = 10;
    const moneyLevel = 100;
    const timeLevel = -30;

    super(
      gameScreen,
      width,
      height,
      imgSrc,
      energyLevel,
      resilienceLevel,
      moneyLevel,
      timeLevel
    );

    this.name = "Extra work";
  }
}

class GoodSleep extends Activity {
  constructor(gameScreen) {
    const imgSrc = "/project-first-game/assets/bed.png";
    const width = 120;
    const height = 90;

    /*the score changes*/
    const energyLevel = 20;
    const resilienceLevel = 10;
    const moneyLevel = 0;
    const timeLevel = -10;

    super(
      gameScreen,
      width,
      height,
      imgSrc,
      energyLevel,
      resilienceLevel,
      moneyLevel,
      timeLevel
    );

    this.name = "Good Sleep";
  }
}

class Sports extends Activity {
  constructor(gameScreen) {
    const imgSrc = "/project-first-game/assets/gym.png";
    const width = 70;
    const height = 50;

    /*the score changes*/
    const energyLevel = -10;
    const resilienceLevel = 10;
    const moneyLevel = -10;
    const timeLevel = -10;

    super(
      gameScreen,
      width,
      height,
      imgSrc,
      energyLevel,
      resilienceLevel,
      moneyLevel,
      timeLevel
    );

    this.name = "Sports";
  }
}

class Friends extends Activity {
  constructor(gameScreen) {
    const imgSrc = "/project-first-game/assets/friends.png";
    const width = 120;
    const height = 100;

    /*the score changes*/
    const energyLevel = 30;
    const resilienceLevel = 20;
    const moneyLevel = -10;
    const timeLevel = -20;

    super(
      gameScreen,
      width,
      height,
      imgSrc,
      energyLevel,
      resilienceLevel,
      moneyLevel,
      timeLevel
    );

    this.name = "Friends";
  }
}

class Conflict extends Activity {
  constructor(gameScreen) {
    const imgSrc = "/project-first-game/assets/conflict.png";
    const width = 120;
    const height = 80;

    /*the score changes*/
    const energyLevel = -40;
    const resilienceLevel = 10;
    const moneyLevel = 0;
    const timeLevel = 0;

    super(
      gameScreen,
      width,
      height,
      imgSrc,
      energyLevel,
      resilienceLevel,
      moneyLevel,
      timeLevel
    );

    this.name = "Conflict";
  }
}

class Vacation extends Activity {
  constructor(gameScreen) {
    const imgSrc = "/project-first-game/assets/island.png";
    const width = 150;
    const height = 140;

    /*the score changes*/
    const energyLevel = 100;
    const resilienceLevel = 30;
    const moneyLevel = -100;
    const timeLevel = -100;

    super(
      gameScreen,
      width,
      height,
      imgSrc,
      energyLevel,
      resilienceLevel,
      moneyLevel,
      timeLevel
    );

    this.name = "Vacation";
  }
}

class Crowd extends Activity {
  constructor(gameScreen) {
    const imgSrc = "/project-first-game/assets/crowd.png";
    const width = 130;
    const height = 100;

    /*the score changes*/
    const energyLevel = -40;
    const resilienceLevel = 10;
    const moneyLevel = 0;
    const timeLevel = -10;

    super(
      gameScreen,
      width,
      height,
      imgSrc,
      energyLevel,
      resilienceLevel,
      moneyLevel,
      timeLevel
    );

    this.name = "Crowd";
  }
}
