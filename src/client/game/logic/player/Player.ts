import Token from "./Token";

export default class Player {
  readonly name: string;
  readonly token: Token;

  constructor(name: string, token: Token) {
    this.name = name;
    this.token = token;
  }
}