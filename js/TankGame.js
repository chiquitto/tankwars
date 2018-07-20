const GAME_STATE_INIT = 1;

class TankGame {

  constructor(canvas) {
    this.stage = new createjs.Stage(canvas);
    this.w = this.stage.canvas.width;
	  this.h = this.stage.canvas.height;

    this.loadQueue = null;
    this.screen = null;

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

  init() {
    
    Promise.resolve({})
      .then( (data) => {
        return this.loadResources(data);
      } )
      .then( (data) => {
        this.screen = new IntroScreen(this);
        this.screen.init();
      })
    ;

  }

}