import { Subjects } from "./index";
interface TicketUpdatedType {
  subject: Subjects;
  data: {
    id: Number;
    title: String;
    desc: String;
    price: String;
    version: Number;
  };
}

export { TicketUpdatedType };
