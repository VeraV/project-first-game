class Game {
  constructor() {
    this.startScreen = document.getElementById("start-screen");
    this.gameScreen = document.getElementById("main-screen");
    this.finishScreen = document.getElementById("finish-screen");

    this.gameIntervalId;
    this.timeReduceIntervalId;
    this.moneyUpIntervalId;

    this.player = this.player = new Player(this.gameScreen, 200, 500);

    this.activities = []; //array of work-life activities

    /*stats values*/
    this.energyLevel = 50; //initial value for the game
    this.resilienceLevel = 0; //initial value for the game
    this.timeLevel = 1000; //365 * 24; //initial value for the game, 1 year
    this.moneyLevel = 2400; //initial value for the game

    this.progressBar = document.querySelector("#progressBar");
    this.resilienceLevelElement = document.getElementById("resilience-level");
    this.moneyLevelElement = document.getElementById("money-level");
    this.timeLevelElement = document.getElementById("time-level");

    /*game results*/
    this.energyResultElement = document.getElementById("energy-result");
    this.progressBarResult = document.querySelector("#progressBarResult");
    this.resilienceResultElement = document.getElementById("resilience-result");
    this.moneyResultElement = document.getElementById("money-result");
    this.timeResultElement = document.getElementById("time-result");

    this.gameIsOver = false;

    this.gameLoopFrecuency = Math.round(1000 / 60);
    this.frame = 0;
  }

  start() {
    this.addRandomActivity();
    //Sets the height and width of the game screen.
    this.startScreen.style.display = "none";
    this.finishScreen.style.display = "none";
    this.gameScreen.style.display = "flex";
    this.gameIntervalId = setInterval(() => {
      this.gameLoop();
    }, this.gameLoopFrecuency);

    //start time reduce (1 sec = 1 hour for the game)
    this.timeReduceIntervalId = setInterval(() => {
      this.timeLevel--;
      this.updateStats();
    }, 1000);

    //start money increase (girl has a stable job, she works 8 hours per day, her Hourly Pay Rate = €12, salary around €2000 per month)
    //BUT we can't add EACH hour €12 (only each 8 hours per day) => €12 x 8h = €96 per day
    //interval for timer: 1 day = 24 hours = 24 sec (=24000 in code)
    //OR better if we see the change faster => €12 / 24h
    this.moneyUpIntervalId = setInterval(() => {
      this.moneyLevel += 0.5;
      this.updateStats();
    }, 1000);

    this.updateStats();
  }

  gameLoop() {
    this.frame++;
    this.update();
    if (this.gameIsOver) {
      clearInterval(this.gameIntervalId);
      clearInterval(this.timeReduceIntervalId);
      clearInterval(this.moneyUpIntervalId);
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
        //logic a bit complecated, that's why it's in a separate method
        this.setEnergyResilienseLevels(activity);
        this.moneyLevel += activity.moneyLevel;
        this.timeLevel += activity.timeLevel;

        /*update the stats HTML*/
        this.updateStats();

        //*check if the game is over*/
        this.checkIfGameIsOver();

        if (this.gameIsOver) {
          this.gameOver();
        }
      }
    }

    //this will control how ofter an obstacle is added
    if (this.frame % 100 === 0) {
      this.addRandomActivity();
    }
  }

  checkIfGameIsOver() {
    this.gameIsOver =
      this.energyLevel <= 0 || this.moneyLevel <= 0 || this.timeLevel <= 0; //energy, money or time is finished
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
    //this.energyLevelElement.innerText = this.energyLevel;
    this.resilienceLevelElement.innerText = this.resilienceLevel;
    this.moneyLevelElement.innerText = this.moneyFormat();
    this.timeLevelElement.innerText = this.timeFormat();

    this.progressBar.style.width = `${this.energyLevel}%`;
    this.makeEnergyProgressBarNice(this.progressBar);
  }

  makeEnergyProgressBarNice(progressBar) {
    progressBar.style.width = `${this.energyLevel}%`;
    progressBar.style.display = "block";
    //apply different color (class) to the progress bar
    switch (true) {
      case this.energyLevel > 0 && this.energyLevel <= 20:
        progressBar.classList.add("dangerous-zone");
        progressBar.classList.remove("normal-zone");
        progressBar.classList.remove("exellent-zone");
        break;
      case this.energyLevel > 20 && this.energyLevel <= 80:
        progressBar.classList.remove("dangerous-zone");
        progressBar.classList.add("normal-zone");
        progressBar.classList.remove("exellent-zone");
        break;
      case this.energyLevel > 80:
        progressBar.classList.remove("dangerous-zone");
        progressBar.classList.remove("normal-zone");
        progressBar.classList.add("exellent-zone");
        break;
    }
  }

  gameOver() {
    //hide the game screen
    this.gameScreen.style.display = "none";
    //show the game over screen
    this.finishScreen.style.display = "block";
    //remove the player from the game screen
    this.player.imgElemet.remove();
    //remove all the objects left
    this.activities.forEach((activity) => {
      activity.activityImg.remove();
    });

    //update result elements on the finish screen
    if (this.energyLevel <= 0) {
      this.energyResultElement.innerText = "No energy left...";
      this.energyResultElement.classList.add("dangerous-zone");
      this.progressBarResult.parentElement.style.display = "none";
    } else {
      this.energyResultElement.innerText = "Energy:";
      this.progressBarResult.parentElement.style.display = "block";
      this.makeEnergyProgressBarNice(this.progressBarResult);
      this.energyResultElement.classList.remove("dangerous-zone");
    }

    this.resilienceResultElement.innerText = this.resilienceLevel;

    if (this.moneyLevel <= 0) {
      this.moneyResultElement.innerText = "No money left...";
      this.moneyResultElement.classList.add("dangerous-zone");
    } else {
      this.moneyResultElement.innerText = `Money: ${this.moneyFormat()}`;
      this.moneyResultElement.classList.remove("dangerous-zone");
    }

    if (this.timeLevel <= 0) {
      this.timeResultElement.innerText = "No time left...";
      this.timeResultElement.classList.add("dangerous-zone");
    } else {
      this.timeResultElement.innerText = `Time: ${this.timeFormat()}`;
      this.timeResultElement.classList.remove("dangerous-zone");
    }
  }

  setEnergyResilienseLevels(activity) {
    /*There are 3 ares for energy level:
    0-20% is DANGEROUS and resilience doesn't help here at all, 
          also reduces resilience itself by (1)
    20%-80% is OK and resilience can help to loose less energy for challenging activities,
          also increases resilience by (1) if it's challenging activity
    80%-100% is EXELLENT and resilience can help to loose (twice) less energy for challenging activities,        
          also increases resilience by (1) 
    100% -- player won! (if money > 0 and time > 0). */

    //if activity is challenging -- apply complecated logic
    if (activity.isChallenging) {
      //check the current state of energy with which we faced the challenge
      if (this.energyLevel > 0 && this.energyLevel <= 20) {
        //dangerous state
        this.energyLevel -= activity.energyLevel;
        if (this.resilienceLevel > 0) {
          //to avoid dividing by 0 can be 0, can't be -1
          this.resilienceLevel -= 1;
        }
      } else if (this.energyLevel > 20 && this.energyLevel <= 80) {
        //ok state
        this.energyLevel -= Math.round(
          activity.energyLevel / (this.resilienceLevel * 0.1 + 1)
        ); //to avoid dividing by 0
        this.resilienceLevel += 1;
        //exellent state
      } else if (this.energyLevel > 80 && this.energyLevel <= 100) {
        this.energyLevel -= Math.round(
          activity.energyLevel / (this.resilienceLevel * 0.5 + 1)
        );
        this.resilienceLevel += 1;
      }

      //if activity is NOT challenging -- just add energy (no changes for resilience)
    } else {
      this.energyLevel += activity.energyLevel;
      if (this.energyLevel > 100) this.energyLevel = 100; //let's say energy level can't be more then 100
    }
  }

  timeFormat() {
    const days = Math.floor(this.timeLevel / 24);
    const hours = this.timeLevel % 24;
    let formattedDays = "";
    let formattedHours = "";
    let formattedTime = "";

    if (days > 1) {
      formattedDays = `${days} days `;
    } else if (days === 1) {
      formattedDays = `${days} day `;
    } else formattedDays = ``;

    if (hours > 1) {
      formattedHours = `${hours} hours`;
    } else if (hours === 1) {
      formattedHours = `${hours} hour`;
    } else formattedHours = `0 hours`;

    formattedTime = formattedDays + formattedHours;
    return formattedTime;
  }

  moneyFormat() {
    const numberStr = new Intl.NumberFormat().format(this.moneyLevel);
    let formatted = "€" + numberStr;
    return formatted;
  }
}
