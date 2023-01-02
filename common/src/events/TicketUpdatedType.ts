import { Subjects } from "./index";
interface TicketUpdatedType {
  subject: Subjects;
  data: {
    id: string;
    title: string;
    desc: string;
    price: string;
    version: number;
    order_id?: string;
  };
}

export { TicketUpdatedType };
