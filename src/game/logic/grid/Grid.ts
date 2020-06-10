import { Point } from "pixi.js";

import Square from "./Square";
import Component from "../Component";
import Token from "../player/Token";

interface GridEvents {
  squareOver: Point;
  squareUp: Point;
}

export default class Grid extends Component<GridEvents> {
  private squares: Square[];
  private width: number;
  private height: number;

  constructor(squares: Square[], width: number, height: number) {
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

  public dropToken(column: number, token: Token) {
    const latestSquare = this.getFirstEmptySquare(column);
    latestSquare.setToken(token);

    return this.getConnections(latestSquare);
  }

  private getConnections(square: Square) {
    const postitiveSlope = (x: number) => (square.position.y - square.position.x) + x;
    const negativeSlope = (x: number) => (square.position.y + square.position.x) - x;

    const row = this.squares.filter(s => s.position.y === square.position.y);
    const column = this.squares.filter(s => s.position.x === square.position.x);
    const diagonnal1 = this.squares.filter(s => s.position.y === postitiveSlope(s.position.x));
    const diagonnal2 = this.squares.filter(s => s.position.y === negativeSlope(s.position.x));

    return [row, column, diagonnal1, diagonnal2].map(seq => this.getLongestChain(seq, square.token));
  }

  private getLongestChain(sequence: Square[], token: Token) {
    let candidate: Square[] = [];
    let longestChain: Square[] = [];
    
    sequence.forEach(s => {
      if (s.token === token) {
        candidate.push(s);
      }
      if (candidate.length > longestChain.length) {
        longestChain = [...candidate];
      }
      if (s.token !== token) {
        candidate = [];
      }
    });

    return [...longestChain];
  }
}

class NoEmptySquareError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = 'NoEmptySquareError';
  }
}