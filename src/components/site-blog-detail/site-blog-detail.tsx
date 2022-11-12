import { Component, h, Prop } from "@stencil/core";
import { Subscription } from "rxjs";
import siteShellData from "../../content/site/data/site_shell.json";
import { state } from "../../store";
import {
  siteBlogDetailViewEffect,
  siteShellViewEffect,
} from "../../store/views/site/site.effects";

@Component({
  tag: "site-blog-detail",
  styleUrl: "site-blog-detail.scss",
  shadow: true,
})
export class SiteBlogDetail {
  @Prop() blogId: string;

  blogDetailSubscription: Subscription;
  shellDataSubscription: Subscription;

  async componentWillLoad() {
    this.shellDataSubscription = siteShellViewEffect();
    this.blogDetailSubscription = siteBlogDetailViewEffect(this.blogId);
  }

  disconnectedCallback() {
    if (this.blogDetailSubscription) this.blogDetailSubscription.unsubscribe();
    if (this.shellDataSubscription) this.shellDataSubscription.unsubscribe();
  }

  render() {
    const { menu } = state.NAVIGATION;
    let blogDetail = state.VIEWS.blogsDetail.get(this.blogId);
    let shellData = state.VIEWS.siteShell;

    if (!blogDetail || !shellData) return <mf-loader></mf-loader>;

    return [
      <ion-content fullscreen class="content-container">
        <site-header
          menuItems={menu.items}
          footerLinks={siteShellData.footerLinks}
        ></site-header>
        <div class="main-container mf-site-container">
          <div class="blog-title-container">
            <p class="blog-date">
              <ion-text>{blogDetail.publishedAt}</ion-text>
            </p>
            <h1 class="blog-title">
              <ion-text>{blogDetail.title}</ion-text>
            </h1>
          </div>
          <div class="blog-profile-container">
            <site-blog-profile
              profile={{
                authorExpertise: blogDetail.authorExpertise,
                authorName: blogDetail.authorName,
                authorProfileImg: blogDetail.authorProfileImg,
              }}
            ></site-blog-profile>
            <site-blog-share></site-blog-share>
          </div>
          <div class="category-container">
            {blogDetail.tags.map((tag) => (
              <app-tag text={tag}></app-tag>
            ))}
          </div>
          <div class="img-container">
            <img
              class="img-blog"
              src={blogDetail.largeImgUrl}
              alt="Blog Image"
            />
          </div>
          <div class="site-blog-content">
            <div class="text-content">
              <mf-html content={blogDetail.content}></mf-html>
            </div>
          </div>
        </div>
        <site-footer shellData={shellData}></site-footer>
      </ion-content>,
      <site-cookie-footer
        class={`${!state.DEVICE.cookieAgreement
            ? "fade-in"
            : "ion-hide"
          }`}
        cookieLabels={shellData.translated.cookieLabels}
      ></site-cookie-footer>,
    ];
  }
}
