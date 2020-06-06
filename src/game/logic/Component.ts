import { EventEmitter } from "events";

export default class Component extends EventEmitter {
  private parent: Component;

  constructor(...childs: Component[]) {
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
  emit(eventName: string | symbol , ...args) {
    return super.emit(eventName, ...args) || this.parent.emit(eventName, ...args);
  }
}