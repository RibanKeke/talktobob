import { string, pattern, Struct, validate } from "superstruct";
import { CustomError } from "./error";

const genericPattern = (regExp: RegExp) => pattern(string(), regExp);

function validateStruct<Y>(
  rawData: any,
  struct: Struct<Y>,
  entityName:string,
  coerce: Array<{ field: keyof Y; transform: (value: unknown) => unknown }> = []
): Y {
  for (const modifier of coerce) {
    rawData = {
      ...rawData,
      [modifier.field]: modifier.transform(rawData[modifier.field]),
    };
  }
  const [err, valid] = validate(rawData, struct);
  if (err) {
    const validationError = new CustomError(` [ ${entityName}:${rawData?.id} ] - ${err.message}`, {
      name: "ValidationError",
      context: `${err.path} - ${err.failures}`,
      stack: err.stack,
      severity: "ERROR",
    });
    throw validationError;
  }
  return valid;
}

export { genericPattern, validateStruct };
