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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var game = exports.game = undefined;

window.onload = function () {
  exports.game = game = new Phaser.Game(window.innerWidth >= 480 ? 480 : window.innerWidth, window.innerHeight >= 640 ? 640 : window.innerHeight, Phaser.AUTO, 'ph_game');
  game.state.add('stateMain', _stateMain2.default);
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
    }
  }, {
    key: 'create',
    value: function create() {
      this.power = 0;
      _main.game.stage.backgroundColor = '#cc0035';
      this.ground = _main.game.add.sprite(0, _main.game.height * .9, 'ground');
      this.hero = _main.game.add.sprite(_main.game.width * .2, this.ground.y - 25, 'player');
      this.powerBar = _main.game.add.sprite(this.hero.x - 10, this.hero.y - 25, 'powerbar');
      this.powerBar.width = 0;
      _main.game.physics.startSystem(Phaser.Physics.ARCADE);
      _main.game.physics.enable(this.hero, Phaser.Physics.ARCADE);
      _main.game.physics.enable(this.ground, Phaser.Physics.ARCADE);
      _main.game.input.onUp.add(this.mouseUp, this);
      _main.game.input.onDown.add(this.mouseDown, this);
      this.hero.body.gravity.y = 200;
      this.hero.body.collideWorldBounds = true;
      this.ground.body.immovable = true;
    }
  }, {
    key: 'update',
    value: function update() {
      _main.game.physics.arcade.collide(this.hero, this.ground);
    }
  }, {
    key: 'mouseDown',
    value: function mouseDown() {
      this.timer = _main.game.time.events.loop(Phaser.Timer.SECOND / 1000, this.increasePower, this);
    }
  }, {
    key: 'mouseUp',
    value: function mouseUp() {
      this.doJump();
      _main.game.time.events.remove(this.timer);
      this.power = 0;
      this.powerBar.width = 0;
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
  }]);

  return stateMain;
}();

exports.default = stateMain;

/***/ })
/******/ ]);