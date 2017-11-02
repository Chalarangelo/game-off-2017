import { game } from './main';

class stateMain {
  preload() {
    game.load.image('player', 'assets/player.png');
    game.load.image('obstacle', 'assets/obstacle.png');
    game.load.image('ground', 'assets/ground.png');
    game.load.image('powerbar', 'assets/powerbar.png');
    game.load.image('bird', 'assets/bird.png');
  }

  create() {
    this.clickLock = false;
    this.power=0;
    game.stage.backgroundColor='#cc0035';
    this.ground=game.add.sprite(0,game.height*.9,'ground');
    this.hero=game.add.sprite(game.width*.2,this.ground.y-25,'player');
    this.powerBar=game.add.sprite(this.hero.x-10,this.hero.y-25,'powerbar');
    this.powerBar.width=0;
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.enable(this.hero, Phaser.Physics.ARCADE);
    game.physics.enable(this.ground, Phaser.Physics.ARCADE);
    this.hero.body.gravity.y = 200;
    this.hero.body.collideWorldBounds = true;
    this.ground.body.immovable = true;
    this.startY = this.hero.y;
    game.input.onDown.add(this.mouseDown, this);
    this.blocks = game.add.group();
    this.makeBlocks();
    this.makeBird();
  }

  update() {
    game.physics.arcade.collide(this.hero, this.ground);
    game.physics.arcade.collide(this.hero, this.blocks, this.delayOver, null, this);
    game.physics.arcade.collide(this.ground, this.blocks);
    game.physics.arcade.collide(this.blocks);
    var fchild = this.blocks.getChildAt(0);
    if (fchild.x < -game.width) {
        this.makeBlocks();
    }
    if (this.bird.x < 0) this.makeBird();
    game.physics.arcade.collide(this.hero, this.bird, this.delayOver, null, this);
  }

  makeBlocks() {
    this.blocks.removeAll();
    var wallHeight = game.rnd.integerInRange(1, 4);
    for (var i = 0; i < wallHeight; i++) {
      var block = game.add.sprite(0, -i * 50, 'obstacle');
      this.blocks.add(block);
    }
    this.blocks.x = game.width - this.blocks.width
    this.blocks.y = this.ground.y - 50;
    this.blocks.forEach(function(block) {
      game.physics.enable(block, Phaser.Physics.ARCADE);
      block.body.velocity.x = -150;
      block.body.gravity.y = 4;
      block.body.bounce.set(1,1);
    });
  }

  makeBird() {
    if (this.bird)  this.bird.destroy();
    var birdY = game.rnd.integerInRange(game.height * .1, game.height * .4);
    this.bird = game.add.sprite(game.width + 100, birdY, 'bird');
    game.physics.enable(this.bird, Phaser.Physics.ARCADE);
    this.bird.body.velocity.x = -200;
    this.bird.body.bounce.set(2,2);
  }

  mouseDown() {
    if (this.clickLock) return;
    if (this.startY !== this.hero.y) return;
    game.input.onDown.remove(this.mouseDown, this);
    this.timer=game.time.events.loop(Phaser.Timer.SECOND/1000, this.increasePower, this);
    game.input.onUp.add(this.mouseUp, this);
  }

  mouseUp() {
    game.input.onUp.remove(this.mouseUp, this);
    this.doJump();
    game.time.events.remove(this.timer);
    this.power=0;
    this.powerBar.width=0;
    game.input.onDown.add(this.mouseDown, this);
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

  delayOver() {
    this.clickLock = true;
    game.time.events.add(Phaser.Timer.SECOND, this.gameOver, this);
  }

  gameOver() {
    game.state.start('stateOver');
  }
}

export default stateMain;
