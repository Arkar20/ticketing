import {
  Publisher,
  PaymentCreateType,
  Subjects,
} from "@jeffery_microservice/common";

export class PaymentCreatePublisher extends Publisher<PaymentCreateType> {
  type: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
