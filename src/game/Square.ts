import { Graphics, Container } from "pixi.js";

export default class Square extends Container {
  private shape: PIXI.Graphics;

  private size: number;
  private holeBorderWidth: number;
  private color: number;

  constructor(size: number, holeBorderWidth: number) {
    super();

    this.shape = new Graphics();

    this.size = size;
    this.holeBorderWidth = holeBorderWidth;
    this.color = 0x4040ff;
    this.drawShape();

    this.addChild(this.shape);
  }

  private drawShape() {
    const center = this.size/2;

    this.shape.clear();
    this.shape.beginFill(this.color);
    this.shape.drawRect(0, 0, this.size, this.size);
    this.shape.beginHole();
    this.shape.drawCircle(center, center, center - this.holeBorderWidth);
    this.shape.endHole();
    this.shape.endFill();
  }
}