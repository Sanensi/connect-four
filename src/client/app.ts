import { Application } from 'pixi.js';
import './style/index.css';
import GameFactory from './game/GameFactory';

const canvas: HTMLCanvasElement = document.querySelector('#c');
const app = new Application({ view: canvas });

const game = new GameFactory().createGame(app, 7, 6);

window.addEventListener('resize', game.resize);