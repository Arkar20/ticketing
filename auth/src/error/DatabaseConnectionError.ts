class DatabaseConnectionError extends Error {
  reason = "Error Connecting To Database!";
  type = "Database Connection";
  constructor() {
    super();
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }
}

export default DatabaseConnectionError;
