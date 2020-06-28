import { connect } from "socket.io-client";
import { GameOptions } from "../game/GameFactory";

const ENDPOINT = `${location.protocol}//${location.hostname}:3000`;

const GameService = {
  createGame(options: GameOptions['grid']) {
    return connect(ENDPOINT);
  },

  joinGame() {
  }
}

export default GameService;