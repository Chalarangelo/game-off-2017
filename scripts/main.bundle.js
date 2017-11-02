/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.game = undefined;

var _stateMain = __webpack_require__(2);

var _stateMain2 = _interopRequireDefault(_stateMain);

var _stateOver = __webpack_require__(3);

var _stateOver2 = _interopRequireDefault(_stateOver);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var game = exports.game = undefined;

window.onload = function () {
  exports.game = game = new Phaser.Game(window.innerWidth >= 480 ? 480 : window.innerWidth, window.innerHeight >= 640 ? 640 : window.innerHeight, Phaser.AUTO, 'ph_game');
  game.state.add('stateMain', _stateMain2.default);
  game.state.add('stateOver', _stateOver2.default);
  game.state.start('stateMain');
};

/***/ }),
/* 1 */,
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _main = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var stateMain = function () {
  function stateMain() {
    _classCallCheck(this, stateMain);
  }

  _createClass(stateMain, [{
    key: 'preload',
    value: function preload() {
      _main.game.load.image('player', 'assets/player.png');
      _main.game.load.image('obstacle', 'assets/obstacle.png');
      _main.game.load.image('ground', 'assets/ground.png');
      _main.game.load.image('powerbar', 'assets/powerbar.png');
      _main.game.load.image('bird', 'assets/bird.png');
    }
  }, {
    key: 'create',
    value: function create() {
      this.clickLock = false;
      this.power = 0;
      _main.game.stage.backgroundColor = '#cc0035';
      this.ground = _main.game.add.sprite(0, _main.game.height * .9, 'ground');
      this.hero = _main.game.add.sprite(_main.game.width * .2, this.ground.y - 25, 'player');
      this.powerBar = _main.game.add.sprite(this.hero.x - 10, this.hero.y - 25, 'powerbar');
      this.powerBar.width = 0;
      _main.game.physics.startSystem(Phaser.Physics.ARCADE);
      _main.game.physics.enable(this.hero, Phaser.Physics.ARCADE);
      _main.game.physics.enable(this.ground, Phaser.Physics.ARCADE);
      this.hero.body.gravity.y = 200;
      this.hero.body.collideWorldBounds = true;
      this.ground.body.immovable = true;
      this.startY = this.hero.y;
      _main.game.input.onDown.add(this.mouseDown, this);
      this.blocks = _main.game.add.group();
      this.makeBlocks();
      this.makeBird();
    }
  }, {
    key: 'update',
    value: function update() {
      _main.game.physics.arcade.collide(this.hero, this.ground);
      _main.game.physics.arcade.collide(this.hero, this.blocks, this.delayOver, null, this);
      _main.game.physics.arcade.collide(this.ground, this.blocks);
      _main.game.physics.arcade.collide(this.blocks);
      var fchild = this.blocks.getChildAt(0);
      if (fchild.x < -_main.game.width) {
        this.makeBlocks();
      }
      if (this.bird.x < 0) this.makeBird();
      _main.game.physics.arcade.collide(this.hero, this.bird, this.delayOver, null, this);
    }
  }, {
    key: 'makeBlocks',
    value: function makeBlocks() {
      this.blocks.removeAll();
      var wallHeight = _main.game.rnd.integerInRange(1, 4);
      for (var i = 0; i < wallHeight; i++) {
        var block = _main.game.add.sprite(0, -i * 50, 'obstacle');
        this.blocks.add(block);
      }
      this.blocks.x = _main.game.width - this.blocks.width;
      this.blocks.y = this.ground.y - 50;
      this.blocks.forEach(function (block) {
        _main.game.physics.enable(block, Phaser.Physics.ARCADE);
        block.body.velocity.x = -150;
        block.body.gravity.y = 4;
        block.body.bounce.set(1, 1);
      });
    }
  }, {
    key: 'makeBird',
    value: function makeBird() {
      if (this.bird) this.bird.destroy();
      var birdY = _main.game.rnd.integerInRange(_main.game.height * .1, _main.game.height * .4);
      this.bird = _main.game.add.sprite(_main.game.width + 100, birdY, 'bird');
      _main.game.physics.enable(this.bird, Phaser.Physics.ARCADE);
      this.bird.body.velocity.x = -200;
      this.bird.body.bounce.set(2, 2);
    }
  }, {
    key: 'mouseDown',
    value: function mouseDown() {
      if (this.clickLock) return;
      if (this.startY !== this.hero.y) return;
      _main.game.input.onDown.remove(this.mouseDown, this);
      this.timer = _main.game.time.events.loop(Phaser.Timer.SECOND / 1000, this.increasePower, this);
      _main.game.input.onUp.add(this.mouseUp, this);
    }
  }, {
    key: 'mouseUp',
    value: function mouseUp() {
      _main.game.input.onUp.remove(this.mouseUp, this);
      this.doJump();
      _main.game.time.events.remove(this.timer);
      this.power = 0;
      this.powerBar.width = 0;
      _main.game.input.onDown.add(this.mouseDown, this);
    }
  }, {
    key: 'increasePower',
    value: function increasePower() {
      this.power++;
      this.powerBar.width = this.power;
      if (this.power > 50) this.power = 50;
    }
  }, {
    key: 'doJump',
    value: function doJump() {
      this.hero.body.velocity.y = -this.power * 12;
    }
  }, {
    key: 'delayOver',
    value: function delayOver() {
      this.clickLock = true;
      _main.game.time.events.add(Phaser.Timer.SECOND, this.gameOver, this);
    }
  }, {
    key: 'gameOver',
    value: function gameOver() {
      _main.game.state.start('stateOver');
    }
  }]);

  return stateMain;
}();

exports.default = stateMain;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _main = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var stateOver = function () {
  function stateOver() {
    _classCallCheck(this, stateOver);
  }

  _createClass(stateOver, [{
    key: 'preload',
    value: function preload() {
      _main.game.load.image('restart', 'assets/restart.png');
    }
  }, {
    key: 'create',
    value: function create() {
      this.playAgain = _main.game.add.sprite(_main.game.width / 2, _main.game.height / 2, 'restart');
      this.playAgain.anchor.set(0.5, 0.5);
      this.playAgain.inputEnabled = true;
      this.playAgain.events.onInputDown.add(this.restartGame, this);
    }
  }, {
    key: 'update',
    value: function update() {}
  }, {
    key: 'restartGame',
    value: function restartGame() {
      _main.game.state.start('stateMain');
    }
  }]);

  return stateOver;
}();

exports.default = stateOver;

/***/ })
/******/ ]);