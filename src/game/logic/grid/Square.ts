import { Point } from "pixi.js";

import Component from "../Component";
import Token from "../player/Token";
import { Emitter } from "../../../utils/TypedEventEmitter";

export interface SquareEvents {
  squareOver: Point;
  squareOut: Point;
  squareUp: Point;
}

interface SquareGraphicEvents {
  highlight: number;
  unHighlight: void;
  setToken: number;
}

export interface SquareInteractions extends Emitter<SquareGraphicEvents> {  
  over(): void;
  out(): void;
  up(): void;
}

export default class Square extends Component<SquareEvents & SquareGraphicEvents> implements SquareInteractions {
  private position: Point;
  private token: Token;

  get hasToken() {
    return this.token !== undefined;
  }

  constructor(position: Point) {
    super();
    this.position = position;
  }
  
  highlight = (color: number) => {
    this.emit('highlight', color);
  }

  UnHighlight = () => {
    this.emit('unHighlight');
  }

  setToken = (token: Token) => {
    if (this.hasToken) {
      throw new AlreadyOccupiedError(`Square at ${this.position} already has a token`);
    }
    this.token = token;
    this.emit('setToken', 0xff0000);

    this.removeAllListeners('highlight');
    this.removeAllListeners('unHighlight');
    this.removeAllListeners('setToken');
  }

  over = () => {
    this.emit('squareOver', this.position);
  }

  out = () => {
    this.emit('squareOut', this.position);
  }

  up = () => {
    this.emit('squareUp', this.position);
  }
}

class AlreadyOccupiedError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = 'AlreadyOccupiedError';
  }
}