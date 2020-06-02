import Square from "./Square";
import Token from "../player/Token";

export default class Grid {
  private squares: Square[] = [];
  private width: number;
  private height: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const square = new Square(x, y);
        this.squares.push(square);
      }
    }
  }

  public addToken(x: number, token: Token) {
    const square = this.getFirstEmptySquare(x);
    square.setToken(token);
  }

  private getSquare(x: number, y: number) {
    return this.squares[x + y * this.width];
  }

  private getFirstEmptySquare(x: number) {
    for (let y = this.height-1; y >= 0; y--) {
      const square = this.getSquare(x, y)
      if (!square.hasToken) {
        return square;
      }
    }
    throw new NoEmptySquareError(`Column ${x} has no empty square`);
  }
}

class NoEmptySquareError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = 'NoEmptySquareError';
  }
}