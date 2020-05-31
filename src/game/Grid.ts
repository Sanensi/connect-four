import { Container, Point } from "pixi.js";
import Square from "./Square";

export default class Grid extends Container {
  private squares: Square[] = [];
  private rows: number;
  private columns: number;

  constructor(columns: number, rows: number) {
    super();

    this.columns = columns;
    this.rows = rows;

    const square_size = 10;
    const holeBorder = 0.25;

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < columns; x++) {
        const square = new Square(square_size, holeBorder, new Point(x, y));
        square.position.set(x * square_size, y * square_size);
        this.squares.push(square);
        square.addListener('square-over', this.onSquareOver);
        square.addListener('square-out', this.onSquareOut);
        this.addChild(square);
      }
    }

    this.pivot.x = this.width/2;
    this.pivot.y = this.height/2;
  }
  
  private onSquareOver = (gridPosition: Point) => {
    console.log(`In: ${gridPosition.x}`);
    for (let y = 0; y < this.rows; y++) {
      this.getSquare(gridPosition.x, y).select();
    }
  }

  private onSquareOut = (gridPosition: Point) => {
    console.log(`Out: ${gridPosition.x}`);
    for (let y = 0; y < this.rows; y++) {
      this.getSquare(gridPosition.x, y).unselect();
    }
  }

  private getSquare(x: number, y: number) {
    return this.squares[x + y * this.columns];
  }

  public resize(width: number, height: number) {
    const proportion = this.columns / this.rows;

    this.width = width/height < proportion ? width : height*proportion;
    this.height = width/height < proportion ? width/proportion: height;

    this.position.set(width/2, height/2);
  }
}