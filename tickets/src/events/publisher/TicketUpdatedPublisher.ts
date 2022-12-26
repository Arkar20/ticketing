import {
  Publisher,
  Subjects,
  TicketUpdatedType,
} from "@jeffery_microservice/common";

class TicketCreatedPublisher extends Publisher<TicketUpdatedType> {
  type = Subjects.TicketUpdated;
}

export { TicketCreatedPublisher };
