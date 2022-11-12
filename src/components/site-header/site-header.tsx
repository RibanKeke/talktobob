import {
  Component,
  h,
  Prop,
  getAssetPath,
  State,
  Element,
} from "@stencil/core";
import { modalController } from "@ionic/core";
import siteShellData from "../../content/site/data/site_shell.json";
import { state } from "../../store";


@Component({
  tag: "site-header",
  styleUrl: "site-header.scss",
  shadow: true,
})
export class SiteHeader {
  @Element() elm: HTMLElement;

  @Prop() menuItems: Array<{
    icon: string;
    labels: { [key: string]: string };
    component: string;
    name: string;
    url: string;
  }>;

  @Prop() headerBackground: string;

  @Prop() footerLinks: {
    linkedin_url: string;
    youtube_url: string;
    facebook_url: string;
    instagram_url: string;
    twitter_url: string;
  };

  @State() scrolled = false;

  modalElement: HTMLIonModalElement;

  async presentMenu() {
    this.modalElement = await modalController.create({
      component: "site-mobile-menu",
      componentProps: {
        menuItems: this.menuItems,
        footerLinks: siteShellData.footerLinks
      },
    });
    await this.modalElement.present();
    this.modalElement.addEventListener("dismissMenu", () => {
      this.modalElement.dismiss();
    });
  }

  render() {
    return (
      <div class= 'header-container' style={{
        background:`var(${this.headerBackground?this.headerBackground:'--zen-color-primary-contrast'})`
      }}>
        <div class="header-content mf-site-container">
          <ion-router-link class="back-home" href="/">
            <div class="logo-container">
              <img
                class="logo"
                src={getAssetPath(
                  `../../assets/site/${this.scrolled
                    ? "light_zendare_logo.svg"
                    : "dark_zendare_logo.svg"
                  }`
                )}
                alt="Zendare Logo"
              ></img>
              <div class="beta-sign">Beta</div>
            </div>
          </ion-router-link>
          <ion-icon
            class="ion-hide-md-up menu-button"
            onClick={async () => await this.presentMenu()}
            name="menu"
          ></ion-icon>
          <div class="ion-hide-md-down desktop-menu ">
            {this.menuItems.map((menuItem) => (
              <ion-router-link class={`nav-btn ${menuItem.name}`} href={menuItem.url}>
                {menuItem.labels[state.DEVICE.languageCode]}
              </ion-router-link>
            ))}
            <div class="seperator"></div>
            <div class="btn-container">
              <button class="lang-btn first selected">EN</button>
              <div class="tooltip">
              <button class="lang-btn">FR</button>
              <span class="tooltiptext">Coming soon</span>
              </div>
              <div class="tooltip">
              <button class="lang-btn">NL</button>
              <span class="tooltiptext">Coming soon</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
