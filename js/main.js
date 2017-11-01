// import * as PIXI from 'pixi';
// import * as p2 from 'p2';
// import * as Phaser from './phaser';
// require('../node_modules/phaser-ce/build/custom/p2.js');
// require('../node_modules/phaser/build/custom/pixi.js');
// require('../node_modules/phaser/build/custom/phaser.js');
// var PIXI = require('./pixi.js');
// var phaser = require('phaser');
import StateMain from './StateMain';

var game;

window.onload = function()
{
	 var isMobile=navigator.userAgent.indexOf("Mobile");

   if (isMobile==-1)
    {
        game=new Phaser.Game(480,640,Phaser.AUTO,"ph_game");
    }
    else
    {
      game=new Phaser.Game(window.innerWidth,window.innerHeight,Phaser.AUTO,"ph_game");
      console.log("Mobile");
    }

    game.state.add("StateMain",StateMain);
    game.state.start("StateMain");
}
