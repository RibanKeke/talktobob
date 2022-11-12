import {
  Component,
  h,
  Prop,
  Event,
  EventEmitter,
  getAssetPath,
} from "@stencil/core";
import { state } from "../../store";

@Component({
  tag: "site-mobile-menu",
  styleUrl: "site-mobile-menu.scss",
  shadow: true,
})
export class SiteMobileMenu {
  @Prop() menuItems:Array<{
    icon: string;
    labels: {[key:string]:string};
    component: string;
    name:string;
    url: string;
  }>

  @Prop() footerLinks: {
    linkedin_url: string;
    youtube_url: string;
    facebook_url: string;
    instagram_url: string;
    twitter_url: string;
  };

  @Event() dismissMenu: EventEmitter;

  render() {
    return (
      <ion-content class="content-container" fullscreen >
        <div class="site-menu">
          <ion-toolbar class="menu-header">
            <div class="header-content">
              <ion-router-link
                onClick={() => this.dismissMenu.emit()}
                class="back-home"
                href="/"
              >
                <div class="logo-container">
                  <img
                    class="logo"
                    src={getAssetPath(
                      `../../assets/site/light_zendare_logo.svg`
                    )}
                    alt="Logo Zendare"
                  />
                  <div class="beta-sign">Beta</div>
                </div>
              </ion-router-link>
              <ion-icon
                class="menu-button"
                onClick={() => this.dismissMenu.emit()}
                name="close"
              ></ion-icon>
            </div>
          </ion-toolbar>
          <div class="menu-links">
            {this.menuItems.map((route) => (
              <ion-button
                onClick={() => this.dismissMenu.emit()}
                
                class="mf-btn-secondary link"
                href={route.url}
              >
                {route.labels[state.DEVICE.languageCode]}
              </ion-button>
            ))}
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
          <div class="social-links-container">
            <ion-router-link
              href={this.footerLinks.facebook_url}
              rel="noreferrer"
              target="_blank"
            >
              <ion-icon
                class="link ic-facebook"
                name="logo-facebook"
              ></ion-icon>
            </ion-router-link>
            <ion-router-link
              href={this.footerLinks.instagram_url}
              rel="noreferrer"
              target="_blank"
            >
              <ion-icon class="link" name="logo-instagram"></ion-icon>
            </ion-router-link>
            <ion-router-link
              href={this.footerLinks.twitter_url}
              rel="noreferrer"
              target="_blank"
            >
              <ion-icon class="link" name="logo-twitter"></ion-icon>
            </ion-router-link>
            <ion-router-link
              href={this.footerLinks.youtube_url}
              rel="noreferrer"
              target="_blank"
            >
              <ion-icon class="link" name="logo-youtube"></ion-icon>
            </ion-router-link>
            <ion-router-link
              href={this.footerLinks.linkedin_url}
              rel="noreferrer"
              target="_blank"
            >
              <ion-icon class="link" name="logo-linkedin"></ion-icon>
            </ion-router-link>
          </div>
        </div>
      </ion-content>
    );
  }
}
