import { Subjects } from "./index";
interface OrderCancelType {
  subject: Subjects.OrderCancelled;
  data: {
    id: String;
    ticket: {
      id: String;
      title: String;
      desc: String;
      price: String;
    };
  };
}

export { OrderCancelType };
