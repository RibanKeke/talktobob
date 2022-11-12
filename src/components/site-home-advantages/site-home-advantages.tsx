import { Component, getAssetPath, h, Prop } from "@stencil/core";

@Component({
  tag: "site-home-advantages",
  styleUrl: "site-home-advantages.scss",
  shadow: true,
})
export class SiteHomeAdvantages {
  @Prop() advantagesData: {
    title: string;
    subTitle: string;
    habits: {
      title: string;
      subTitle: string;
    };
    domains: {
      title: string;
      subTitle: string;
    };
    progress: {
      title: string;
      subTitle: string;
    };
    habitsImgUrl: string;
    domainsImgUrl: string;
    progressImgUrl: string;
  };
  render() {
    return (
      <mf-section background="var(--ion-color-primary-shade)">
        <div
          class="advantages-container"
          slot="content"
          style={{
            backgroundImage: `url(${getAssetPath(
              "../../assets/site/advantages_background.svg"
            )})`,
          }}
        >
          <div class="advantages-titles">
            <h1 class="advantages-title"><ion-text>{this.advantagesData.title}</ion-text></h1>
            <h2 class="advantages-subtitle"><ion-text>{this.advantagesData.subTitle}</ion-text></h2>
          </div>
          <div class="advantages-content">
            <div class="content-group">
              <img
                class="img-advantages"
                src={getAssetPath(
                  `../../assets/site/advantages_progress.svg`
                )}
                alt="Image Character Slip on a Banana"
              ></img>
              <h3 class="item-title"><ion-text>{this.advantagesData.habits.title}</ion-text></h3>
              <p class="item-subtitle"><ion-text>{this.advantagesData.habits.subTitle}</ion-text></p>
            </div>
            <div class="content-group">
              <img
                class="img-advantages"
                src={getAssetPath(
                  `../../assets/site/${this.advantagesData.domainsImgUrl}`
                )}
                alt="Image 7 Categories of Zendare"
              ></img>
              <h3 class="item-title"><ion-text>{this.advantagesData.domains.title}</ion-text></h3>
              <p class="item-subtitle"><ion-text>{this.advantagesData.domains.subTitle}</ion-text></p>
            </div>
            <div class="content-group">
              <img
                class="img-advantages"
                src={getAssetPath(
                  `../../assets/site/welcome-intro.svg`
                )}
                alt="Zuperman Image"
              ></img>
              <h3 class="item-title"><ion-text>{this.advantagesData.progress.title}</ion-text></h3>
              <p class="item-subtitle"><ion-text>{this.advantagesData.progress.subTitle}</ion-text></p>
            </div>
          </div>
        </div>
      </mf-section>
    );
  }
}
