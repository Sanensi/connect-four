import Token from "./Token";

export default class Player {
  readonly token: Token;

  constructor(token: Token) {
    this.token = token;
  }
}