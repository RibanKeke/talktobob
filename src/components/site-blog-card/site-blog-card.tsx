import { Component, h, Prop } from "@stencil/core";

@Component({
  tag: "site-blog-card",
  styleUrl: "site-blog-card.scss",
  shadow: true,
})
export class SiteBlogCard {
  @Prop() blogCardProps: {
    id:string;
    title: string;
    targetUrl: string;
    imgUrl: string;
    largeImgUrl: string;
    tag:string;
    introText: string;
    publishedAt: string;
  };
  @Prop() large = false;
  render() {
    return (
      <ion-card
        class={`card-container ${this.large ? 'large-card' : 'small-card'}`}
        button
        type="button"
        href={this.blogCardProps.targetUrl}
      >
        <ion-card-content class="content-container">
          <div class="main-container">
            <div class="img-container">
                <img
                  class="article-img"
                  src={this.large ? this.blogCardProps.largeImgUrl : this.blogCardProps.imgUrl}
                  alt="Article Thumbnail"
                />
              </div>
            <div class="card-content-container">
              <div class="text-container">
                <p class="card-date">
                  <ion-text>{this.blogCardProps.publishedAt}</ion-text>
                </p>
                <h1 class="card-title">
                  <ion-text>{this.blogCardProps.title}</ion-text>
                </h1>
                <p class="article-text">
                  <ion-text> {this.blogCardProps.introText}</ion-text>
                </p>
              </div>
              <div class="category-container">
                <app-tag text={this.blogCardProps.tag}></app-tag>
              </div>
            </div>
          </div>
        </ion-card-content>
      </ion-card>
    );
  }
}
