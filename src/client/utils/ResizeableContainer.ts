import { Container, DisplayObject } from "pixi.js";

interface Resizeable extends DisplayObject {
  resize: (width: number, heigh: number) => void;
}

function isResizeable(obj: DisplayObject): obj is Resizeable {
  return (obj as Resizeable).resize !== undefined;
}

export default class ResizeableContainer extends Container implements Resizeable {
  private resizeables: Resizeable[] = [];
  private static defaultSize = { width: 0, height: 0 };

  public static setDefaultSize(width: number, height: number) {
    this.defaultSize = { width, height };
  }

  public resize(width: number, heigh: number) {
    this.resizeables.forEach(r => r.resize(width, heigh));
  };

  public addChild<TChildren extends DisplayObject[]>(...child: TChildren) {
    child.forEach(c => {
      if (isResizeable(c)) {
        c.resize(ResizeableContainer.defaultSize.width, ResizeableContainer.defaultSize.height);
        this.resizeables.push(c);
      }
    })

    return super.addChild(...child);
  }

  private removeFromResizeables(...child: DisplayObject[]) {
    this.resizeables = this.resizeables.filter(r => !child.includes(r));
  }

  public removeChild<TChildren extends DisplayObject[]>(...child: TChildren) {
    this.removeFromResizeables(...child);
    return super.removeChild(...child);
  }

  public removeChildAt(index: number) {
    const removedChild = super.removeChildAt(index);
    this.removeFromResizeables(removedChild);
    return removedChild;
  }

  public removeChildren(beginIndex = 0, endIndex = super.children.length) {
    const removedChildren = super.removeChildren(beginIndex, endIndex);
    this.removeFromResizeables(...removedChildren);
    return removedChildren;
  }
}