import {
  Publisher,
  ExpirationCompleteType,
  Subjects,
} from "@jeffery_microservice/common";

class ExpirationCompletePublisher extends Publisher<ExpirationCompleteType> {
  type = Subjects.ExpirationComplete;
}

export { ExpirationCompletePublisher };
