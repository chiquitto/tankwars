const GAME_STATE_INIT = 1;

class TankGame {

  constructor(canvas) {
    this.stage = new createjs.Stage(canvas);
    document.getElementById(canvas).style.backgroundColor = 'black';

    this.w = this.stage.canvas.width;
    this.h = this.stage.canvas.height;
    
    this.minPosX = 30;
    this.minPosY = 30;
    this.maxPosX = this.w - 32 - this.minPosX;
    this.maxPosY = this.h - 32 - this.minPosY;

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

  generatePositions() {
    this.player1.posx = this.mt_rand(this.minPosX, this.maxPosX);
    this.player1.posy = this.mt_rand(this.minPosY, this.maxPosY);

    this.player2.posx = this.mt_rand(this.minPosX, this.maxPosX);
    this.player2.posy = this.mt_rand(this.minPosY, this.maxPosY);
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