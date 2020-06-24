import { Application as App } from 'pixi.js';
import './style/index.css';

import GameFactory from './game/GameFactory';
import Game from './game/Game';
import MainMenu from './gui/MainMenu';

interface Resizeable {
  resize: (width: number, heigh: number) => void;
}

class Application {
  private canvas: HTMLCanvasElement = document.querySelector('#c');
  private app = new App({ view: this.canvas });

  private resizeables: Resizeable[] = [];

  private mainMenu = new MainMenu();
  private game: Game;

  constructor() {
    this.app.stage.addChild(this.mainMenu);

    this.mainMenu.once('play', this.play);

    this.resizeables.push(this.mainMenu);

    window.addEventListener('resize', this.resize);
    this.resize();
  }

  private play = (gameType) => {
    this.app.stage.removeChild(this.mainMenu);

    this.game = new GameFactory().createGame(7, 6);
    this.game.once('gameEnd', this.gameEnd);

    this.app.stage.addChild(this.game);
    this.resizeables.push(this.game);
    this.resize();
  }

  private gameEnd = () => {
    this.app.stage.removeChild(this.game);
    this.resizeables.pop();

    this.mainMenu.once('play', this.play);
    this.app.stage.addChild(this.mainMenu);
  }

  private resize = () => {
    const width = this.canvas.clientWidth;
    const height = this.canvas.clientHeight;
  
    this.app.renderer.resize(width, height);
    this.resizeables.forEach(r => r.resize(width, height));
  }
}

new Application();