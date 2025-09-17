class Activity {
  constructor(
    gameScreen,
    width,
    height,
    imgSrc,
    energyLevel,
    isChallenging,
    moneyLevel,
    timeLevel
  ) {
    this.gameScreen = gameScreen;
    this.left = 1350; //the initial horizontal position of the obstacle.
    this.top = Math.ceil(Math.random() * 540 + 100); //randomly generated number representing the vertical position of the activity element.
    this.width = width; //the width of activity icon
    this.height = height; //the height of activity icon

    this.activityImg = document.createElement("img");
    this.activityImg.src = imgSrc;
    this.activityImg.style.position = "absolute";
    this.activityImg.style.width = `${this.width}px`;
    this.activityImg.style.height = `${this.height}px`;
    this.activityImg.style.left = `${this.left}px`;
    this.activityImg.style.top = `${this.top}px`;

    this.gameScreen.appendChild(this.activityImg);

    this.energyLevel = energyLevel;
    this.moneyLevel = moneyLevel;
    this.timeLevel = timeLevel;
    this.isChallenging = isChallenging;
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
    const imgSrc = "assets/more-money.png";
    const width = 50;
    const height = 60;

    /*the score changes*/
    const energyLevel = 20; // will reduce energy isChallenging
    const moneyLevel = 36; // 12 euro per hour x 3 hour = 36 euro
    const timeLevel = -3;

    super(
      gameScreen,
      width,
      height,
      imgSrc,
      energyLevel,
      true, //challenging activity
      moneyLevel,
      timeLevel
    );

    this.name = "Extra work";
  }
}

class GoodSleep extends Activity {
  constructor(gameScreen) {
    const imgSrc = "assets/bed.png";
    const width = 120;
    const height = 90;

    /*the score changes*/
    const energyLevel = 30;
    const moneyLevel = 0;
    const timeLevel = -8;

    super(
      gameScreen,
      width,
      height,
      imgSrc,
      energyLevel,
      false, //not a challenging activity
      moneyLevel,
      timeLevel
    );

    this.name = "Good Sleep";
  }
}

class Sports extends Activity {
  constructor(gameScreen) {
    const imgSrc = "assets/gym.png";
    const width = 70;
    const height = 50;

    /*the score changes*/
    const energyLevel = 10; // will reduce energy isChallenging
    const moneyLevel = -5; //5 euro per hour normal for Lisbon
    const timeLevel = -2; //1 hour of gym + 1 hour for get there and come back

    super(
      gameScreen,
      width,
      height,
      imgSrc,
      energyLevel,
      true, //challenging activity
      moneyLevel,
      timeLevel
    );

    this.name = "Sports";
  }
}

class Friends extends Activity {
  constructor(gameScreen) {
    const imgSrc = "assets/friends.png";
    const width = 120;
    const height = 100;

    /*the score changes*/
    const energyLevel = 20;
    const moneyLevel = -30; //30 euros for restauramt or visit something in the town
    const timeLevel = -2;

    super(
      gameScreen,
      width,
      height,
      imgSrc,
      energyLevel,
      false, //not a challenging activity
      moneyLevel,
      timeLevel
    );

    this.name = "Friends";
  }
}

class Conflict extends Activity {
  constructor(gameScreen) {
    const imgSrc = "assets/conflict.png";
    const width = 120;
    const height = 80;

    /*the score changes*/
    const energyLevel = 15; // will reduce energy isChallenging
    const moneyLevel = 0;
    const timeLevel = -1;

    super(
      gameScreen,
      width,
      height,
      imgSrc,
      energyLevel,
      true, //challenging activity
      moneyLevel,
      timeLevel
    );

    this.name = "Conflict";
  }
}

class Vacation extends Activity {
  constructor(gameScreen) {
    const imgSrc = "assets/island.png";
    const width = 150;
    const height = 140;

    /*the score changes*/
    const energyLevel = 80;
    const moneyLevel = -1000; // 1000 euro for a good 2 weeks vacation
    const timeLevel = -336; //2 weeks (24 hours x 7 days x 2 weeks = 336 hours)

    super(
      gameScreen,
      width,
      height,
      imgSrc,
      energyLevel,
      false, //not a challenging activity
      moneyLevel,
      timeLevel
    );

    this.name = "Vacation";
  }
}

class Crowd extends Activity {
  constructor(gameScreen) {
    const imgSrc = "assets/crowd.png";
    const width = 130;
    const height = 100;

    /*the score changes*/
    const energyLevel = 15; // will reduce energy isChallenging
    const moneyLevel = 0;
    const timeLevel = -2;

    super(
      gameScreen,
      width,
      height,
      imgSrc,
      energyLevel,
      true, //challenging activity
      moneyLevel,
      timeLevel
    );

    this.name = "Crowd";
  }
}
