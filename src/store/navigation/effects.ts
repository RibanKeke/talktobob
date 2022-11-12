import { setState } from "../";
import { Navigation } from "../../services/Navigation/Navigation.interface";

function updateDeviceNavigation(data: Navigation, effect: string) {
  setState("NAVIGATION", { NAVIGATION: data }, effect);
}

export { updateDeviceNavigation };
