import { Component, h, Prop, Event, EventEmitter } from "@stencil/core";
@Component({
  tag: "site-home-hero",
  styleUrl: "site-home-hero.scss",
  shadow: true,
})
export class SiteHomeHero {
  @Prop() heroData: {
    title: string;
    subTitle: string;
    imgUrl: string;
    qrCodeImgUrl: string;
    startLabel: string;
    knowMoreLabel: string;
  };

  @Event() scrollMore: EventEmitter;
  @Event() scrollAccessApp: EventEmitter;

  render() {
    return (
      <div class="hero-background">
        <mf-section>
          <div class="hero-left" slot="left">
            <div class="hero-star-left">
              <img
                class="img-star-left"
                src="../../assets/site/hero_star.svg"
                alt="Star Image"
              ></img>
            </div>
          </div>
          <div class="hero-right" slot="right">
            <div class="hero-star-right">
              <img
                class="img-star-right"
                src="../../assets/site/hero_star.svg"
                alt="Star Image"
              ></img>
            </div>
          </div>
          <div class="hero-container" slot="content">
            <div class="hero-group-title">
              <h1 class="hero-title">
                <ion-text>{this.heroData.title}</ion-text>
              </h1>
              <p class="hero-subtitle">
                <ion-text>{this.heroData.subTitle}</ion-text>
              </p>
            </div>
            <div class="hero-group-buttons">
              <ion-button
                class="hero-start-btn"
                onClick={() => this.scrollAccessApp.emit()}
              >
                {this.heroData.startLabel}
              </ion-button>
            </div>
            <img
              class="ion-hide-lg-down hero-smartphone"
              src="../../assets/site/img-hero.svg"
              alt="Smartphone Zendare Character Image"
            />
          </div>
        </mf-section>
      </div>
    );
  }
}
