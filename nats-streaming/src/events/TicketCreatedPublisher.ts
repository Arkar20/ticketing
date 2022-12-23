import {
  TicketCreatedType,
  Subjects,
  Publisher,
} from "@jeffery_microservice/common";

class TicketCreatePublisher extends Publisher<TicketCreatedType> {
  type = Subjects.TicketCreated;
}
export { TicketCreatePublisher };
