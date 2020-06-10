import { Point } from "pixi.js";

import Game from "./Game";
import GameState from "./logic/GameState";
import Grid from "./logic/grid/Grid";
import Square from "./logic/grid/Square";
import GridGraphics from "./graphics/GridGraphics"
import SquareGraphics from "./graphics/SquareGraphics";
import Player from "./logic/player/Player";
import Token from "./logic/player/Token";

export default class GameFactory {
  public createGame(app: PIXI.Application, gridWidth: number, gridHeight: number) {
    const { grid, gridGraphics } = this.createGridDuo(gridWidth, gridHeight);
    const playerQueue = this.createPlayerQueue();
    const gameState = new GameState(grid, playerQueue);

    return new Game(app, gridGraphics, gameState);
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

  private createPlayerQueue() {
    return [
      new Player(new Token(0xff0000, 0x401010)),
      new Player(new Token(0xffff00, 0x404010))
    ];
  }
}