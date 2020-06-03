import Grid from './graphics/Grid';
import GameState from './logic/GameState';

export default class Game {
  private app: PIXI.Application;
  private grid: Grid;
  private state: GameState;

  constructor(app: PIXI.Application, state: GameState, grid: Grid) {
    this.app = app;
    this.state = state;
    this.grid = grid;
    
    this.app.stage.addChild(this.grid);
    this.grid.addListener('column-click', this.onColumnClick);

    this.resize();
    this.app.ticker.add(this.update);
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