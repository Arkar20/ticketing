import { Subjects } from "./index";
interface TicketCreatedType {
  subject: Subjects;
  data: {
    id: String;
    title: String;
    desc: String;
    price: String;
  };
}

export { TicketCreatedType };
