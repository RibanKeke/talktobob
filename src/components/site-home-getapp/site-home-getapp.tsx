import {
  Component,
  getAssetPath,
  h,
  Prop,
} from "@stencil/core";

@Component({
  tag: "site-home-getapp",
  styleUrl: "site-home-getapp.scss",
  shadow: true,
})
export class SiteHomeGetapp {
  @Prop() getappData: {
    imgUrl: string;
    qrCodeImgUrl: string;
    title: string;
    subTitle: string;
    availableLabel: string;
    downloadLabel: string;
    pwaImgUrl: string;
    soonStoreLabel: string;
    appStoreImgUrl: string;
    playStoreImgUrl: string;
  };

  // @Event({ eventName: "installApp" }) downloadTrigger: EventEmitter;

  render() {
    return (
      <mf-section>
        <div class="getapp-container" slot="content">
          <img
            class="img-app-screen"
            src={getAssetPath(`../../assets/site/${this.getappData.imgUrl}`)}
            alt="Zendare Application Image"
          ></img>
          <div class="getapp-content">
            <h1 class="getapp-title">
              <ion-text>{this.getappData.title}</ion-text>
            </h1>
            <h2 class="getapp-subtitle">
              <ion-text>{this.getappData.subTitle}</ion-text>
            </h2>
            {/* <div class="install-btn-container">
              <ion-button
                class={`mf-btn-primary install-btn ${this.getappData.installed ? "ion-hide" : ""
                  }`}
                onClick={() => this.downloadTrigger.emit({ action: "install" })}
              >
                {this.getappData.downloadLabel}
              </ion-button>
            </div> */}
            <div class="stores">
              <ion-button href="http://play.google.com/store/apps/details?id=com.zendare.app" fill="clear" class="stores-btn" target="_blank">
                <img
                  class="img-stores"
                  src={getAssetPath(
                    `../../assets/site/${this.getappData.playStoreImgUrl}`
                  )}
                  alt="Google Play Store Image"
                />
              </ion-button>
              <ion-button fill="clear" class="stores-btn" target="_blank">
                <img
                  class="img-stores"
                  src={getAssetPath(
                    `../../assets/site/${this.getappData.appStoreImgUrl}`
                  )}
                  alt="App Store Image"
                />
              </ion-button>
            </div>
          </div>
        </div>
      </mf-section>
    );
  }
}
