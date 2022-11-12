/**
 * Author: Robert Banziziki Muhire
 * Date: 31/03/2020
 *
 */

import { combineLatest, from, Observable } from "rxjs";
import { ClientDeviceInfo, Cookies } from "./Device.interface";
import { screenTypeObservable } from "./display";
import { map, switchMap } from "rxjs/operators";
import { LOCALES, SupportedLanguages, DefaultLang } from "../../utils/i8n";
import { keys as Rkeys } from "ramda";
import { storageGet } from "./storage";

function importDevicePlugin() {
  return from(import("@capacitor/device")).pipe(map(({ Device }) => Device));
}

function getLanguageCode(): Observable<SupportedLanguages> {
  return importDevicePlugin().pipe(
    switchMap((device) => device.getLanguageCode()),
    map((lang) => {
      const deviceLanguage = lang.value.slice(0, 2).toUpperCase();
      if (Rkeys(LOCALES).includes(deviceLanguage)) {
        return deviceLanguage as SupportedLanguages;
      } else {
        return DefaultLang;
      }
    })
  );
}

function deviceInfoObservable() {
  const deviceInfo$ = importDevicePlugin().pipe(
    switchMap((device) => device.getInfo())
  );
  const screeType$ = screenTypeObservable();
  const languageCode$ = getLanguageCode();

  return combineLatest([
    deviceInfo$,
    screeType$,
    languageCode$,
  ]).pipe(
    map((deviceData) => {
      const [deviceInfo, screen, languageCode] =
        deviceData;
      const clientDeviceInfo: ClientDeviceInfo = {
        ...deviceInfo,
      };
      clientDeviceInfo.screen = screen;
      return { ...clientDeviceInfo, languageCode };
    })
  );
}

function loadCookiesObservable() {
  return from(storageGet("cookies")).pipe(
    map((cookies: Cookies) => {
      const installed = cookies?.installed ?? false;
      const cookieAgreement = cookies?.cookieAgreement ?? false;
      return { installed, cookieAgreement } as Cookies;
    })
  );
}

export {
  deviceInfoObservable,
  getLanguageCode,
  loadCookiesObservable,
};
