import { Application } from 'pixi.js';
import Game from './game/Game'
import './style/index.css';

const canvas: HTMLCanvasElement = document.querySelector('#c');
const app = new Application({ view: canvas });

const game = new Game(app);

window.addEventListener('resize', game.resize);