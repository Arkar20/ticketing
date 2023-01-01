import { Ticket } from "../index";

it("implements concurrency issue with version the tickets", async () => {
  const ticket = await Ticket.build({
    title: "ticket version",
    desc: "desc version",
    price: "40",
  }).save();

  const firstInstance = await Ticket.findById(ticket.id);
  const secondInstance = await Ticket.findById(ticket.id);

  await firstInstance!.set({ price: "20" }).save();

  try {
    await secondInstance!.set({ price: "90" }).save();
  } catch (err) {
    return;
  }
});
