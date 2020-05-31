import { Container } from "pixi.js";
import Square from "./Square";

export default class Grid extends Container {
  private squares: Square[] = [];
  private rows: number;
  private columns: number;

  constructor(rows: number, columns: number) {
    super();

    this.rows = rows;
    this.columns = columns;

    const square_size = 10;
    const holeBorder = 0.25;

    for (let y = 0; y < columns; y++) {
      for (let x = 0; x < rows; x++) {
        const s = new Square(square_size, holeBorder);
        s.position.set(x * square_size, y * square_size);
        this.squares.push(s);
        this.addChild(s);
      }
    }

    this.pivot.x = this.width/2;
    this.pivot.y = this.height/2;
  }

  public resize(width: number, height: number) {
    const proportion = this.rows / this.columns;

    this.width = width/height < proportion ? width : height*proportion;
    this.height = width/height < proportion ? width/proportion: height;

    this.position.set(width/2, height/2);
  }
}