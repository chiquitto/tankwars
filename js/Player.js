class Player {

  constructor() {
    this.life = 100;
    this.posx = 0;
    this.posy = 0;
    this.rotate = 0;
  }

}

class Player1 extends Player {
  constructor() {
    super();

    this.id = "bluetank";
  }
}

class Player2 extends Player {
  constructor() {
    super();

    this.id = "redtank";
  }
}