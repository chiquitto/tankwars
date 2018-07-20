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
    this.player1 = null;
    this.player2 = null;

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
    this.player1.posx = this.mt_rand(this.tankMinPosX, this.tankMaxPosX);
    this.player1.posy = this.mt_rand(this.tankMinPosY, this.tankMaxPosY);
    this.player1.rotate = this.mt_rand(0, 359);

    do {
      this.player2.posx = this.mt_rand(this.tankMinPosX, this.tankMaxPosX);
    } while (Math.abs(this.player2.posx - this.player1.posx) < (this.tankW * 2));

    do {
      this.player2.posy = this.mt_rand(this.tankMinPosY, this.tankMaxPosY);
    } while (Math.abs(this.player2.posy - this.player1.posy) < (this.tankH * 2));
    
    this.player2.rotate = this.mt_rand(0, 359);
  }

  initVars(data) {
    this.player1 = new Player1();
    this.player2 = new Player2();

    this.generatePositions();

    this.screen = new BattleScreen(this, this.player1, this.player2);

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
    return data;
  }

}