import { Container } from "pixi.js";
import SquareGraphics from "./SquareGraphics";

export default class GridGraphics extends Container {
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

  public resize(width: number, height: number) {
    const proportion = this.gridWidth / this.gridHeight;

    this.width = width/height < proportion ? width : height*proportion;
    this.height = width/height < proportion ? width/proportion: height;

    this.position.set(width/2, height/2);
  }
}