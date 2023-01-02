import { Subjects } from "./index";
interface OrderCreateType {
  subject: Subjects;
  data: {
    id: string;
    version: number;
    user_id: string;
    status: string;
    expire_at: string;
    ticket: {
      id: string;
      title: string;
      desc: string;
      price: number;
    };
  };
}

export { OrderCreateType };
