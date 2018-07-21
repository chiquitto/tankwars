// Responsavel por desenhar os itens na tela
class BattleScreen {
  
  constructor(tankGame, players) {
    this.tankGame = tankGame;
    this.stage = this.tankGame.stage;

    this.players = players;
  }

  init() {
    this.drawStage();

    for(let i in this.players) {
      this.drawTank(this.players[i]);
    }

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

    player.tank = new Tank(player, this.tankGame.loadQueue.getResult(player.id));
    this.stage.addChild(player.tank);

  }

}