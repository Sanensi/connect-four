import { TypedEventEmitter, EventMap, EventKey } from "../../utils/TypedEventEmitter";

export default class Component<E extends EventMap = {}> extends TypedEventEmitter<E> {
  private parent: Component<any>;

  constructor(...childs: Component<any>[]) {
    super();
    
    childs.forEach(child => {
      child.parent = this;
    });
  }

  /**
   * Synchronously calls each of the listeners registered for the event named eventName,
   * in the order they were registered, passing the supplied arguments to each.
   * 
   * If this component is not listening to this event, then it propagates it to it's parent.
   */
  emit<K extends EventKey<E>>(eventName: K, params: E[K]) {
    return super.emit(eventName, params) || this.parent.emit(eventName, params);
  }
}