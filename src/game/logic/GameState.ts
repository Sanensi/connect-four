import Grid from "./grid/Grid";
import Player from "./player/Player";

export default class GameState {
  private grid;
  private playerQueue = [new Player(), new Player()];
  private currentPlayerIndex = 0;

  private get currentPlayer() {
    return this.playerQueue[this.currentPlayerIndex];
  }

  constructor(grid: Grid) {
    this.grid = grid;
  }

  public clickColumn(x: number) {
    this.grid.addToken(x, this.currentPlayer.token);
    this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.playerQueue.length;
  }
}