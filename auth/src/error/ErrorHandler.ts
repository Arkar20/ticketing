abstract class ErrorHandler extends Error {
  abstract type: string;

  constructor() {
    super();

    Object.setPrototypeOf(this, ErrorHandler.prototype);
  }

  abstract seralize();
}

export default ErrorHandler;
