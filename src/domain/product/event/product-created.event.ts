import { IEvent } from "../../@Shared/event/event.interface";

type ProductCreatedEventData = any;

export class ProductCreatedEvent implements IEvent {
  dateTimeOccurred: Date;
  eventData: ProductCreatedEventData;

  constructor(eventData: ProductCreatedEventData) {
    this.dateTimeOccurred = new Date();
    this.eventData = eventData;
  }
}
