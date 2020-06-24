import { Container, TextStyle, Text } from "pixi.js";

export default class Button extends Container {

  constructor(text: string, baseStyle: TextStyle, hoveredStyle: TextStyle) {
    super();

    const content = new Text(text, baseStyle);

    content.interactive = true;
    content.buttonMode = true;

    content.addListener('pointerover', () => {
      content.style = hoveredStyle;
    });
    content.addListener('pointerout', () => {
      content.style = baseStyle;
    });
    content.addListener('pointerup', () => {
      this.emit('pressed');
    });
    this.addChild(content);
  }
}