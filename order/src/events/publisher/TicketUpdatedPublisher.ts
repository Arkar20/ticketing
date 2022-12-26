import {
  Publisher,
  Subjects,
  TicketUpdatedType,
} from "@jeffery_microservice/common";

class TicketUpdatedPublisher extends Publisher<TicketUpdatedType> {
  type = Subjects.TicketUpdated;
}

export { TicketUpdatedPublisher };
