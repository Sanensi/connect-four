import { Application as App } from 'pixi.js';
import './style/index.css';
import GameFactory from './game/GameFactory';
import MainMenu from './gui/MainMenu';
import Game from './game/Game';

interface Resizeable {
  resize: (width: number, heigh: number) => void;
}

class Application {
  private resizeables: Resizeable[] = [];
  private canvas: HTMLCanvasElement = document.querySelector('#c');
  private app = new App({ view: this.canvas });
  private mainMenu = new MainMenu();

  private game: Game;

  constructor() {
    this.app.stage.addChild(this.mainMenu);

    this.mainMenu.once('play', this.play);

    this.resizeables.push(
      this.app.renderer,
      this.mainMenu,
    );

    window.addEventListener('resize', this.resize);
    this.resize();
    this.mainMenu.show();
  }

  private play = (gameType) => {
    this.game = new GameFactory().createGame(7, 6);
    this.game.once('gameEnd', this.gameEnd);

    this.resizeables.push(this.game);
    this.resize();
    this.mainMenu.hide();
    this.app.stage.addChild(this.game);
  }

  private gameEnd = () => {
    this.app.stage.removeChild(this.game);
    this.resizeables.pop();

    this.mainMenu.once('play', this.play);
    this.mainMenu.show();
  }

  private resize = () => {
    const width = this.canvas.clientWidth;
    const height = this.canvas.clientHeight;
  
    this.resizeables.forEach(r => r.resize(width, height));
  }
}

new Application();