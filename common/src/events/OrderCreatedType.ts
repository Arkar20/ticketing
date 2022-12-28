import { Subjects } from "./index";
interface OrderCreateType {
  subject: Subjects;
  data: {
    id: String;
    user_id: String;
    status: String;
    expire_at: String;
    ticket: {
      id: String;
      title: String;
      desc: String;
      price: String;
    };
  };
}

export { OrderCreateType };
