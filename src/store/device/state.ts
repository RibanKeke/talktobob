import { onChange } from "..";
import { APP_CONFIG } from "../../config";
import {
  ClientDeviceInfo,
  InstallCookie,
} from "../../services/Device/Device.interface";

interface DeviceState extends ClientDeviceInfo {
  env: string;
  initialized: boolean;
  cookieAgreement: boolean;
  languageCode: string;
}

const defaulteDeviceState: DeviceState = {
  initialized: false,
  cookieAgreement: false,
  languageCode: 'EN',
  env: APP_CONFIG.environment,
};

function onCookieUpdate(handler: (cookieAgreement: boolean) => void) {
  return onChange("DEVICE", (newState) => {
    handler(newState.cookieAgreement);
  });
}

export { defaulteDeviceState, DeviceState, InstallCookie, onCookieUpdate };
