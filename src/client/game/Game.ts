import { Container } from 'pixi.js';

import WinnerWindow from '../gui/WinnerWindow';

import GridGraphics from './graphics/GridGraphics';
import GameState from './logic/GameState';
import Player from './logic/player/Player';

export default class Game extends Container {
  private grid: GridGraphics;
  private state: GameState;

  private winnerWindow = new WinnerWindow();

  constructor(grid: GridGraphics, state: GameState) {
    super();

    this.grid = grid;
    this.addChild(
      this.grid,
      this.winnerWindow
    );

    this.state = state;
    this.state.on('gameOver', this.onGameOver);
  }

  private onGameOver = (winner: Player) => {
    this.winnerWindow.once('playAgain', this.onPlayAgain);
    this.winnerWindow.show(winner);
  }

  private onPlayAgain = () => {
    this.emit('gameEnd');
    // this.winnerWindow.hide();
    // this.grid.reset();
    // setTimeout(this.state.reset);
  }

  public resize = (width: number, height: number) => {
    this.grid.resize(width, height);
    this.winnerWindow.resize(width, height);
  }
}