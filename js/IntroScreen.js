class IntroScreen {

  constructor(tankGame) {
    this.tankGame = tankGame;

  }

  init() {
    console.log("IntroScreen.init");

    let logoImg = new createjs.Bitmap(this.tankGame.loadQueue.getResult("logo"));

    logoImg.setTransform((this.tankGame.w - logoImg.image.width) / 2, (this.tankGame.h - logoImg.image.height) / 2);
    this.tankGame.stage.addChild(logoImg);

    this.tankGame.stage.update();
  }

}