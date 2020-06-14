import { TypedEventEmitter, EventMap, EventKey } from "../../utils/TypedEventEmitter";

export default class Component<E extends EventMap = {}> extends TypedEventEmitter<E> {
  private parent: Component<any>;

  constructor(...childs: Component<any>[]) {
    super();
    
    childs.forEach(child => {
      child.parent = this;
    });
  }

  emit<K extends EventKey<E>>(eventName: K, params?: E[K], bubbleUp: boolean = false): boolean {
    let wasListened = super.emit(eventName, params);
    if (bubbleUp && !wasListened && this.parent) {
      wasListened = this.parent.emit(eventName, params, bubbleUp);
    }
    return wasListened;
  }
}