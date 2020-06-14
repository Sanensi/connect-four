import { Graphics, Container, Rectangle } from "pixi.js";
import { SquareInteractions } from "../logic/grid/Square";

export default class SquareGraphics extends Container {
  private shape = new Graphics();
  private hole = new Graphics();

  private size: number;
  private holeBorderWidth: number;
  private baseColor: number = 0x2020ff;

  private state: SquareInteractions;

  constructor(size: number, holeBorderWidth: number, state: SquareInteractions) {
    super();

    this.size = size;
    this.holeBorderWidth = holeBorderWidth;
    this.sortableChildren = true;
    this.drawShape(this.baseColor);
    this.addChild(this.hole);
    this.addChild(this.shape);

    this.interactive = true;
    this.hitArea = new Rectangle(0, 0, size, size);

    this.state = state;
    this.state.on('highlight', this.setHoleColor);
    this.state.on('unHighlight', this.clearHole);
    this.state.on('setColor', this.drawShape);
    this.state.on('setToken', this.setHoleColor);

    this.addListener('pointerover', this.state.over);
    this.addListener('pointerout', this.state.out);
    this.addListener('pointerup', (e) => {
      if (e.data.button === 0) {
        this.state.up();
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

  private drawShape = (color: number) => {
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

  public reset(): void {
    this.state.off('highlight', this.setHoleColor);
    this.state.off('unHighlight', this.clearHole);
    this.state.off('setColor', this.drawShape);
    this.state.off('setToken', this.setHoleColor);

    this.state.on('highlight', this.setHoleColor);
    this.state.on('unHighlight', this.clearHole);
    this.state.on('setColor', this.drawShape);
    this.state.on('setToken', this.setHoleColor);

    this.clearHole();
    this.drawShape(this.baseColor);
  }
}