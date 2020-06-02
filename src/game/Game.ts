import Grid from './graphics/Grid';
import GameState from './logic/GameState';

export default class Game {
  private app: PIXI.Application;
  private grid = new Grid(7, 6);
  private state = new GameState();

  constructor(app: PIXI.Application) {
    this.app = app;
    this.setup();
    this.resize();
    this.app.ticker.add(this.update);
  }

  private setup() {
    this.app.stage.addChild(this.grid);
    this.grid.addListener('column-click', this.onColumnClick);
  }

  private onColumnClick = (x: number) => {
    this.state.clickColumn(x);
  }

  private update = (delta: number) => {
  }

  public resize = () => {
    const canvas = this.app.renderer.view;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    this.app.renderer.resize(width, height);
    this.grid.resize(width, height);
  }
}