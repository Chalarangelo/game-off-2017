import stateMain from './stateMain';

export var game;

window.onload = () => {
  game = new Phaser.Game(
    window.innerWidth >= 480 ? 480 : window.innerWidth,
    window.innerHeight >= 640 ? 640 : window.innerHeight,
    Phaser.AUTO,
    'ph_game'
  );
  game.state.add('stateMain', stateMain);
  game.state.start('stateMain');
}
