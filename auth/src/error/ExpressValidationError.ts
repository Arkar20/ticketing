import ErrorHandler from "./ErrorHandler";
import { ValidationError } from "express-validator";
class ExpressValidationError extends ErrorHandler {
  type = "Express Validator";
  statusCode = 400;
  constructor(public errors: ValidationError[]) {
    super();
    Object.setPrototypeOf(this, ExpressValidationError.prototype);
  }

  seralize() {
    return this.errors.map((err) => {
      return { message: err.msg };
    });
  }
}
export default ExpressValidationError;
