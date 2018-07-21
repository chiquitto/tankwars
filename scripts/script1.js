class Script1 {

  step() {
    return new Rotate(90);
  }

}

class Script2 {

  step() {
    return new Rotate(-90);
  }

}

class Rotate {

  constructor(rotation) {
    this.rotation = rotation;
  }

}