
export default class Token {
  readonly baseColor: number;
  readonly highlightColor: number;

  constructor(baseColor: number, highlightColor: number) {
    this.baseColor = baseColor;
    this.highlightColor = highlightColor;
  }
}