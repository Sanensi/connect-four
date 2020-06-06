import { Point } from "pixi.js";

import Game from "./Game";
import GameState from "./logic/GameState";
import Grid from "./logic/grid/Grid";
import Square from "./logic/grid/square/Square";
import GridGraphics from "./graphics/GridGraphics"
import SquareGraphics from "./graphics/SquareGraphics";

export default class GameFactory {
  public createGame(app: PIXI.Application, gridWidth: number, gridHeight: number) {
    const { grid, gridGraphics } = this.createGridDuo(gridWidth, gridHeight);

    const gameState = new GameState(grid);
    return new Game(app, gameState, gridGraphics);
  }

  private createGridDuo(gridWidth: number, gridHeight: number) {
    const squares: Square[] = [];

    const squareSize = 10;
    const holeBorder = 0.25;
    const squaresGraphics: SquareGraphics[] = [];

    for (let y = 0; y < gridHeight; y++) {
      for (let x = 0; x < gridWidth; x++) {
        const square_l = new Square(new Point(x, y));
        squares.push(square_l);

        const square_g = new SquareGraphics(squareSize, holeBorder, square_l);
        square_g.position.set(x * squareSize, y * squareSize);
        squaresGraphics.push(square_g);
      }
    }

    return {
      grid: new Grid(squares, gridWidth, gridHeight),
      gridGraphics: new GridGraphics(squaresGraphics, gridWidth, gridHeight)
    };
  }
}