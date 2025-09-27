class Game {
  constructor() {
    this.startScreen = document.getElementById("start-screen");
    this.gameScreen = document.getElementById("main-screen");
    this.finishScreen = document.getElementById("finish-screen");

    this.gameIntervalId;
    this.timeReduceIntervalId;
    this.moneyUpIntervalId;

    this.player = this.player = new Player(this.gameScreen, 200, 500);

    this.activities = [];

    /*stats values*/
    this.energyLevel = 50;
    this.resilienceLevel = 0;
    this.timeLevel = 1000; //365 * 24; //1 year
    this.moneyLevel = 2400;

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

    /*music and sounds*/
    this.backgroundMusic = new Audio(
      "assets/Clement Panchout _ Fluttering in the Sun _ (The GodMOTHer).wav"
    );
    this.gameOverSound = new Audio("assets/oh-no.mp3");
    this.gameOverSound.volume = 0.1;
    this.backgroundMusic.volume = 0.05;
  }

  start() {
    this.addRandomActivity();

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
    //€12 / 24h = €0.5 per hour (1 sec in the game)
    this.moneyUpIntervalId = setInterval(() => {
      this.moneyLevel += 0.5;
      this.updateStats();
    }, 1000);

    this.updateStats();
    this.backgroundMusic.play();
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

    for (let i = 0; i < this.activities.length; i++) {
      const activity = this.activities[i];
      activity.move();

      if (activity.left < 0) {
        this.activities.splice(i, 1);
        activity.activityImg.remove();
      }

      if (this.player.didChoose(activity)) {
        activity.sound.play();
        this.activities.splice(i, 1);
        activity.activityImg.remove();

        /******stats changes*******/
        this.setEnergyResilienseLevels(activity);
        this.moneyLevel += activity.moneyLevel;
        this.timeLevel += activity.timeLevel;

        /*update the stats HTML*/
        this.updateStats();

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
    this.gameOverSound.play();

    this.gameScreen.style.display = "none";
    this.finishScreen.style.display = "flex";
    this.player.imgElemet.remove();
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

    this.backgroundMusic.pause();
    this.backgroundMusic.currentTime = 0;
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
      if (this.energyLevel > 0 && this.energyLevel <= 20) {
        //dangerous state
        this.energyLevel -= activity.energyLevel;
        if (this.resilienceLevel > 0) {
          this.resilienceLevel -= 1; //to avoid dividing by 0 can be 0, can't be -1
        }
      } else if (this.energyLevel > 20 && this.energyLevel <= 80) {
        //ok state
        this.energyLevel -= Math.round(
          activity.energyLevel / (this.resilienceLevel * 0.1 + 1)
        );
        this.resilienceLevel += 1;
      } else if (this.energyLevel > 80 && this.energyLevel <= 100) {
        //exellent state
        this.energyLevel -= Math.round(
          activity.energyLevel / (this.resilienceLevel * 0.5 + 1)
        );
        this.resilienceLevel += 1;
      }
    } else {
      this.energyLevel += activity.energyLevel;
      if (this.energyLevel > 100) this.energyLevel = 100;
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
