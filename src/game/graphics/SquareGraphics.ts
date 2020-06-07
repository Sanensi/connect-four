import { Graphics, Container, Rectangle } from "pixi.js";
import { SquareInteractions } from "../logic/grid/Square";

export default class SquareGraphics extends Container {
  private shape = new Graphics();
  private hole = new Graphics();

  private size: number;
  private holeBorderWidth: number;
  private color: number = 0x2020ff;

  constructor(size: number, holeBorderWidth: number, state: SquareInteractions) {
    super();

    this.size = size;
    this.holeBorderWidth = holeBorderWidth;
    this.sortableChildren = true;
    this.drawShape(this.color);
    this.addChild(this.hole);
    this.addChild(this.shape);

    this.interactive = true;
    this.hitArea = new Rectangle(0, 0, size, size);

    state.on('highlight', this.setHoleColor);
    state.on('unHighlight', this.clearHole);
    state.on('setToken', this.setHoleColor);

    this.addListener('pointerover', state.over);
    this.addListener('pointerout', state.out);
    this.addListener('pointerup', (e) => {
      if (e.data.button === 0) {
        state.up();
      }
    });
  }

  private setHoleColor = (color: number) => {
    this.hole.beginFill(color);
    this.hole.drawRect(0, 0, this.size, this.size);
    this.hole.endFill();

    this.hole.zIndex = 0;
  }

  private clearHole = () => {
    this.hole.clear();
  }

  private drawShape(color: number) {
    const center = this.size / 2;

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