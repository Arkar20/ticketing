import { Subjects } from "./subjects-type";

export interface PaymentCreateType {
  subject: Subjects.PaymentCreated;
  data: {
    id: string;
    order_id: string;
    stripe_id: string;
  };
}
