import ErrorHandler from "./ErrorHandler";
class Unauthorize extends ErrorHandler {
  type = "Express Validator";

  constructor(public reason: string) {
    super();
    Object.setPrototypeOf(this, Unauthorize.prototype);
  }

  seralize() {
    return [{ message: this.reason }];
  }
}
export default Unauthorize;
