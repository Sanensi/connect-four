import ResizeableContainer from '../utils/ResizeableContainer';

import WinnerWindow from '../gui/WinnerWindow';

import GridGraphics from './graphics/GridGraphics';
import GameState from './logic/GameState';
import Player from './logic/player/Player';

export default class Game extends ResizeableContainer {
  private grid: GridGraphics;
  private state: GameState;

  private winnerWindow: WinnerWindow;

  constructor(grid: GridGraphics, state: GameState) {
    super();

    this.grid = grid;
    this.addChild(this.grid);

    this.state = state;
    this.state.on('gameOver', this.onGameOver);
  }

  private onGameOver = (winner: Player) => {
    this.winnerWindow = new WinnerWindow(winner);
    this.winnerWindow.once('playAgain', this.onPlayAgain);
    this.addChild(this.winnerWindow);
  }

  private onPlayAgain = () => {
    this.state.tearDown();
    this.emit('gameEnd');
    // this.removeChild(this.winnerWindow);
    // this.grid.reset();
    // setTimeout(this.state.reset);
  }
}