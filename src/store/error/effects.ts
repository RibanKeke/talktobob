import { nanoid } from "nanoid";
import { setState, state, STATES } from "..";
import { APP_CONFIG } from "../../config";
import { CustomError } from "../../utils/error";
import { logger } from "../../utils/logger";
import { logException } from "../../utils/sentry";

function reportError(
  stateName: STATES,
  customError: CustomError & Error,
  effect: string
) {
  const reportedError = customError.errorUUID
    ? customError
    : new CustomError(customError.message, {
      name: customError.name,
      stack: customError.stack,
    });
  setState(
    "ERROR",
    {
      ERROR: {
        ...state.ERROR,
        latestEventTime: reportedError.eventTime ?? new Date().getTime(),
        latestErrorUUID: reportedError.errorUUID ?? nanoid(),
        stateName: stateName,
        errors: [...state.ERROR.errors, reportedError],
      },
    },
    effect
  );
  logException(
    reportedError,
    "USER",
    APP_CONFIG.environment === "staging" ||
    APP_CONFIG.environment === "production",
    state.DEVICE
  );
  if (APP_CONFIG.environment === "test") {
    logger.log("Error:", reportedError);
  }
}
export { reportError };
