import { Container, Graphics, TextStyle, Text } from "pixi.js";
import Player from "../game/logic/player/Player";
import Button from "./Button";

export default class WinnerWindow extends Container {
  private style = new TextStyle({
    fontFamily: 'Arial',
    fontSize: 36,
    fontStyle: 'italic',
    fontWeight: 'bold',
    fill: ['#ffffff', '#00ff99'],
    stroke: '#4a1850',
    strokeThickness: 5,
    dropShadow: true,
    dropShadowColor: '#000000',
    dropShadowBlur: 4,
    dropShadowAngle: Math.PI / 6,
    dropShadowDistance: 6,
    align: 'center',
  });

  private hoveredStyle = new TextStyle({
    ...this.style,
    fill: ['#ff1010', '#801010'],
  });

  constructor(winner: Player) {
    super();

    const padding = 5;

    const winnerText = new Text(`${winner.name} has won the game!`, this.style);
    const playAgainBtn = new Button('Play again?', this.style, this.hoveredStyle);

    playAgainBtn.on('pressed', () => {
      this.emit('playAgain');
    });

    const windowBase = this.createWindowBase(
      winnerText.width + 2 * padding,
      winnerText.height + playAgainBtn.height + 3 * padding
    );

    winnerText.pivot.set(winnerText.width / 2, 0);
    winnerText.position.set(windowBase.width / 2, padding);

    playAgainBtn.pivot.set(playAgainBtn.width / 2, 0);
    playAgainBtn.position.set(windowBase.width / 2, winnerText.height + 2 * padding);

    this.addChild(
      windowBase,
      winnerText,
      playAgainBtn
    );  

    this.pivot.set(this.width / 2, this.height / 2);
  }

  private createWindowBase(width: number, height: number) {
    const windowBase = new Graphics();

    windowBase.lineStyle(2, 0x8080C0);
    windowBase.beginFill(0x101080);
    windowBase.drawRoundedRect(
      0, 0,
      width, height,
      16
    );
    windowBase.endFill();

    return windowBase;
  }

  public resize = (width: number, height: number) => {
    this.position.set(width / 2, height / 2);
  }
}