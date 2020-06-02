import Token from "../player/Token";

export default class Square {
  private position: { x: number; y: number; };
  private token: Token;

  public get hasToken() {
    return this.token !== undefined;
  }

  constructor(x: number, y: number) {
    this.position = {x, y};
  }

  setToken(token: Token) {
    if (this.hasToken) {
      throw new AlreadyOccupiedError(`Square at ${this.position} already has a token`);
    }
    this.token = token;
  }
}

class AlreadyOccupiedError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = 'AlreadyOccupiedError';
  }
}