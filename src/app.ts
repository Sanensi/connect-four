import * as PIXI from 'pixi.js';
import gameLoop from './game/gameLoop'
import './style/index.css';

const canvas: HTMLCanvasElement = document.querySelector('#c');
const app = new PIXI.Application({ view: canvas });

app.ticker.add(gameLoop);

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