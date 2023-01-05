import { Subjects } from "./index";
interface ExpirationCompleteType {
  subject: Subjects;
  data: {
    order_id: string;
  };
}

export { ExpirationCompleteType };
