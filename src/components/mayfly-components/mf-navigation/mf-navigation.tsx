import {
  Component,
  h,
  Listen,
  Element,
  Method,
  Event,
  EventEmitter,
  Prop,
} from "@stencil/core";
import { ModalOptions, modalController } from "@ionic/core";
import { toastController } from "@ionic/core";
@Component({
  tag: "mf-navigation",
})
export class MfNavigation {
  @Element() el: HTMLElement;

  @Prop() navigation: {
    root: string;
    redirects: Array<{ from: string; to: string }>;
    routes: Array<{ url: string; component: string }>;
    menu?: {
      baseUrl: string;
      items: Array<{
        icon: string;
        labels: { [key: string]: string };
        component: string;
        name: string;
        url: string;
      }>;
      type: string;
    };
    route404: Array<{ url: string; component?: string }>;
  };

  @Event() dismissedInstall: EventEmitter;

  eventModalStatus: "idle" | "presenting" = "idle";

  appRouter: HTMLIonRouterElement;
  presenting: boolean = false;

  @Method()
  async presentModal(opts: ModalOptions) {
    const modalElement = await modalController.create({
      ...opts,
    });

    await modalElement.present();
    return modalElement;
  }

  @Listen("presentEventModal")
  async presentEventModalHandler(ev: CustomEvent) {
    const opts = ev.detail as ModalOptions;
    this.presentModal(opts);
  }

  @Listen("presentToast")
  async presentToast(ev: CustomEvent) {
    const toast = await toastController.create({
      position: "bottom",
      cssClass: undefined,
      duration: 2000,
      buttons: [
        {
          text: "Dismiss",
          role: "cancel",
        },
      ],
      ...ev.detail,
    });
    toast.present();
  }
  /* 
  @Method() async showInstallBanner(mode: "android" | "ios" | "web") {
    const banners = {
      ios: "app-install-ios",
      android: "app-install-android",
      web: "app-install-web",
    };
    const installElement = document.createElement(banners[mode]);
    installElement.classList.add("install-banner");
    installElement.classList.add("fade-in");
    installElement.id = "install-banner";
    this.el.appendChild(installElement);
  } */

  @Listen("installApp")
  listenToDismissBanner() {
    this.hideInstallBanner();
  }

  @Method()
  async hideInstallBanner() {
    const installBanner = this.el.querySelector("#install-banner");
    if (installBanner) {
      this.el.removeChild(installBanner);
      this.dismissedInstall.emit();
    }
  }

  @Method()
  async navigateTo(url: string) {
    await Promise.all([
      customElements.whenDefined("ion-router"),
      customElements.whenDefined("ion-nav"),
    ]);

    const nav = this.el.querySelector("ion-nav");
    const router = this.el.querySelector("ion-router");
    if (router && nav) {
      if (url === "root") {
        const active = (await nav.getActive()).component;
        if (active !== this.navigation.root) {
          await nav.setRoot(this.navigation.root);
        }
        nav.popToRoot();
        router.push("/");
      } else {
        router.push(url);
      }
    }
  }

  @Listen("navigateTo")
  async navigateToListener(ev: CustomEvent) {
    const { url } = ev.detail;
    await this.navigateTo(url);
  }

  renderRedirects(redirects: Array<{ from: string; to: string }>) {
    return redirects.map((redirect) => (
      <ion-route-redirect
        from={redirect.from}
        to={redirect.to}
      ></ion-route-redirect>
    ));
  }

  renderRoutes(routes: Array<{ url: string; component: string }>) {
    const routeElements = routes.map((route) => (
      <ion-route url={route.url} component={route.component}></ion-route>
    ));
    return routeElements;
  }

  renderRoutes404(routes: Array<{ url: string; component?: string }>) {
    return routes.map((route) => (
      <ion-route
        url={route.url}
        component={route.component ?? "app-404"}
      ></ion-route>
    ));
  }

  render() {
    return [
      <ion-router useHash={false}>
        {...this.renderRedirects(this.navigation.redirects)}
        {this.navigation.menu.type === "tabs" ? (
          <ion-route
            url={this.navigation.menu.baseUrl}
            componentProps={{ tabs: [...this.navigation.menu.items] }}
            component="mf-tabs"
            class={`${this.navigation.menu.items ? "" : "ion-hide"}`}
          >
            {...this.navigation.menu.items.map((tab) => (
              <ion-route component={tab.name} url={tab.url}></ion-route>
            ))}
          </ion-route>
        ) : (
          ""
        )}
        {...this.renderRoutes(
          this.navigation.menu.type === "tabs"
            ? this.navigation.routes
            : [...this.navigation.menu.items, ...this.navigation.routes]
        )}
        {...this.renderRoutes404(this.navigation.route404)}
      </ion-router>,
      <ion-nav
        animated={this.navigation.menu.type === "tabs" ? true : false}
        swipeGesture={false}
      ></ion-nav>,
    ];
  }
}
