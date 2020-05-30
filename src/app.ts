import { Application } from 'pixi.js';
import Game from './game/Game'
import './style/index.css';

const canvas: HTMLCanvasElement = document.querySelector('#c');
const app = new Application({ view: canvas });

const game = new Game(app);

function resizeRendererToDisplaySize(renderer: PIXI.AbstractRenderer) {
  const canvas = renderer.view;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const needResize = canvas.width !== width || canvas.height !== height;
  if (needResize) {
    renderer.resize(width, height);
  }
}

window.addEventListener('resize', () => resizeRendererToDisplaySize(app.renderer));
resizeRendererToDisplaySize(app.renderer);