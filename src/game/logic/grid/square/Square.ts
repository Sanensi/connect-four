import Token from "../../player/Token";
import SquareObservableGraphics from "./SquareObservableGraphics";
import SquareObservableLogic from "./SquareObservableLogic";
import { Point } from "pixi.js";

export default class Square implements SquareObservableLogic, SquareObservableGraphics {
  private position: Point;
  private token: Token;

  onHighlight: (color: number) => void;
  onUnHighlight: () => void;
  onSetToken: (color: number) => void;

  onOver: (p: Point) => void;
  onOut: (p: Point) => void;
  onUp: (p: Point) => void;

  get hasToken() {
    return this.token !== undefined;
  }

  constructor(position: Point) {
    this.position = position;
  }
  
  highlight = (color: number) => {
    this.onHighlight(color);
  }

  UnHighlight = () => {
    this.onUnHighlight();
  }

  setToken = (token: Token) => {
    if (this.hasToken) {
      throw new AlreadyOccupiedError(`Square at ${this.position} already has a token`);
    }
    this.token = token;
    this.onSetToken(0xff0000);
  }

  over = () => {
    this.onOver(this.position);
  }

  out = () => {
    this.onOut(this.position);
  }

  up = () => {
    this.onUp(this.position);
  }
}

class AlreadyOccupiedError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = 'AlreadyOccupiedError';
  }
}