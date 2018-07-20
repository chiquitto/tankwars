// Responsavel por desenhar os itens na tela
class BattleScreen {
  
  constructor(tankGame, player1, player2) {
    this.tankGame = tankGame;
    this.stage = this.tankGame.stage;

    this.player1 = player1;
    this.player2 = player2;
  }

  init() {
    this.drawStage();

    this.drawTank(this.player1);
    this.drawTank(this.player2);

    this.stage.update();
  }

  drawStage() {
    var rect = new createjs.Shape();
    rect.graphics.beginFill('#FFFFFF');
    rect.graphics.drawRect(
      this.tankGame.ringLeftPos,
      this.tankGame.ringTopPos, 
      this.tankGame.ringW,
      this.tankGame.ringH
    );
    rect.graphics.endFill();

    this.stage.addChild(rect);
  }

  drawTank(player) {

    let square = 32;

    let tank = new createjs.Bitmap(this.tankGame.loadQueue.getResult(player.id));
    tank.sourceRect = new createjs.Rectangle(0, 0, square, square);
    tank.regX = tank.regY = (square / 2);

    tank.x = player.posx + tank.regX;
    tank.y = player.posy + tank.regY;
    tank.rotation = player.rotate;

    this.stage.addChild(tank);
  }

}