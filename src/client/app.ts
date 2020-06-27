import { Application as App } from 'pixi.js';
import './style/index.css';

import GameFactory from './game/GameFactory';
import Game from './game/Game';
import MainMenu from './gui/MainMenu';
import ResizeableContainer from './utils/ResizeableContainer';

class Application {
  private canvas: HTMLCanvasElement = document.querySelector('#c');
  private app = new App({ view: this.canvas });
  private appRoot = new ResizeableContainer();

  private mainMenu = new MainMenu();
  private game: Game;

  constructor() {
    this.app.stage.addChild(this.appRoot);
    this.appRoot.addChild(this.mainMenu);

    this.mainMenu.once('play', this.play);

    window.addEventListener('resize', this.resize);
    this.resize();
  }

  private play = (gameType) => {
    this.appRoot.removeChild(this.mainMenu);

    this.game = new GameFactory().createGame(7, 6);
    this.game.once('gameEnd', this.gameEnd);

    this.appRoot.addChild(this.game);
  }

  private gameEnd = () => {
    this.appRoot.removeChild(this.game);

    this.mainMenu.once('play', this.play);
    this.appRoot.addChild(this.mainMenu);
  }

  private resize = () => {
    const width = this.canvas.clientWidth;
    const height = this.canvas.clientHeight;
  
    this.app.renderer.resize(width, height);
    this.appRoot.resize(width, height);
    ResizeableContainer.setDefaultSize(width, height);
  }
}

new Application();