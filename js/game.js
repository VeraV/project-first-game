class Game {
  constructor() {
    this.startScreen = document.getElementById("start-screen");
    this.gameScreen = document.getElementById("main-screen");
    this.finishScreen = document.getElementById("finish-screen");

    this.gameIntervalId;

    this.player = this.player = new Player(this.gameScreen, 200, 500);

    this.activities = []; //array of work-life activities

    /*stats values*/
    this.energyLevel = 1000; //initial value for the game
    this.resilienceLevel = 2; //initial value for the game
    this.timeLevel = 1000; //initial value for the game
    this.moneyLevel = 1000; //initial value for the game

    this.energyLevelElement = document.getElementById("energy-level");
    this.resilienceLevelElement = document.getElementById("resilience-level");
    this.moneyLevelElement = document.getElementById("money-level");
    this.timeLevelElement = document.getElementById("time-level");

    this.gameIsOver = false;

    this.gameLoopFrecuency = Math.round(1000 / 60);
    this.frame = 0;
  }

  start() {
    this.addRandomActivity();
    //Sets the height and width of the game screen.
    this.startScreen.style.display = "none";
    this.gameScreen.style.display = "flex";
    this.gameIntervalId = setInterval(() => {
      this.gameLoop();
    }, this.gameLoopFrecuency);
  }

  gameLoop() {
    this.frame++;
    this.update();
    if (this.gameIsOver) {
      clearInterval(this.gameIntervalId);
    }
  }

  update() {
    this.player.move();

    //this moves all the activity icons
    for (let i = 0; i < this.activities.length; i++) {
      const activity = this.activities[i];
      activity.move();

      //if the activity goes off the screen on the left...
      //splice from array, and remove the element
      if (activity.left < 0) {
        this.activities.splice(i, 1);
        //dont forget to remove the element from the DOM
        activity.activityImg.remove();
        /*no changes in the stats if no activity was chosen*/
      }

      //check if the girl chose the activity
      if (this.player.didChoose(activity)) {
        //remove the activity from js array with .splice
        this.activities.splice(i, 1);
        //remove the DOM img from the game screen
        activity.activityImg.remove();

        /******stats changes*******/
        this.energyLevel += activity.energyLevel;
        this.resilienceLevel += activity.resilienceLevel;
        this.moneyLevel += activity.moneyLevel;
        this.timeLevel += activity.timeLevel;

        /*UPDATE THE STATS HTML*/
        this.updateStats();

        //*check if the game is over*/
        this.checkIfGameIsOver();
      }
    }

    //this will control how ofter an obstacle is added
    if (this.frame % 200 === 0) {
      this.addRandomActivity();
    }
  }

  checkIfGameIsOver() {
    this.gameIsOver =
      this.energyLevel === 0 || this.moneyLevel === 0 || this.timeLevel === 0; //energy, money or time is finished
  }

  addRandomActivity() {
    /*randomly create one of the 7 activities*/
    const randomNum = Math.ceil(Math.random() * 7);
    let activity = null;

    switch (randomNum) {
      case 1:
        activity = new ExtraWork(this.gameScreen);
        break;
      case 2:
        activity = new GoodSleep(this.gameScreen);
        break;
      case 3:
        activity = new Sports(this.gameScreen);
        break;
      case 4:
        activity = new Friends(this.gameScreen);
        break;
      case 5:
        activity = new Conflict(this.gameScreen);
        break;
      case 6:
        activity = new Vacation(this.gameScreen);
        break;
      case 7:
        activity = new Crowd(this.gameScreen);
        break;
    }
    this.activities.push(activity);
  }

  updateStats() {
    this.energyLevelElement.innerText = this.energyLevel;
    this.resilienceLevelElement.innerText = this.resilienceLevel;
    this.moneyLevelElement.innerText = this.moneyLevel;
    this.timeLevelElement.innerText = this.timeLevel;
  }

  timeFormat() {
    this.timeLevel / 60
  }

}
