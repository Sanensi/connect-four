import { Graphics, Container, Rectangle } from "pixi.js";

export default class Square extends Container {
  private shape: PIXI.Graphics;

  private size: number;
  private holeBorderWidth: number;
  private color: number = 0x4040ff;
  private selectedColor: number = 0xC0C0C0;

  private _gridPosition: PIXI.Point;

  public get gridPosition() : PIXI.Point {
    return this._gridPosition;
  }

  constructor(size: number, holeBorderWidth: number, gridPosition: PIXI.Point) {
    super();

    this.shape = new Graphics();

    this.size = size;
    this.holeBorderWidth = holeBorderWidth;
    this.drawShape(this.color);

    this.addChild(this.shape);

    this._gridPosition = gridPosition;

    this.interactive = true;
    this.hitArea = new Rectangle(0, 0, size, size);
    this.addListener('pointerover', this.onPointerOver);
    this.addListener('pointerout', this.onPointerOut);
  }

  private drawShape(color) {
    const center = this.size/2;

    this.shape.clear();
    this.shape.beginFill(color);
    this.shape.drawRect(0, 0, this.size, this.size);
    this.shape.beginHole();
    this.shape.drawCircle(center, center, center - this.holeBorderWidth);
    this.shape.endHole();
    this.shape.endFill();
  }
  
  private onPointerOver() {
    this.emit('square-over', this.gridPosition);
  }

  private onPointerOut() {
    this.emit('square-out', this.gridPosition);
  }

  public select() {
    this.drawShape(this.selectedColor);
  }

  public unselect() {
    this.drawShape(this.color);
  }
}