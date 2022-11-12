import { Component, h, Prop, getAssetPath } from "@stencil/core";

@Component({
  tag: "site-home-mission",
  styleUrl: "site-home-mission.scss",
  shadow: true,
})
export class SiteHomeMission {
  /* We don't import interfaces, these should be defined by the imported component */
  @Prop() missionData: {
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
          class="mission-container"
          slot="content"
          style={{
            backgroundImage: `url(${getAssetPath(
              "../../assets/site/about_us_background.svg"
            )})`,
          }}
        >
          <div class="mission-content">
            <h1 class="mission-title"><ion-text>{this.missionData.title}</ion-text></h1>
            <h2 class="mission-subtitle"><ion-text>{this.missionData.subTitle}</ion-text></h2>
            <p class="mission-description"><ion-text>{this.missionData.descriptionStart}</ion-text></p>
            <p class="mission-description"><ion-text>{this.missionData.descriptionEnd}</ion-text></p>
          </div>
        </div>
      </mf-section>
    );
  }
}
