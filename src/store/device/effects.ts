import { Build } from "@stencil/core";
import { combineLatest } from "rxjs";
import { setState, state } from "..";
import { APP_CONFIG } from "../../config";
import { reportError } from "../error/effects";
import { DeviceState } from "./state";
import { Cookies } from "../../services/Device/Device.interface";
import { storageSet } from "../../services/Device/storage";
import {
  deviceInfoObservable,
  loadCookiesObservable,
} from "../../services/Device/device";

function updateDeviceState(data: Partial<DeviceState>, effect: string) {
  setState("DEVICE", { DEVICE: { ...state.DEVICE, ...data } }, effect);
}

async function initializeSentry() {
  const { logger } = await import("../../utils/logger");
  if (Build.isBrowser) {
    const { initSentry } = await import("../../utils/sentry");
    initSentry({
      dsn: APP_CONFIG.sentry.dsn,
      environment: APP_CONFIG.environment,
      debug: false,
    });
    logger.info("INIT: Initialized sentry");
  }
  logger.info("INIT: Sentry init skipped, pre-render build");
}

async function updateNavigation(
  effect: string
) {
  const { computeSiteNavigation } = await import(
    "../../services/Navigation"
  );
  const { updateDeviceNavigation } = await import("../navigation/effects");

  const { logger } = await import("../../utils/logger");
  updateDeviceNavigation(computeSiteNavigation(), effect);
  logger.info("INIT: Initialized navigation");
}

function initializeApp() {
  const effect = "initializeApp";
  return combineLatest([
    deviceInfoObservable(),
    loadCookiesObservable()
  ]).subscribe({
    next([deviceInfo, cookies]) {
      initializeSentry()
      updateNavigation(effect).then(() => {
        updateDeviceState(
          {
            ...deviceInfo,
            initialized: true,
            languageCode: APP_CONFIG.defaultLanguage,
            cookieAgreement: cookies.cookieAgreement
          },
          effect
        );
      });
    },
    error(err) {
      reportError("DEVICE", err, effect);
    },
  });
}

async function updateCookieAgreement(status: boolean) {
  const effect = "updateCookieAgreement";
  updateDeviceState(
    {
      cookieAgreement: status,
    },
    effect
  );
  await storageSet("cookies", {
    cookieAgreement: state.DEVICE.cookieAgreement,
  } as Cookies);
}
export {
  updateDeviceState,
  initializeApp,
  updateCookieAgreement,
};
