/**
 * Author: Robert Banziziki Muhire
 * Date: 31/07/2020
 */
import * as logger from "loglevel";
import { Observable, tap } from "rxjs";
import { APP_CONFIG } from "../config";

const logDebug = (
  appModule: string,
  origin: string,
  type: "params" | "return" | "emit",
  data: unknown
) => {
  logger.debug(
    `%c DEBUG:%c ${appModule} - %c ${origin} %c ${type}: `,
    "color:white; font-weight:bold; background-color: #D72638",
    "color:white; font-weight:bold; background-color: #1D1A05",
    "color:black; font-weight:bold; background-color: #7fb069",
    `color:white; background-color: ${type === "params" ? "#0d3b66" : type === "return" ? "#ee964b" : "yellow"
    }`,
    data
  );
};

const app_config = APP_CONFIG;
switch (app_config.environment) {
  case "production":
    logger.setLevel("WARN");
    break;
  case "staging":
    logger.setLevel("INFO");
    break;
  case "test":
    logger.setLevel("TRACE");
  default:
    logger.setLevel("DEBUG");
    break;
}

const logWatch = (
  target: Object,
  propertyKey: string,
  descriptor: PropertyDescriptor
) => {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args) {
    logDebug(target.constructor.name, propertyKey, "params", { args });
    const result = originalMethod.apply(this, args);
    if (result && (result as Object).constructor.name === "Observable") {
      return (result as unknown as Observable<any>).pipe(
        tap((data) =>
          logDebug(target.constructor.name, propertyKey, "emit", {
            result: data,
            target,
          })
        )
      );
    }
    logDebug(target.constructor.name, propertyKey, "return", {
      result,
      target,
    });
    return result;
  };

  return descriptor;
};

export { logger, logDebug, logWatch };
