import { Point } from "pixi.js";

import Component from "../Component";
import Token from "../player/Token";
import { Emitter } from "../../../utils/TypedEventEmitter";

interface SquareEvents {
  squareOver: Point;
  squareOut: Point;
  squareUp: Point;
}

interface SquareGraphicEvents {
  highlight: number;
  unHighlight: void;
  setColor: number;
  setToken: number;
}

export interface SquareInteractions extends Emitter<SquareGraphicEvents> {  
  over(): void;
  out(): void;
  up(): void;
}

export default class Square extends Component<SquareEvents & SquareGraphicEvents> implements SquareInteractions {
  private _position: Point;
  private _token: Token;

  public get position() {
    return this._position.clone();
  }

  public get token() {
    return this._token;
  }

  public get hasToken() {
    return this._token !== undefined;
  }

  constructor(position: Point) {
    super();
    this._position = position;
  }
  
  public highlight = (color: number) => {
    this.emit('highlight', color);
  }

  public UnHighlight = () => {
    this.emit('unHighlight');
  }

  public setColor = (color: number) => {
    this.emit('setColor', color);
  }

  public setToken = (token: Token) => {
    if (this.hasToken) {
      throw new AlreadyOccupiedError(`Square at ${this._position} already has a token`);
    }
    this._token = token;
    this.emit('setToken', token.baseColor);

    this.removeAllListeners('highlight');
    this.removeAllListeners('unHighlight');
    this.removeAllListeners('setToken');
  }

  public over = () => {
    this.emit('squareOver', this._position, true);
  }

  public out = () => {
    this.emit('squareOut', this._position);
  }

  public up = () => {
    this.emit('squareUp', this._position, true);
  }
}

class AlreadyOccupiedError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = 'AlreadyOccupiedError';
  }
}