import ErrorHandler from "./ErrorHandler";

class BadRequest extends ErrorHandler {
  type = "Database Error";
  statusCode = 400;
  constructor(public reason: string) {
    super();
    Object.setPrototypeOf(this, BadRequest.prototype);
  }
  seralize() {
    return [{ message: this.reason }];
  }
}

export default BadRequest;
