const GAME_STATE_INIT = 1;

class TankGame {

  constructor(canvas) {
    this.stage = new createjs.Stage(canvas);
    document.getElementById(canvas).style.backgroundColor = 'black';

    this.w = this.stage.canvas.width;
    this.h = this.stage.canvas.height;
    this.tankW = 32;
    this.tankH = 32;

    this.calculateRingDimensions();

    this.loadQueue = null;
    this.screen = null;

    this.stepCounter = 0;
    this.players = [];

    createjs.Ticker.addEventListener("tick", (event) => {
      this.stage.update();
    });

  }

  init() {
    
    Promise.resolve({})
    .then( (data) => {
      return this.loadResources(data);
    } )
    .then( (data) => {
      return this.initVars(data);
    } )
    .then( (data) => {
      return this.steps(data);
    })
    .then( (data) => {
      console.log(data);
    })
    ;

  }

  calculateRingDimensions() {
    this.ringLeftMargin = 10;
    this.ringTopMargin = 10;
    this.ringRightMargin = 10;
    this.ringBottomMargin = 10;

    this.ringW = (this.w - this.ringLeftMargin - this.ringRightMargin);
    this.ringW = this.ringW - (this.ringW % this.tankW);

    this.ringH = (this.h - this.ringTopMargin - this.ringBottomMargin);
    this.ringH = this.ringH - (this.ringH % this.tankH);

    this.ringLeftPos = (this.w - this.ringW) / 2;
    this.ringTopPos = this.h - this.ringH - this.ringBottomMargin;

    this.tankMinPosX = this.ringLeftPos + 10;
    this.tankMinPosY = this.ringTopPos + 10;
    this.tankMaxPosX = this.ringLeftPos + this.ringW - this.tankW - 10;
    this.tankMaxPosY = this.ringTopPos + this.ringH - this.tankH - 10;
  }

  generatePositions() {

    for(let i in this.players) {
      this.players[i].posx = this.mt_rand(this.tankMinPosX, this.tankMaxPosX);
      this.players[i].posy = this.mt_rand(this.tankMinPosY, this.tankMaxPosY);
      this.players[i].rotate = this.mt_rand(0, 359);
    }

  }

  initVars(data) {
    this.players.push(new Player1(new Script1()));
    this.players.push(new Player2(new Script2()));

    this.generatePositions();

    this.screen = new BattleScreen(this, this.players);
    this.screen.init();

    return data;
  }

  loadResources(data) {

    let manifest = [
      {src: "logo.png", id: "logo"},
      {src: "explosion.png", id: "explosion"},
      {src: "bluetank.png", id: "bluetank"},
      {src: "redtank.png", id: "redtank"},
      {src: "heartSprite.png", id: "heartSprite"}
    ];

    this.loadQueue = new createjs.LoadQueue(false);
    this.loadQueue.loadManifest(manifest, true, "images/");

    return new Promise( (resolve, reject) => {
      this.loadQueue.addEventListener("complete", (result) => {
        resolve(data);
      });
    });

  }

  mt_rand (min, max) { // eslint-disable-line camelcase
    //  discuss at: http://locutus.io/php/mt_rand/
    // original by: Onno Marsman (https://twitter.com/onnomarsman)
    // improved by: Brett Zamir (http://brett-zamir.me)
    //    input by: Kongo
    //   example 1: mt_rand(1, 1)
    //   returns 1: 1
  
    var argc = arguments.length
    if (argc === 0) {
      min = 0
      max = 2147483647
    } else if (argc === 1) {
      throw new Error('Warning: mt_rand() expects exactly 2 parameters, 1 given')
    } else {
      min = parseInt(min, 10)
      max = parseInt(max, 10)
    }
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  steps(data) {
    let promiseResolve, interval;

    let promise = new Promise((resolve, reject) => {

      interval = setInterval(() => {
        let player = this.players[ this.stepCounter % this.players.length ];

        this.step(resolve, player);

        this.stepCounter++;
      }, 3000);

    })
    .then((resolvedValue) => {
      clearInterval(interval);

      return data;
    })
    ;

    return promise;
  }

  step(resolve, player) {
    let step = player.script.step();
    console.log(step);
    
    player.tank.addRotation(step.rotation);
    // this.stage.update();
  }

}