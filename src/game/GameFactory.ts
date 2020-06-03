import Game from "./Game";
import Grid from "./logic/grid/Grid";
import GridGraphics from "./graphics/GridGraphics"
import GameState from "./logic/GameState";
import SquareGraphics from "./graphics/SquareGraphics";
import Square from "./logic/grid/Square";

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
        const square_g = new SquareGraphics(squareSize, holeBorder);
        square_g.position.set(x * squareSize, y * squareSize);
        squaresGraphics.push(square_g);
        // square.addListener('square-over', this.onSquareOver);
        // square.addListener('square-out', this.onSquareOut);
        // square.addListener('square-up', this.onSquareUp);

        const square_l = new Square(x, y);
        squares.push(square_l);
      }
    }

    return {
      grid: new Grid(squares, gridWidth, gridHeight),
      gridGraphics: new GridGraphics(squaresGraphics, gridWidth, gridHeight)
    };
  }
}