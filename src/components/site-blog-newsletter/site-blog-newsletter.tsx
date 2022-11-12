import { Component, h, Prop } from "@stencil/core";

@Component({
  tag: "site-blog-newsletter",
  styleUrl: "site-blog-newsletter.scss",
  shadow: true,
})
export class SiteBlogNewsletter {
  @Prop() newsletterLabels: {
    title: string;
    text: string;
  };
  render() {
    return (
      <div class="main-container ion-hide-md-down">
        <h2 class="newsletter-title">
          <ion-text>{this.newsletterLabels.title}</ion-text>
        </h2>
        <div class="input-container">
          <ion-input
            class="input-style"
            placeholder="Type your email here"
            type="email"
          ></ion-input>
          <ion-button type="submit" class="mf-btn-primary btn-send">
            <ion-icon slot="end" name="send"></ion-icon>
          </ion-button>
        </div>
        <p class="captions">
          <ion-text>{this.newsletterLabels.text}</ion-text>
        </p>
      </div>
    );
  }
}
