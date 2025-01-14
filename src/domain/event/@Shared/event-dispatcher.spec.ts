describe("Domain Event Dispatcher", () => {
  it("Should register an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductCreatedHandler();

    eventDispatcher.register("ProductCreated", eventHandler);

    expect(eventDispatcher.getEventHandlers["ProductCreated"]).toBeDefined();
    expect(eventDispatcher.getEventHandlers["ProductCreated"].length).toBe(1);
  });
});
