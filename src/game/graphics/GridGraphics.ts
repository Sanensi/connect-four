import { Container, Point } from "pixi.js";
import SquareGraphics from "./SquareGraphics";

export default class GridGraphics extends Container {
  // private squares: SquareGraphics[] = [];
  private gridHeight: number;
  private gridWidth: number;

  constructor(squares: SquareGraphics[], gridWidth: number, gridHeight: number) {
    super();

    this.addChild(...squares);

    this.gridWidth = gridWidth;
    this.gridHeight = gridHeight;

    this.pivot.x = this.width/2;
    this.pivot.y = this.height/2;
  }
  
  // private onSquareOver = (gridPosition: Point) => {
  //   this.getFirstEmptySquare(gridPosition.x).select(0x401010);
  // }

  // private onSquareOut = (gridPosition: Point) => {
  //   for (let y = 0; y < this.gridHeight; y++) {
  //     this.getSquare(gridPosition.x, y).unselect();
  //   }
  // }

  // private onSquareUp = (gridPosition: Point) => {
  //   const square = this.getFirstEmptySquare(gridPosition.x);
  //   square.addToken(0xff0000)
  //   square.unselect();
  //   this.onSquareOver(gridPosition);
  //   this.emit('column-click', gridPosition.x);
  // }

  // private getSquare(x: number, y: number) {
  //   return this.squares[x + y * this.gridWidth];
  // }

  // private getFirstEmptySquare(x: number) {
  //   for (let y = this.gridHeight-1; y >= 0; y--) {
  //     const square = this.getSquare(x, y)
  //     if (!square.hasToken) {
  //       return square;
  //     }
  //   }
  //   throw new NoEmptySquareError(`Column ${x} has no empty square`);
  // }

  public resize(width: number, height: number) {
    const proportion = this.gridWidth / this.gridHeight;

    this.width = width/height < proportion ? width : height*proportion;
    this.height = width/height < proportion ? width/proportion: height;

    this.position.set(width/2, height/2);
  }
}

// class NoEmptySquareError extends Error {
//   constructor(message?: string) {
//     super(message);
//     this.name = 'NoEmptySquareError';
//   }
// }