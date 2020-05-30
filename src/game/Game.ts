import { Graphics } from 'pixi.js';


export default class Game {
  private app: PIXI.Application;
  private shape: PIXI.Graphics

  constructor(app: PIXI.Application) {
    this.app = app;
    this.setup();
    this.app.ticker.add(this.update);
  }

  private setup() {
    this.shape = new Graphics();
    this.shape.beginFill(0x4040ff);
    this.shape.drawRect(0, 0, 100, 100);
    this.shape.beginHole();
    this.shape.drawCircle(50, 50, 49);
    this.shape.endHole();
    this.shape.endFill();
    this.shape.pivot.set(50, 50);

    this.app.stage.addChild(this.shape);
  }

  private update = (delta: number) => {
    this.shape.position.x = this.app.renderer.width/2;
    this.shape.position.y = this.app.renderer.height/2;
  }
}