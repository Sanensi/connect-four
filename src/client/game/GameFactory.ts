import { Point } from "pixi.js";

import GameService from "../api/GameService";

import Game from "./Game";
import GameState from "./logic/GameState";
import OnlineGameState from "./logic/OnlineGameState";

import Grid from "./logic/grid/Grid";
import Square from "./logic/grid/Square";
import Player from "./logic/player/Player";
import Token from "./logic/player/Token";

import GridGraphics from "./graphics/GridGraphics"
import SquareGraphics from "./graphics/SquareGraphics";

export interface GameOptions {
  gameType: 'local' | 'online';
  grid: {
    width: number;
    height: number;
  };
}

export default class GameFactory {
  public createGame(options: GameOptions) {
    const { grid, gridGraphics } = this.createGridDuo(options.grid.width, options.grid.height);
    const playerQueue = this.createPlayerQueue();

    let gameState: GameState;
    switch (options.gameType) {
      case 'local':
        gameState = new GameState(grid, playerQueue);
        break;
      case 'online':
        const socket = GameService.createGame(options.grid);
        gameState = new OnlineGameState(grid, playerQueue, socket);
        break;
      default:
        throw new Error(`Unsupported gameType: ${options.gameType}`);
    }

    gameState.setUp();
    return new Game(gridGraphics, gameState);
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
      new Player('Red', new Token(0xff0000, 0x401010)),
      new Player('Yellow', new Token(0xffff00, 0x404010))
    ];
  }
}