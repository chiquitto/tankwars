class Player {

  constructor(script) {
    this.script = script;

    this.life = 100;
    this.posx = 0;
    this.posy = 0;
    this.rotate = 0;

    this.tank = null;
    // this.tank = new Tank(this);
  }

}

class Player1 extends Player {
  constructor(script) {
    super(script);

    this.id = "bluetank";
  }
}

class Player2 extends Player {
  constructor(script) {
    super(script);

    this.id = "redtank";
  }
}