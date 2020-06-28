import GameState from "./GameState";
import Grid from "./grid/Grid";
import Player from "./player/Player";

export default class OnlineGameState extends GameState {
  private socket: SocketIOClient.Socket;
  private localPlayer: Player;

  constructor(grid: Grid, playerQueue: Player[], socket: SocketIOClient.Socket) {
    super(grid, playerQueue);
    this.socket = socket;
  }

  public setUp() {
    super.setUp();
    this.socket.on('message', (msg) => console.log(msg));
  }

  public tearDown() {
    super.tearDown();
    this.socket.close();
  }

  public reset() {
    this.tearDown();
    this.setUp();
  }
}