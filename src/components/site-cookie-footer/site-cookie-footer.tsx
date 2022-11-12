import { Component, h, Event, EventEmitter, Prop } from "@stencil/core";

@Component({
  tag: "site-cookie-footer",
  styleUrl: "site-cookie-footer.scss",
  shadow: true,
})
export class SiteCookieFooter {
  @Event({ bubbles: true }) cookieAgreement: EventEmitter;
  @Prop() cookieLabels: {
    title:string;
    btnLabel: string;
    text: string;
    moreInfoLabel: string;
  };

  render() {
    return (
      <div class="container-cookie-footer">
        <div class="content-cookie-footer mf-site-container">
          <div class="content-and-icon">
            <img
              class="cookie-svg"
              src="../../assets/site/img-cookie.svg"
              alt="Cookie Image"
            />
            <div class="text-content">
              <div class="sub-tagline">{this.cookieLabels.text}
                <span class="light-bold">{this.cookieLabels.title}</span>.
              </div>
            </div>
          </div>
          <div class="container-buttons">
            <ion-button
              class="btn_accept"
              type="button"
              slot="start"
              onClick={() => this.cookieAgreement.emit()}
            >
              {this.cookieLabels.btnLabel}
            </ion-button>
            <ion-button
              class="btn_more_info"
              type="button"
              slot="end"
              href="/policy"
            >
              {this.cookieLabels.moreInfoLabel}
            </ion-button>
          </div>
        </div>
      </div>
    );
  }
}
