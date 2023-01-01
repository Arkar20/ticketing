import { Subjects } from "./index";
interface TicketCreatedType {
  subject: Subjects;
  data: {
    id: String;
    title: String;
    desc: String;
    price: String;
    version: Number;
  };
}

export { TicketCreatedType };
