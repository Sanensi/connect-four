import { Graphics, Container, Rectangle } from "pixi.js";

export default class SquareGraphics extends Container {
  private shape = new Graphics();
  private selection = new Graphics();

  private size: number;
  private holeBorderWidth: number;
  private color: number = 0x2020ff;

  readonly gridPosition: PIXI.Point;
  private _hasToken = false;

  public get hasToken() {
    return this._hasToken;
  }

  constructor(size: number, holeBorderWidth: number, gridPosition: PIXI.Point) {
    super();

    this.size = size;
    this.holeBorderWidth = holeBorderWidth;
    this.sortableChildren = true;
    this.drawShape(this.color);
    this.addChild(this.selection);
    this.addChild(this.shape);

    this.gridPosition = gridPosition;

    this.interactive = true;
    this.hitArea = new Rectangle(0, 0, size, size);
    this.addListener('pointerover', this.onPointerOver);
    this.addListener('pointerout', this.onPointerOut);
    this.addListener('pointerup', this.onPointerUp);
  }

  public select(color: number) {
    this.selection.beginFill(color);
    this.selection.drawRect(0, 0, this.size, this.size);
    this.selection.endFill();

    this.selection.zIndex = 0;
  }

  public unselect() {
    this.selection.clear();
  }

  public addToken(color: number) {
    this._hasToken = true;
    const token = new Graphics();

    token.beginFill(color);
    token.drawRect(0, 0, this.size, this.size);
    token.endFill();

    token.zIndex = 0;
    this.addChild(token);
  }

  private onPointerOver() {
    this.emit('square-over', this.gridPosition);
  }

  private onPointerOut() {
    this.emit('square-out', this.gridPosition);
  }

  private onPointerUp() {
    this.emit('square-up', this.gridPosition)
  }

  private drawShape(color: number) {
    const center = this.size/2;

    this.shape.clear();
    this.shape.beginFill(color);
    this.shape.drawRect(0, 0, this.size, this.size);
    this.shape.beginHole();
    this.shape.drawCircle(center, center, center - this.holeBorderWidth);
    this.shape.endHole();
    this.shape.endFill();

    this.shape.zIndex = 1;
  }
}