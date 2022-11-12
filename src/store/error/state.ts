import { onChange, state } from "..";
import { CustomError } from "../../utils/error";

type ErrorState = {
  latestEventTime: number;
  latestErrorUUID: string;
  stateName: string;
  errors: Array<CustomError>;
  maxErrorHistory: number;
};

const defaultState: ErrorState = {
  latestEventTime: null,
  latestErrorUUID: null,
  stateName: null,
  errors: [],
  maxErrorHistory: 10,
};

function onErrorUpdate(handler: (errorId: string) => void) {
  return onChange("ERROR", (newState) => {
    const latestError = newState.errors.find(
      (e) => e.errorUUID === newState.latestErrorUUID
    );
    if (latestError) {
      if (state.DEVICE.env === "local" || state.DEVICE.env === "staging") {
        handler(latestError.errorUUID);
      }
    }
  });
}

export { defaultState, ErrorState, onErrorUpdate };
