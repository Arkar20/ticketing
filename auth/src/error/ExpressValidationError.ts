import ErrorHandler from "./ErrorHandler";
import { ValidationError } from "express-validator";
class ExpressValidationError extends ErrorHandler {
  type = "Express Validator";

  constructor(public errors: ValidationError[]) {
    super();
    Object.setPrototypeOf(this, ExpressValidationError.prototype);
  }

  seralize() {
    return this.errors.map((err) => {
      return { message: err.msg, field: err.param };
    });
  }
}
export default ExpressValidationError;
