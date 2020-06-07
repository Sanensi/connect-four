import { Point } from "pixi.js";

import Squares from "./Square";
import Component from "../Component";

interface GridEvents {
  squareOver: Point;
  squareUp: Point;
}

export default class Grid extends Component<GridEvents> {
  private squares: Squares[];
  private width: number;
  private height: number;

  constructor(squares: Squares[], width: number, height: number) {
    super(...squares);
    this.squares = squares
    this.width = width;
    this.height = height;

    this.squares.forEach(square => {
      square.on('squareOut', this.onSquareOut);
    });
  }

  private onSquareOut = (position: Point) => {
    for (let y = 0; y < this.height; y++) {
      this.getSquare(position.x, y).UnHighlight();
    }
  }

  public getSquare(x: number, y: number) {
    return this.squares[x + y * this.width];
  }

  public getFirstEmptySquare(x: number) {
    for (let y = this.height - 1; y >= 0; y--) {
      const square = this.getSquare(x, y);
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