import { Component, h, Prop } from "@stencil/core";
import { SiteShell } from "../../store/views/site/shell/shellView.interface";
@Component({
  tag: "site-footer",
  styleUrl: "site-footer.scss",
  shadow: true,
})
export class SiteFooter {
  @Prop() shellData: SiteShell;

  render() {
    return (
      <ion-toolbar class="footer-container">
        <div class="footer-content mf-site-container">
          <div class="footer-nav">
            <div class="icon-links">
              <img
                class="zendare-icon"
                src="../../assets/site/light_zendare_logo.svg"
                alt="Zendare Logo"
              ></img>
              <div class="social-links">
                <ion-router-link
                  href={this.shellData.footerLinks.facebook_url}
                  rel="noreferrer"
                  target="_blank"
                >
                  <ion-icon
                    class="link ic-facebook"
                    name="logo-facebook"
                  ></ion-icon>
                </ion-router-link>
                <ion-router-link
                  href={this.shellData.footerLinks.instagram_url}
                  rel="noreferrer"
                  target="_blank"
                >
                  <ion-icon class="link" name="logo-instagram"></ion-icon>
                </ion-router-link>
                <ion-router-link
                  href={this.shellData.footerLinks.twitter_url}
                  rel="noreferrer"
                  target="_blank"
                >
                  <ion-icon class="link" name="logo-twitter"></ion-icon>
                </ion-router-link>
                <ion-router-link
                  href={this.shellData.footerLinks.youtube_url}
                  rel="noreferrer"
                  target="_blank"
                >
                  <ion-icon class="link" name="logo-youtube"></ion-icon>
                </ion-router-link>
                <ion-router-link
                  href={this.shellData.footerLinks.linkedin_url}
                  rel="noreferrer"
                  target="_blank"
                >
                  <ion-icon class="link" name="logo-linkedin"></ion-icon>
                </ion-router-link>
              </div>
              <div class="newsletter-container">
                <h4 class="title"><ion-text>{this.shellData.translated.newsletter_title}</ion-text></h4>
                <div class="input-container">
                  <ion-input class="input-style" placeholder={this.shellData.translated.newsletter_input_placeholder} type="email"></ion-input>
                  <ion-button type="submit" class="mf-btn-primary btn-send"><ion-icon slot="end" name="send"></ion-icon></ion-button>
                </div>
                <p class="captions"><ion-text>{this.shellData.translated.newsletter_subtitle}</ion-text></p>
              </div>
            </div>
            <div class="nav-section">
              <h3 class="section-title">
                <ion-text>
                  {this.shellData.translated.application_label}
                </ion-text>
              </h3>
              <ion-router-link class="route-link">
                {this.shellData.translated.iphone_label}
              </ion-router-link>
              <ion-router-link href="http://play.google.com/store/apps/details?id=com.zendare.app" target="_blank" class="route-link">
                {this.shellData.translated.android_label}
              </ion-router-link>
            </div>
            <div class="nav-section">
              <h3 class="section-title">
                <ion-text>
                  {this.shellData.translated.company_label}
                </ion-text>
              </h3>
              <ion-router-link class="route-link" target="_blank" href={`/blogs`}>
                {this.shellData.translated.blog_label}
              </ion-router-link>
              <ion-router-link class="route-link" target="_blank" href={`/donation`}>
                {this.shellData.translated.donation_label}
              </ion-router-link>
            </div>
            <div class="nav-section contact">
              <h3 class="section-title">
                <ion-text>{this.shellData.translated.email_label}</ion-text>
              </h3>
              <ion-router-link class="route-link" target="_blank" href={`mailto:contact@zendare.app?subject=${this.shellData.translated.email_subject}`}>
                Contact us
              </ion-router-link>
            </div>
          </div>
          <div class="legal">
            <div class="terms-and-policy">
              <ion-router-link class="terms" href="/terms">
                {this.shellData.translated.general_conditions_label}
              </ion-router-link>
              <ion-router-link class="policy" href="/policy">
                {this.shellData.translated.cookie_policy_label}
              </ion-router-link>
            </div>
            <div class="copyright"><ion-text>{this.shellData.translated.copyright_label}</ion-text></div>
          </div>
        </div>
      </ion-toolbar>
    );
  }
}
