import { game } from './main';

class stateMain {
  preload() {
    game.load.image('player', 'assets/player.png');
    game.load.image('obstacle', 'assets/obstacle.png');
    game.load.image('ground', 'assets/ground.png');
    game.load.image('powerbar', 'assets/powerbar.png');
  }

  create() {
    this.power=0;
    game.stage.backgroundColor='#cc0035';
    this.ground=game.add.sprite(0,game.height*.9,'ground');
    this.hero=game.add.sprite(game.width*.2,this.ground.y-25,'player');
    this.powerBar=game.add.sprite(this.hero.x-10,this.hero.y-25,'powerbar');
    this.powerBar.width=0;
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.enable(this.hero, Phaser.Physics.ARCADE);
    game.physics.enable(this.ground, Phaser.Physics.ARCADE);
    game.input.onUp.add(this.mouseUp, this);
    game.input.onDown.add(this.mouseDown, this);
    this.hero.body.gravity.y = 200;
    this.hero.body.collideWorldBounds = true;
    this.ground.body.immovable = true;
  }

  update() {
    game.physics.arcade.collide(this.hero, this.ground);
  }

  mouseDown() {
    this.timer=game.time.events.loop(Phaser.Timer.SECOND/1000, this.increasePower, this);
  }

  mouseUp() {
    this.doJump();
    game.time.events.remove(this.timer);
    this.power=0;
    this.powerBar.width=0;
  }

  increasePower() {
    this.power++;
    this.powerBar.width = this.power;
    if (this.power > 50)
        this.power = 50;
  }

  doJump() {
    this.hero.body.velocity.y = -this.power * 12;
  }
}

export default stateMain;
