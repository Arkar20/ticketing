import { Subjects } from "./index";
interface TicketCreatedType {
  subject: Subjects;
  data: {
    id: string;
    title: string;
    desc: string;
    price: number;
    version: number;
  };
}

export { TicketCreatedType };
