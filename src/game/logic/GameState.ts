import Grid, { GridEvents } from "./grid/Grid";
import Player from "./player/Player";
import Component from "./Component";

interface GameEvent extends GridEvents {
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
  }

  // public clickColumn(x: number) {
  //   this.grid.addToken(x, this.currentPlayer.token);
  //   this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.playerQueue.length;
  // }
}