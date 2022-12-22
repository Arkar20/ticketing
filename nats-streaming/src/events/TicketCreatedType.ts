import { Subjects } from "./index";
interface TicketCreatedType {
  subject: Subjects;
  data: {
    id: Number;
    title: String;
    desc: String;
  };
}

export { TicketCreatedType };
