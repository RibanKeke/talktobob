import { CustomError } from "./error";
import * as Sentry from "@sentry/browser";
import { logger } from "./logger";

export function logException(
  error: CustomError,
  state: string,
  reportEnabled: boolean,
  deviceInfo?: any
) {
  if (reportEnabled) {
    Sentry.captureException(error, {
      extra: {
        state: state,
        deviceInfo,
        context: error.context,
        errorStack: error,
      },
    });
  } else {
    logger.warn("Local development: Sentry reporting is skipped");
  }
}

function initSentry(sentryConfig: {
  dsn: string;
  environment: string;
  debug: boolean;
}) {
  logger.info("Initialized sentry ENV:" + sentryConfig.environment);
  Sentry.init(sentryConfig);
}

export { initSentry };