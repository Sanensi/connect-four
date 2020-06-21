import { Application } from 'pixi.js';
import './style/index.css';
import GameFactory from './game/GameFactory';

const canvas: HTMLCanvasElement = document.querySelector('#c');
const app = new Application({ view: canvas });

const game = new GameFactory().createGame(7, 6);
app.stage.addChild(game);

function resize() {
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;

  app.renderer.resize(width, height);
  game.resize(width, height);
}

window.addEventListener('resize', resize);
resize();