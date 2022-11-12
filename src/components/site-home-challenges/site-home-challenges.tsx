import { Component, getAssetPath, h, Prop } from "@stencil/core";

@Component({
  tag: "site-home-challenges",
  styleUrl: "site-home-challenges.scss",
  shadow: true,
})
export class SiteHomeChallenges {
  /* We don't import interfaces, these should be defined by the imported component */
  @Prop() challengesData: {
    challengesImgUrl?: string;
    title: string;
    subTitle: string;
    descriptionStart: string;
    descriptionIntro?: string;
    descriptionTag?: string;
    descriptionEnd?: string;
  };
  /* Get assets path should be called in parent component for assets that are not bundled with the component */
  render() {
    return (
      <mf-section>
        <div class="quest-container" slot="content">
          {" "}
          <div class="quest-content">
            <h1 class="quest-title"><ion-text>{this.challengesData.title}</ion-text></h1>
            <h2 class="quest-subtitle"><ion-text>{this.challengesData.subTitle}</ion-text></h2>
            <h3 class="quest-tag quest-description-intro">
            <ion-text>{this.challengesData.descriptionIntro}</ion-text>
            </h3>
            <p class="quest-description">
            <ion-text>{this.challengesData.descriptionStart}</ion-text>
            </p>
            <p class="quest-description">
            <ion-text>{this.challengesData.descriptionEnd}</ion-text>
            </p>
          </div>
          <img
            class="quest-img"
            src={getAssetPath(
              `../../assets/site/${this.challengesData.challengesImgUrl}`
            )}
            alt="Quest Journey Image"
          ></img>
        </div>
      </mf-section>
    );
  }
}
