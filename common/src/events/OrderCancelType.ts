import { Subjects } from "./index";
interface OrderCancelType {
  subject: Subjects;
  data: {
    id: String;
    version: Number;
    ticket: {
      id: String;
      title: String;
      desc: String;
      price: String;
    };
  };
}

export { OrderCancelType };
