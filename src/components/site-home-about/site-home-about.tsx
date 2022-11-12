import { Component, h, Prop, getAssetPath } from "@stencil/core";

@Component({
  tag: "site-home-about",
  styleUrl: "site-home-about.scss",
  shadow: true,
})
export class SiteHomeAbout {
  /* We don't import interfaces, these should be defined by the imported component */
  @Prop() aboutData: {
    title: string;
    subTitle: string;
    descriptionStart: string;
    descriptionTag?: string;
    descriptionEnd?: string;
  };
  render() {
    return (
      <mf-section background="var(--ion-color-extra-light)">
        <div
          class="about-container"
          slot="content"
          style={{
            backgroundImage: `url(${getAssetPath(
              "../../assets/site/about_us_background.svg"
            )})`,
          }}
        >
          <div class="about-content">
            <h1 class="about-title"><ion-text>{this.aboutData.title}</ion-text></h1>
            <h2 class="about-subtitle"><ion-text>{this.aboutData.subTitle}</ion-text></h2>
            <p class="about-description"><ion-text>{this.aboutData.descriptionStart}</ion-text></p>
            <p class="about-description"><ion-text>{this.aboutData.descriptionEnd}</ion-text></p>
          </div>
        </div>
      </mf-section>
    );
  }
}
