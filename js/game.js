window.onload = () => {
  let game = new TankGame( 'canvas' );
  game.init();
}

let p = new Promise((resolve, reject) => {

  resolve(1);

});

function x() {
  setTimeout( () => {
    p = p.then((data) => {
      console.log(data);
      return data + 1;
    });

    x();
  }, 1000 );
}
// x();