import { Component, h, Element, Listen } from "@stencil/core";
import { Subscription } from "rxjs";

import { state } from "../../store";
import {
  siteHomeViewEffect,
  siteShellViewEffect,
} from "../../store/views/site/site.effects";

@Component({
  tag: "site-page-home",
  styleUrl: "site-page-home.scss",
})
export class SitePageHome {
  @Element() el: HTMLElement;

  contentElement: HTMLIonContentElement;

  shellDataSubscription: Subscription;
  homeDataSubscription: Subscription;

  componentWillLoad() {
    this.shellDataSubscription = siteShellViewEffect();
    this.homeDataSubscription = siteHomeViewEffect();
  }

  async scrollToTarget(targetTag: string, delay = 500) {
    await customElements.whenDefined(targetTag);
    const targetLocation: number = (
      this.el.querySelector(targetTag) as HTMLElement
    ).offsetTop;
    this.contentElement.scrollToPoint(0, targetLocation, delay);
  }

  @Listen("scrollMore")
  async scrollMoreEventListener() {
    await this.scrollToTarget("site-home-mission");
  }

  @Listen("scrollAccessApp")
  async scrollAccessAppListener() {
    await this.scrollToTarget("site-home-getapp");
  }

  async bindIonContent() {
    await customElements.whenDefined("ion-content");
    this.contentElement = this.el.querySelector("ion-content");
  }
  componentDidLoad() {
    this.bindIonContent();
  }

  componentDidUpdate() {
    this.bindIonContent();
  }

  disconnectedCallback() {
    if (this.homeDataSubscription) this.homeDataSubscription.unsubscribe();
    if (this.shellDataSubscription) this.shellDataSubscription.unsubscribe();
  }

  render() {
    const { menu } = state.NAVIGATION;
    const homeData = state.VIEWS.siteHome;
    const shellData = state.VIEWS.siteShell;

    if (!homeData || !shellData) return <mf-loader></mf-loader>;

    return [
      <ion-content fullscreen>
        <site-header
          menuItems={menu.items}
          footerLinks={shellData.footerLinks}
          headerBackground='--zen-color-primary-light'
        ></site-header>
        <site-home-hero
          heroData={{
            ...homeData.translated.sections.hero,
            imgUrl: homeData.assets.heroImgUrl,
            qrCodeImgUrl: homeData.assets.qrCodeImgUrl,
            startLabel: homeData.translated.labels.startLabel,
            knowMoreLabel: homeData.translated.labels.knowMoreLabel,
          }}
        ></site-home-hero>
        <site-home-mission
          missionData={homeData.translated.sections.mission}
        ></site-home-mission>
        <site-home-quest
          id="quest"
          questData={{
            ...homeData.translated.sections.quest,
            imgUrl: homeData.assets.questImgUrl,
          }}
        ></site-home-quest>
        <site-home-advantages
          advantagesData={{
            ...homeData.translated.sections.advantages,
            habitsImgUrl: homeData.assets.habitsImgUrl,
            domainsImgUrl: homeData.assets.domainsImgUrl,
            progressImgUrl: homeData.assets.progressImgUrl,
          }}
        ></site-home-advantages>
        <site-home-challenges
          challengesData={{
            ...homeData.translated.sections.challenges,
            challengesImgUrl: homeData.assets.challengesImgUrl,
          }}
        ></site-home-challenges>
        <site-home-about
          aboutData={{ ...homeData.translated.sections.about_us }}
        ></site-home-about>
        <site-home-getapp
          getappData={{
            imgUrl: homeData.assets.getZendareImgUrl,
            qrCodeImgUrl: homeData.assets.qrCodeImgUrl,
            title: homeData.translated.getZendare.title,
            subTitle: homeData.translated.getZendare.subTitle,
            availableLabel: homeData.translated.labels.availableLabel,
            downloadLabel: homeData.translated.labels.downloadLabel,
            pwaImgUrl: homeData.assets.pwaImgUrl,
            soonStoreLabel: homeData.translated.labels.soonStoreLabel,
            appStoreImgUrl: homeData.assets.appStoreImgUrl,
            playStoreImgUrl: homeData.assets.playStoreImgUrl,
          }}
        ></site-home-getapp>
        <site-footer shellData={shellData}></site-footer>
      </ion-content>,
      <site-cookie-footer
        class={`${!state.DEVICE.cookieAgreement
            ? "fade-in"
            : "ion-hide"
          }`}
        cookieLabels={shellData.translated.cookieLabels}
      ></site-cookie-footer>,
    ];
  }
}
