class Tank extends createjs.Bitmap {
    
  constructor(player, imageOrUri) {
    super(imageOrUri);

    let square = 32;

    this.sourceRect = new createjs.Rectangle(0, 0, square, square);
    this.regX = this.regY = (square / 2);

    this.x = player.posx + this.regX;
    this.y = player.posy + this.regY;
  }

  addRotation(rotation) {
    rotation += this.rotation;
    rotation %= 360;

    return new Promise( (resolve, reject) => {
      // createjs.Ticker.setFPS(60);
      createjs.Tween.get(this)
      .to({rotation:rotation}, 1000)
      .call(resolve)
      ;
    } );

  }

}