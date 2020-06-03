import Game from "./Game";
import Grid from "./logic/grid/Grid";
import GridGraphics from "./graphics/Grid"
import GameState from "./logic/GameState";

export default class GameFactory {
  public createGame(app: PIXI.Application, gridWidth: number, gridHeight: number) {
    const grid = new Grid(gridWidth, gridHeight);
    const gameState = new GameState(grid);

    const gridGraphic = new GridGraphics(gridWidth, gridHeight);

    return new Game(app, gameState, gridGraphic);
  }
}