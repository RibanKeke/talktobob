import * as R from "ramda";

import { createStore } from "@stencil/store";

import { Navigation } from "../services/Navigation/Navigation.interface";
import { defaulteDeviceState, DeviceState } from "./device/state";
import { defaultState as defaultErrorState, ErrorState } from "./error/state";
import { defaultNavigationState } from "./navigation/state";
import { detailedDiff } from "deep-object-diff";
import { logger } from "../utils/logger";
import { defaultSiteViewsState, SiteViews } from "./views/site/site.views";

type Mapped<T> = ReadonlyMap<string, T>;
type View<T> = Readonly<T>;

interface AppState {
  DEVICE: Readonly<DeviceState>;
  VIEWS: Readonly<SiteViews>;
  ERROR: Readonly<ErrorState>;
  NAVIGATION: Readonly<Navigation>;
}

type STATES = keyof AppState;

function getInitialState(): AppState {
  return {
    ERROR: defaultErrorState,
    DEVICE: defaulteDeviceState,
    VIEWS: { ...defaultSiteViewsState },
    NAVIGATION: defaultNavigationState,
  };
}

function logStateUpdate(propChanged: string, newValue: any, oldValue: any) {
  if (state.DEVICE.env === "production") {
    console.warn("Production: State update logger is disabled");
    return;
  }

  if (propChanged === "ERROR") {
    logger.info(
      `%c STATE: ${propChanged} - %c WILL UPDATE `,
      "color:white; font-weight:bold; background-color: red",
      "color:white; background-color: gray; font-weight: bold"
    );
    logger.info(oldValue);
  } else {
    logger.info(
      `%c STATE: ${propChanged} - %c WILL UPDATE `,
      "color:white; font-weight:bold; background-color: blue",
      "color:white; background-color: green; font-weight: bold"
    );
    logger.info(oldValue);
  }
  const stateDiff = detailedDiff(oldValue, newValue);
  const addedKeys = R.keys(stateDiff["added"]);
  const deletedKeys = R.keys(stateDiff["deleted"]);
  const updatedKeys = R.keys(stateDiff["updated"]);

  if (addedKeys?.length > 0) {
    for (let addedKey of addedKeys) {
      logger.info(
        `%c ADDED: %c ${addedKey as string} `,
        "color:white; font-weight:bold; background-color: green",
        "color:white; font-weight:bold; background-color: grey"
      );
      console.table(stateDiff["added"][addedKey]);
    }
  }
  if (updatedKeys?.length > 0) {
    for (let updateKey of updatedKeys) {
      logger.info(
        `%c UPDATED: %c ${updateKey as string} `,
        "color:white; font-weight:bold; background-color: orange",
        "color:white; font-weight:bold; background-color: grey"
      );
      logger.info(
        `%c Previous:`,
        "color:white; font-weight:bold; background-color: lightCoral"
      );
      console.table(stateDiff["updated"][updateKey]);

      logger.info(
        `%c Next:`,
        "color:white; font-weight:bold; background-color: lightGreen"
      );
      console.table(oldValue[updateKey]);
    }
  }

  if (deletedKeys?.length > 0) {
    for (let deleteKey of addedKeys) {
      logger.info(
        `%c DELETED: %c ${deleteKey as string} `,
        "color:red; font-weight:bold; background-color: lightgray",
        "color:white; font-weight:bold; background-color: grey"
      );
      console.table(stateDiff["deleted"][deleteKey]);
    }
  }
}

const shouldUpdate = (
  newValue: Readonly<Object>,
  oldValue: Readonly<Object>,
  propChanged: STATES
): boolean => {
  if (R.equals(oldValue, newValue)) {
    logger.info(
      `%c STATE: ${propChanged} - %c UPDATE SKIPPED - %c Values unchanged `,
      "color:white; font-weight:bold; background-color: blue",
      "color:black; background-color: yellow",
      "color:white; background-color: gray",
      { [propChanged]: oldValue }
    );
    return false;
  } else {
    logStateUpdate(propChanged, oldValue, newValue);
    return true;
  }
};

const { state, onChange, reset } = createStore<AppState>(
  getInitialState(),
  shouldUpdate
);

function setState(
  stateName: keyof AppState,
  data: Partial<AppState>,
  effect: string
) {
  logger.info("Change origin: " + effect);
  state[stateName] = R.clone(data[stateName] as Readonly<any>);
}

export { state, onChange, setState, STATES, Mapped, View, reset as resetStore };
