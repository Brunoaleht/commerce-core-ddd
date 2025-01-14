import { SendEmailWhenProductCreatedHandler } from "../product/handlers/send-email-when-product-created.handler";
import { EventDispatcher } from "./event-dispatcher";

describe("Domain Event Dispatcher", () => {
  it("Should register an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductCreatedHandler();

    eventDispatcher.register("ProductCreated", eventHandler);

    expect(eventDispatcher.getEventHandlers["ProductCreated"]).toBeDefined();
    expect(eventDispatcher.getEventHandlers["ProductCreated"].length).toBe(1);
  });
});
