import { nanoid } from "nanoid";

export type ERROR_SEVERITY = "FATAL" | "ERROR" | "WARNING";

type ErrorName =
  | "AppError"
  | "DatabaseError"
  | "NotFoundError"
  | "ValidationError"
  | "NavigationError"
  | "AuthError"
  | "APIError"
  | "NotificationError";
export class CustomError extends Error {
  private _errorUUID: string;
  private _eventTime: number;
  name: ErrorName;
  stack: string;
  severity: ERROR_SEVERITY;
  context?: any;
  constructor(
    message: any,
    options: {
      name?: ErrorName;
      severity?: ERROR_SEVERITY;
      stack?: any;
      context?: any;
    } = undefined
  ) {
    super(message);
    this._errorUUID = nanoid();
    this._eventTime = new Date().getTime();
    if (options) {
      this.severity = options.severity ?? "FATAL";
      this.name = options.name ?? "AppError";
      this.context = options.context ? options.context : "";
    }
  }
  public get errorUUID() {
    return this._errorUUID;
  }

  public get eventTime() {
    return this._eventTime;
  }
}
