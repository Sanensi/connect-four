import GridGraphics from './graphics/GridGraphics';
import GameState from './logic/GameState';
import Player from './logic/player/Player';
import WinnerWindow from './gui/WinnerWindow';

export default class Game {
  private app: PIXI.Application;
  private grid: GridGraphics;
  private state: GameState;

  private gameOverWindow = new WinnerWindow();

  constructor(app: PIXI.Application, grid: GridGraphics, state: GameState) {
    this.app = app;
    this.grid = grid;
    this.app.stage.addChild(
      this.grid,
      this.gameOverWindow
    );

    this.state = state;
    this.state.on('gameOver', this.onGameOver);

    this.resize();
    this.app.ticker.add(this.update);
  }

  private onGameOver = (winner: Player) => {
    this.gameOverWindow.once('playAgain', this.onPlayAgain);
    this.gameOverWindow.show(winner);
  }

  private onPlayAgain = () => {
    this.gameOverWindow.hide();
    this.grid.reset();
    setTimeout(this.state.reset);
  }

  private update = (delta: number) => {
  }

  public resize = () => {
    const canvas = this.app.renderer.view;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    this.app.renderer.resize(width, height);
    this.grid.resize(width, height);
    this.gameOverWindow.resize(width, height);
  }
}