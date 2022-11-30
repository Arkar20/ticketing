import ErrorHandler from "./ErrorHandler";

class DatabaseConnectionError extends ErrorHandler {
  type = "Database Connection";
  reason = "Cannot Connect to Database";
  constructor() {
    super();
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }
  seralize() {
    return [{ message: this.reason }];
  }
}

export default DatabaseConnectionError;
