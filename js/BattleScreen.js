// Responsavel por desenhar os itens na tela
class BattleScreen {
  
  constructor(tankGame, player1, player2) {
    this.tankGame = tankGame;
    this.stage = this.tankGame.stage;

    this.player1 = player1;
    this.player2 = player2;
  }

  init() {
    this.drawTank(this.player1);
    this.drawTank(this.player2);
  }

  drawTank(player) {

    let tank = new createjs.Bitmap(this.tankGame.loadQueue.getResult(player.id));
    // tank.setTransform(player.posx, player.posy, 1, 1, 0, 0, 0, 32, 32);
    tank.sourceRect = new createjs.Rectangle(0,0,32,32);
    tank.x = player.posx;
    tank.y = player.posy;

    this.stage.addChild(tank);
    this.stage.update();

    return;

    var spriteSheet = new createjs.SpriteSheet({
			framerate: 30,
			"images": [this.tankGame.loadQueue.getResult(player.id)],
      "frames": [
        [0, 0, 32, 32],
        [0, 33, 32, 32],
        [0, 65, 32, 32],
        [0, 97, 32, 32],
      ],
			"animations": {
        "top": 0,
        "bottom": 1,
        "left": 2,
        "right": 3,
			}
		});
    let grant = new createjs.Sprite(spriteSheet, "right");

    grant.x = player.posx;
    grant.y = player.posy;
    
    this.stage.addChild(grant);
    this.stage.update();

  }

}