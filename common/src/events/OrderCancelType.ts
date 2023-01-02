import { Subjects } from "./index";
interface OrderCancelType {
  subject: Subjects;
  data: {
    id: string;
    version: number;
    ticket: {
      id: string;
      title: string;
      desc: string;
      price: number;
    };
  };
}

export { OrderCancelType };
