import { concatMap, filter, from, map, Subscription } from "rxjs";

import { toastController } from "@ionic/core";
import { Build, Component, Element, h, Listen } from "@stencil/core";
import { state } from "../../store";
import { onErrorUpdate } from "../../store/error/state";

import {
  initializeApp,
  updateCookieAgreement,
} from "../../store/device/effects";
import { reportError } from "../../store/error/effects";

@Component({
  tag: "app-root",
  styleUrl: "app-root.scss",
})
export class AppRoot {
  @Element() el: HTMLElement;

  mfNav: HTMLMfNavigationElement;
  initialize: Subscription;
  installEvent: Event;
  presenting: boolean = false;

  @Listen("cookieAgreement", { target: "window" })
  async listenToCookieAgreement() {
    await updateCookieAgreement(true);
  }

  async bindNavigation() {
    if (Build.isBrowser) {
      await customElements.whenDefined("mf-navigation");
      this.mfNav = this.el.querySelector("mf-navigation");
    }
  }

  componentWillLoad() {
    /* Subscribe to app data only when the app is initialized */
    if (Build.isBrowser) {
      this.initialize = initializeApp();
      onErrorUpdate(async (errorId) => {
        console.log("Navigating to error page.");
        await customElements.whenDefined("mf-navigation");
        this.mfNav = this.el.querySelector("mf-navigation");
        this.mfNav.navigateTo(`/500/${errorId}`);
      });
    }
  }

  componentDidLoad() {
    this.bindNavigation();
  }

  componentDidUpdate() {
    this.bindNavigation();
  }

  /* Check for a new version of the service-worker */
  @Listen("swUpdate", { target: "window" })
  async onSWUpdate() {
    from(navigator.serviceWorker.getRegistration())
      .pipe(
        filter((registration) => !!registration && !!registration.waiting),
        concatMap((registration) => {
          const updateToast = from(
            toastController.create({
              message: "New version available",
              position: "bottom",
              buttons: [
                {
                  text: "Update",
                  role: "cancel",
                },
              ],
            })
          );

          return updateToast.pipe(
            concatMap((toast) =>
              from(toast.present()).pipe(concatMap(() => toast.onWillDismiss()))
            ),
            map(() => registration.waiting.postMessage("skipWaiting")),
            concatMap(() => {
              return from(customElements.whenDefined("mf-navigation")).pipe(
                map(() => {
                  this.mfNav = this.el.querySelector("mf-navigation");
                  this.mfNav.navigateTo(`/`);
                  setTimeout(() => window.location.reload(), 500);
                })
              );
            })
          );
        })
      )
      .subscribe({
        error(error) {
          reportError("DEVICE", error, "onServiceWorkerUpdate - swUpdate");
        },
      });
  }

  disconnectedCallback() {
    if (this.initialize) this.initialize.unsubscribe();
  }

  render() {
    if (state.DEVICE.initialized) {
      return (
        <ion-app>
          <mf-navigation navigation={state.NAVIGATION}></mf-navigation>
        </ion-app>
      );
    } else {
      return <mf-loader></mf-loader>;
    }
  }
}
