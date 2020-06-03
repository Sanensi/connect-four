import Token from "../../player/Token";
import { Point } from "pixi.js";

export default interface SquareObservableLogic {
  hasToken: boolean;

  onOver: (p: Point) => void;
  onOut: (p: Point) => void;
  onUp: (p: Point) => void;

  highlight(color: number): void;
  UnHighlight(): void;
  setToken(token: Token): void;
}