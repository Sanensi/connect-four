import Grid from "./grid/Grid";
import Player from "./player/Player";
import Component from "./Component";
import { Point } from "pixi.js";
import Token from "./player/Token";

interface GameEvent {
}

export default class GameState extends Component<GameEvent> {
  private grid: Grid;
  private playerQueue: Player[];
  private currentPlayerIndex: number = 0;

  private get currentPlayer() {
    return this.playerQueue[this.currentPlayerIndex];
  }

  constructor(grid: Grid, playerQueue: Player[]) {
    super(grid);
    this.grid = grid;
    this.grid.on('squareOver', this.onSquareOver);
    this.grid.on('squareUp', this.onSquareUp);

    this.playerQueue = playerQueue;
  }

  private onSquareOver = (position: Point) => {
    this.grid.getFirstEmptySquare(position.x).highlight(this.currentPlayer.token.highlightColor);
  }

  private onSquareUp = (position: Point) => {
    this.grid.getFirstEmptySquare(position.x).setToken(this.currentPlayer.token);
    this.nextPlayer();
    this.onSquareOver(position);
  }

  private nextPlayer() {
    this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.playerQueue.length;
  }
}