import GridGraphics from './graphics/GridGraphics';
import GameState from './logic/GameState';

export default class Game {
  private app: PIXI.Application;
  private grid: GridGraphics;
  private state: GameState;

  constructor(app: PIXI.Application, grid: GridGraphics, state: GameState) {
    this.app = app;
    this.grid = grid;
    this.app.stage.addChild(this.grid);

    this.state = state;

    this.resize();
    this.app.ticker.add(this.update);
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