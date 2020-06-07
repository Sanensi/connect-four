import { EventEmitter } from "events";

// Credit: https://rjzaworski.com/2019/10/event-emitters-in-typescript
export type EventMap = Record<string, any>;

export type EventKey<T extends EventMap> = string & keyof T;
export type EventReceiver<T> = (params: T) => void;

export interface Receiver<T extends EventMap> {
  emit<K extends EventKey<T>>(eventName: K, params?: T[K]): void;
}

export interface Emitter<T extends EventMap> {
  on<K extends EventKey<T>>(eventName: K, fn: EventReceiver<T[K]>): void;
  off<K extends EventKey<T>>(eventName: K, fn: EventReceiver<T[K]>): void;
}

export class TypedEventEmitter<T extends EventMap> implements Emitter<T>, Receiver<T> {
  private emitter: EventEmitter;

  constructor(emitter: EventEmitter = new EventEmitter()) {
    this.emitter = emitter;
    this.emitter.removeAllListeners()
  }

  emit<K extends EventKey<T>>(eventName: K, params?: T[K]) {
    return this.emitter.emit(eventName, params);
  }

  on<K extends EventKey<T>>(eventName: K, fn: EventReceiver<T[K]>) {
    this.emitter.on(eventName, fn);
  }

  off<K extends EventKey<T>>(eventName: K, fn: EventReceiver<T[K]>) {
    this.emitter.off(eventName, fn);
  }

  removeAllListeners<K extends EventKey<T>>(eventName: K) {
    this.emitter.removeAllListeners(eventName);
  }
}