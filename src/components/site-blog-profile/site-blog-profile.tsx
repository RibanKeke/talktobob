import { Component, h, Prop } from "@stencil/core";

@Component({
  tag: "site-blog-profile",
  styleUrl: "site-blog-profile.scss",
  shadow: true,
})
export class SiteBlogProfile {
  @Prop() profile: {
    authorExpertise: string;
    authorName: string;
    authorProfileImg: string;
  };
  render() {
    return (
      <div class="site-blog-profile">
        <ion-avatar class="writer-img-container" slot="start">
          <img
            class="writer-img"
            src={this.profile.authorProfileImg}
          />
        </ion-avatar>
        <div class="details-container">
          <h2 class="writer-name">
            <ion-text>{this.profile.authorName}</ion-text>
          </h2>
          <p class="writer-profession">
            <ion-text>{this.profile.authorExpertise}</ion-text>{" "}
          </p>
        </div>
      </div>
    );
  }
}
