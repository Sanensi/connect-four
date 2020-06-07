import Grid from "./grid/Grid";
import Player from "./player/Player";
import Component from "./Component";
import { Point } from "pixi.js";
import Token from "./player/Token";

interface GameEvent {
}

export default class GameState extends Component<GameEvent> {
  private grid: Grid;
  private playerQueue = [new Player(), new Player()];
  private currentPlayerIndex = 0;

  private get currentPlayer() {
    return this.playerQueue[this.currentPlayerIndex];
  }

  constructor(grid: Grid) {
    super(grid);
    this.grid = grid;
    this.grid.on('squareOver', this.onSquareOver);
    this.grid.on('squareUp', this.onSquareUp);
  }

  private onSquareOver = (position: Point) => {
    this.grid.getFirstEmptySquare(position.x).highlight(0x401010);
  }

  private onSquareUp = (position: Point) => {
    const square = this.grid.getFirstEmptySquare(position.x);
    square.setToken(new Token());
    this.onSquareOver(position);
  }

  // public clickColumn(x: number) {
  //   this.grid.addToken(x, this.currentPlayer.token);
  //   this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.playerQueue.length;
  // }
}