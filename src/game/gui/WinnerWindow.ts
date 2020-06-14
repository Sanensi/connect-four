import { Container, Graphics, TextStyle, Text } from "pixi.js";
import Player from "../logic/player/Player";

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

  private playAgainText = new Text('Play again?', this.style);

  constructor() {
    super();

    this.playAgainText.interactive = true;
    this.playAgainText.buttonMode = true;
    
    this.playAgainText.addListener('pointerover', () => {
      const newStyle = this.style.clone();
      newStyle.fill = ['#ff1010', '#801010'];
      this.playAgainText.style = newStyle;
    });

    this.playAgainText.addListener('pointerout', () => {
      this.playAgainText.style = this.style;
    });

    this.playAgainText.addListener('pointerup', () => {
      this.emit('playAgain');
    });
  }

  public show(winner: Player) {
    const padding = 5;

    const winnerText = new Text(`${winner.name} has won the game!`, this.style);
    winnerText.position.set(padding, padding);

    this.playAgainText.pivot.set(this.playAgainText.width / 2, 0);
    this.playAgainText.position.set(winnerText.width / 2 + padding, winnerText.height + 2 * padding);

    const windowBase = new Graphics();
    windowBase.lineStyle(2, 0x8080C0);
    windowBase.beginFill(0x101080);
    windowBase.drawRoundedRect(
      0, 0,
      winnerText.width + 2 * padding,
      winnerText.height + this.playAgainText.height + 3 * padding,
      16
    );
    windowBase.endFill();
    
    this.addChild(
      windowBase,
      winnerText,
      this.playAgainText
    );

    this.pivot.set(this.width / 2, this.height / 2);
  }

  public hide() {
    this.removeChildren();
  }

  public resize = (width: number, height: number) => {
    this.position.set(width / 2, height / 2);
  }
}