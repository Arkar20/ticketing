import {
  Publisher,
  Subjects,
  TicketCreatedType,
} from "@jeffery_microservice/common";

class TicketCreatedPublisher extends Publisher<TicketCreatedType> {
  type = Subjects.TicketCreated;
}

export { TicketCreatedPublisher };
