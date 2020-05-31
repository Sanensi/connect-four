import Square from './Square';


export default class Game {
  private app: PIXI.Application;
  private shape =  new Square(100, 2.5);

  constructor(app: PIXI.Application) {
    this.app = app;
    this.setup();
    this.app.ticker.add(this.update);
    this.resize();
  }

  private setup() {
    this.app.stage.addChild(this.shape);
  }

  private update = (delta: number) => {
    this.shape.position.x = this.app.renderer.width/2;
    this.shape.position.y = this.app.renderer.height/2;
  }

  public resize = () => {
    const canvas = this.app.renderer.view;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    this.app.renderer.resize(width, height);
    this.shape.resize(width, height);
  }
}