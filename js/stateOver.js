import { game } from './main';

class stateOver {
  preload() {
    game.load.image('restart', 'assets/restart.png');
  }
  create() {
    this.playAgain=game.add.sprite(game.width/2,game.height/2,'restart');
    this.playAgain.anchor.set(0.5,0.5);
    this.playAgain.inputEnabled=true;
    this.playAgain.events.onInputDown.add(this.restartGame, this);
  }
  update() {

  }

  restartGame() {
    game.state.start('stateMain');
  }
}

export default stateOver;
