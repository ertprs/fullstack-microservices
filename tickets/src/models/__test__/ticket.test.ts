import { Ticket } from "../ticket";

it("should implement optimistic concurrency control", async (done): Promise<
  void
> => {
  const ticket = Ticket.build({ title: "concert", price: 20, userId: "123" });
  await ticket.save();
  const firstInstance = await Ticket.findById(ticket.id);
  const secondInstance = await Ticket.findById(ticket.id);

  firstInstance!.price = 400;
  await firstInstance?.save();

  secondInstance!.price = 200;
  try {
    await secondInstance?.save();
  } catch (error) {
    return done();
  }
  throw new Error("Should not reach this point");
});

it("should increment version number on muliple saves", async (): Promise<
  void
> => {
  const ticket = Ticket.build({
    title: "concert",
    price: 123,
    userId: "jskd"
  });
  await ticket.save();
  const instance = await Ticket.findById(ticket.id);
  instance!.price = 18927;
  await instance?.save();
  expect(instance?.version).toEqual(ticket.version + 1);
});
