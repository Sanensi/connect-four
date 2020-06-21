import { Container, TextStyle, Text } from "pixi.js";

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

  private title = new Text('Connect-Four', this.baseStyle);
  private localMP = new Text('Local Multiplayer', this.buttonStyle);
  private onlineMP = new Text('Online Multiplayer', this.buttonStyle);

  constructor() {
    super();

    this.localMP.pivot.set(this.localMP.width/2, 0);
    this.onlineMP.pivot.set(this.onlineMP.width/2, 0);

    this.localMP.interactive = true;
    this.localMP.buttonMode = true;
    this.onlineMP.interactive = true;
    this.onlineMP.buttonMode = true;

    this.localMP.addListener('pointerover', () => {
      this.localMP.style = this.hoveredStyle;
    });
    this.localMP.addListener('pointerout', () => {
      this.localMP.style = this.buttonStyle;
    });
    this.localMP.addListener('pointerup', () => {
      this.emit('play', 'local');
    });

    this.onlineMP.addListener('pointerover', () => {
      this.onlineMP.style = this.hoveredStyle;
    });
    this.onlineMP.addListener('pointerout', () => {
      this.onlineMP.style = this.buttonStyle;
    });
    this.onlineMP.addListener('pointerup', () => {
      this.emit('play', 'online');
    });
  }

  public show() {
    const padding = 5;

    this.localMP.position.set(this.title.width/2, this.title.height + 5*padding);
    this.onlineMP.position.set(this.title.width/2, this.localMP.y + this.localMP.height + padding);

    this.addChild(
      this.title,
      this.localMP,
      this.onlineMP
    );

    this.pivot.set(this.width / 2, this.height / 2);
  }

  public hide() {
    this.removeChildren();
  }

  public resize(width: number, height: number) {
    this.position.set(width/2, height/2);
  }
}