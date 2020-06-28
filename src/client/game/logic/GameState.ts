import { Point } from "pixi.js";

import Component from "../../utils/Component";

import Grid, { NoEmptySquareError } from "./grid/Grid";
import Player from "./player/Player";

interface GameStateEvents {
  gameOver: Player;
}

export default class GameState extends Component<GameStateEvents> {
  protected grid: Grid;
  protected playerQueue: Player[];
  protected currentPlayerIndex: number;

  protected get currentPlayer() {
    return this.playerQueue[this.currentPlayerIndex];
  }

  constructor(grid: Grid, playerQueue: Player[]) {
    super(grid);
    this.grid = grid;
    this.playerQueue = playerQueue;
  }

  protected onSquareOver = (position: Point) => {
    try {
      this.grid.getFirstEmptySquare(position.x).highlight(this.currentPlayer.token.highlightColor);
    }
    catch (error) {
      if (!(error instanceof NoEmptySquareError)) {
        throw error;
      }
    }
  }

  protected onSquareUp = (position: Point) => {
    let connections = this.grid.dropToken(position.x, this.currentPlayer.token);
    connections = connections.filter(c => c.length >= 4);

    if (connections.length > 0) {
      this.grid.off("squareOver", this.onSquareOver);
      this.grid.off("squareUp", this.onSquareUp);
      
      connections.forEach(squares => {
        squares.forEach(square => square.setColor(0x10C010));
      });

      this.emit('gameOver', this.currentPlayer);
    }
    else {
      this.nextPlayer();
      this.onSquareOver(position);
    }
  }

  protected nextPlayer() {
    this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.playerQueue.length;
  }

  public setUp() {
    this.currentPlayerIndex = 0;
    this.grid.reset();
    this.grid.on('squareOver', this.onSquareOver);
    this.grid.on('squareUp', this.onSquareUp);
  }

  public tearDown() {
    this.grid.off("squareOver", this.onSquareOver);
    this.grid.off("squareUp", this.onSquareUp);
  }

  public reset() {
    this.tearDown();
    this.setUp();
  }
}