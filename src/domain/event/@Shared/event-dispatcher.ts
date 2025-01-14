import { IEventDispatcher } from "./event-dispatcher.interface";
import { IEventHandler } from "./event-handler.interface";
import { IEvent } from "./event.interface";

export class EventDispatcher implements IEventDispatcher {
  private eventHandlers: { [key: string]: IEventHandler[] };

  constructor() {
    this.eventHandlers = {};
  }

  register(eventName: string, handler: IEventHandler): void {
    if (!this.eventHandlers[eventName]) {
      this.eventHandlers[eventName] = [];
    }
    this.eventHandlers[eventName].push(handler);
  }

  unregister(eventName: string): void {}

  unregisterAll(): void {}

  notify(event: IEvent): void {}

  get getEventHandlers(): { [key: string]: IEventHandler[] } {
    return this.eventHandlers;
  }
}
