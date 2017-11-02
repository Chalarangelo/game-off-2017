import stateMain from './stateMain';
import stateOver from './stateOver';

export var game;

window.onload = () => {
  game = new Phaser.Game(
    window.innerWidth >= 480 ? 480 : window.innerWidth,
    window.innerHeight >= 640 ? 640 : window.innerHeight,
    Phaser.AUTO,
    'ph_game'
  );
  game.state.add('stateMain', stateMain);
  game.state.add('stateOver', stateOver);
  game.state.start('stateMain');
}
