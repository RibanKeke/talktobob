import { Observable } from "rxjs";

/**
 * Author: Robert Banziziki Muhire
 * Date: 18/02/2021
 */

type ScreenType =
  | "mobile"
  | "tablet"
  | "laptop"
  | "xl_device"
  | "not_supported";

type Screen = [ScreenType, number];

const DEVICE_SCREENS: Array<Screen> = [
  ["mobile", 576],
  ["tablet", 768],
  ["laptop", 992],
  ["xl_device", 1200],
  ["not_supported", null],
];

function displayWindowSize(width: number): ScreenType {
  let previousSize: number;
  for (const screen of DEVICE_SCREENS) {
    const [name, size] = screen;
    if (width < size) {
      return name;
    }
    if (previousSize && width > previousSize && width < size) {
      return name;
    }
    if (name === "not_supported") {
      return "not_supported";
    }
  }
}

function screenTypeObservable() {
  const networkStatusChangeObservable = new Observable<ScreenType>(function (
    observer
  ) {
    if (window) {
      observer.next(displayWindowSize(window.innerWidth));
      window.addEventListener("resize", () => {
        const width = window.innerWidth;
        observer.next(displayWindowSize(width));
      });
    } else {
      observer.next("not_supported");
    }
  });
  return networkStatusChangeObservable;
}

export { screenTypeObservable, ScreenType };
