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
