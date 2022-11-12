import { Component, h } from "@stencil/core";
import { SiteDonation } from "../../store/views/site/donation/donationView.interface";
import { state } from "../../store";
import { Subscription } from "rxjs";
import {
  siteDonationViewEffect,
  siteShellViewEffect,
} from "../../store/views/site/site.effects";

@Component({
  tag: "site-page-donation",
  styleUrl: "site-page-donation.scss",
})
export class SitePageDonation {
  shellDataSubscription: Subscription;
  donationDataSubscription: Subscription;

  componentWillLoad() {
    this.shellDataSubscription = siteShellViewEffect();
    this.donationDataSubscription = siteDonationViewEffect();
  }

  disconnectedCallback() {
    if (this.donationDataSubscription)
      this.donationDataSubscription.unsubscribe();
    if (this.shellDataSubscription) this.shellDataSubscription.unsubscribe();
  }

  render() {
    const { menu } = state.NAVIGATION;
    const shellData = state.VIEWS.siteShell;
    const donationData: SiteDonation = state.VIEWS.donation;
    if (!shellData || !donationData) return <mf-loader></mf-loader>;

    return [
      <ion-content fullscreen>
        <site-header
          menuItems={menu.items}
          footerLinks={shellData.footerLinks}
          headerBackground="--zen-color-food-extra-light"
        ></site-header>
        <div class="main-container">
          <div class="banner-background">
            <div class="banner-content-container mf-site-container">
              <div class="title-container">
                <h2 class="subtitle">
                  <ion-text>{donationData.supportTitle}</ion-text>
                </h2>
                <h1 class="title">
                  <ion-text>{donationData.supportText}</ion-text>
                </h1>
              </div>
              <div class="img-container">
                <img
                  class="banner-img"
                  src="../../assets/site/site_blog_hero.svg"
                  alt="Character Jumping on Stars"
                />
              </div>
            </div>
          </div>
          <div class="content-container mf-site-container">
            <h3 class="team-message">
              <ion-text>{donationData.donationTitle}</ion-text>
            </h3>
            <p class="intro-text">
              <ion-text>{donationData.donationMessage}</ion-text>
            </p>
            <h4 class="intro-title">
              <ion-text>{donationData.donationText}</ion-text>
            </h4>
            <div class="btn-container">
              <ion-button class="donate-btn mf-btn-primary" href="https://pages.donately.com/zendare/campaign/help-us-build-a-healthier-lifestyle-with-zendare" rel="noreferrer" target="_blank">
                {donationData.donationBtnLabel}
              </ion-button>
            </div>
          </div>
        </div>
        <site-footer shellData={shellData}></site-footer>
      </ion-content>,
      <site-cookie-footer
        class={`${!state.DEVICE.cookieAgreement
            ? ""
            : "ion-hide"
          }`}
        cookieLabels={shellData.translated.cookieLabels}
      ></site-cookie-footer>,
    ];
  }
}
