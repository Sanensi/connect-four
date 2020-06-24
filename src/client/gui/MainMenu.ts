import { Container, TextStyle, Text } from "pixi.js";
import Button from "./Button";

export default class MainMenu extends Container {
  private baseStyle = new TextStyle({
    fontFamily: 'Arial',
    fontSize: 46,
    fontStyle: 'italic',
    fontWeight: 'bold',
    fill: ['#ffffff', '#00ff99'],
    stroke: '#4a1850',
    strokeThickness: 5,
    lineJoin: 'round',
    dropShadow: true,
    dropShadowColor: '#000000',
    dropShadowBlur: 4,
    dropShadowAngle: Math.PI / 6,
    dropShadowDistance: 6,
    align: 'center',
  });

  private buttonStyle = new TextStyle({
    ...this.baseStyle,
    strokeThickness: 5,
    fontSize: 32,
  });
  private hoveredStyle = new TextStyle({
    ...this.buttonStyle,
    fill: ['#ff1010', '#801010'],
  });

  constructor() {
    super();

    const padding = 5;

    const title = new Text('Connect-Four', this.baseStyle);
    const localMpBtn = new Button('Local Multiplayer', this.buttonStyle, this.hoveredStyle);
    const onlineMpBtn = new Button('Online Multiplayer', this.buttonStyle, this.hoveredStyle);

    localMpBtn.on('pressed', () => {
      this.emit('play', 'local');
    });
    onlineMpBtn.on('pressed', () => {
      this.emit('play', 'online');
    });

    localMpBtn.pivot.set(localMpBtn.width/2, 0);
    onlineMpBtn.pivot.set(onlineMpBtn.width/2, 0);

    localMpBtn.position.set(title.width/2, title.height + 5*padding);
    onlineMpBtn.position.set(title.width/2, localMpBtn.y + localMpBtn.height + padding);

    this.addChild(
      title,
      localMpBtn,
      onlineMpBtn
    );

    this.pivot.set(this.width / 2, this.height / 2);
  }

  public resize(width: number, height: number) {
    this.position.set(width/2, height/2);
  }
}