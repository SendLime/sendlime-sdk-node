export default class Logger {
  static sendError(errorMessage: string) {
    throw new Error(errorMessage);
  }
}
