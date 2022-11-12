import { DeviceInfo } from "@capacitor/device";
import { ScreenType } from "./display";
interface ClientDeviceInfo extends Partial<DeviceInfo> {
  screen?: ScreenType;
}

interface Cookies {
  installed: boolean;
  cookieAgreement: boolean;
}

type InstallCookie = {
  lastPrompt: number;
  status: "new" | "dissmissed" | "installed";
};

type NotificationSchedule = {
  year: number;
  month: number;
  date: number;
  hour: number;
  minute: number;
  second: number;
};

export {
  ClientDeviceInfo,
  ScreenType,
  InstallCookie,
  Cookies,
  NotificationSchedule,
};
