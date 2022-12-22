import { Publisher } from "./Publisher";
import { Subjects } from "./subjects-type";
import { TicketCreatedType } from "./TicketCreatedType";

class TicketCreatePublisher extends Publisher<TicketCreatedType> {
  type = Subjects.TicketCreated;
}
export { TicketCreatePublisher };
