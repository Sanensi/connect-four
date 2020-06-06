import { Point } from "pixi.js";

import Token from "../player/Token";
import Squares from "./square/Square";
import Component from "../Component";

export default class Grid extends Component {
  private squares: Squares[];
  private width: number;
  private height: number;

  constructor(squares: Squares[], width: number, height: number) {
    super(...squares);
    this.squares = squares
    this.width = width;
    this.height = height;

    this.squares.forEach(square => {
      square.onOver = this.onSquareOver;
      square.onOut = this.onSquareOut;
      square.onUp = this.onSquareUp
    });
  }

  private onSquareOver = (position: Point) => {
    this.getFirstEmptySquare(position.x).highlight(0x401010);
  }

  private onSquareOut = (position: Point) => {
    for (let y = 0; y < this.height; y++) {
      this.getSquare(position.x, y).UnHighlight();
    }
  }

  private onSquareUp = (position: Point) => {
    const square = this.getFirstEmptySquare(position.x);
    square.setToken(new Token());
    this.onSquareOver(position);
  }

  private getSquare(x: number, y: number) {
    return this.squares[x + y * this.width];
  }

  private getFirstEmptySquare(x: number) {
    for (let y = this.height - 1; y >= 0; y--) {
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