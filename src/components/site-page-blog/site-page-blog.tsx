import { Component, h, Listen } from "@stencil/core";
import { Subscription } from "rxjs";
import { state } from "../../store";
import {
  siteBlogListViewEffect,
  siteShellViewEffect,
} from "../../store/views/site/site.effects";

@Component({
  tag: "site-page-blog",
  styleUrl: "site-page-blog.scss",
})
export class SitePageBlog {
  infiniteScroll: HTMLIonInfiniteScrollElement;

  shellDataSubscription: Subscription;
  blogDataSubscription: Subscription;

  componentWillLoad() {
    const filter = state.VIEWS.blogsSummary?.filter ?? "all";
    this.shellDataSubscription = siteShellViewEffect();
    this.blogDataSubscription = siteBlogListViewEffect(0, 5, filter);
  }

  disconnectedCallback() {
    if (this.blogDataSubscription) this.blogDataSubscription.unsubscribe();
    if (this.shellDataSubscription) this.shellDataSubscription.unsubscribe();
  }

  @Listen("filterCategories")
  filterCategoriesListener(ev: CustomEvent) {
    const { filter } = ev.detail;
    if (filter && this.blogDataSubscription) {
      this.blogDataSubscription.unsubscribe();
      this.blogDataSubscription = this.blogDataSubscription =
        siteBlogListViewEffect(0, 5, filter);
      this.infiniteScroll.disabled = false;
    }
  }

  loadNextData(ev) {
    siteBlogListViewEffect(
      (state.VIEWS.blogsSummary?.start ?? 0) +
      (state.VIEWS.blogsSummary?.limit ?? 5),
      state.VIEWS.blogsSummary?.limit ?? 5,
      state.VIEWS.blogsSummary?.filter ?? "all"
    );
    ev.target.complete();
    if (state.VIEWS.blogsSummary?.complete) {
      ev.target.disabled = true;
    }
  }

  render() {
    const { menu } = state.NAVIGATION;
    const blogData = state.VIEWS.blogsSummary;
    const shellData = state.VIEWS.siteShell;

    if (!blogData?.blogCards || !shellData) return <mf-loader></mf-loader>;

    return [
      <ion-content fullscreen>
        <site-header
          menuItems={menu.items}
          footerLinks={shellData.footerLinks}
          headerBackground={`${blogData.filter === "all"
              ? "--zen-color-primary-contrast"
              : "--zen-color-" + blogData.filter + "-extra-light"
            }`}
        ></site-header>
        <div class="main-container">
          <div
            class="banner-background"
            style={{
              background: `var(${blogData.filter === "all"
                  ? "--zen-color-primary-contrast"
                  : `--zen-color-${blogData.filter}-extra-light`
                })`,
            }}
          >
            <div class="banner-content-container mf-site-container">
              <div class="title-container">
                <h2 class="subtitle">
                  <ion-text>
                    {blogData.categories[blogData.filter].title}
                  </ion-text>
                </h2>
                <h1 class="title">
                  <ion-text>
                    {blogData.categories[blogData.filter].text}
                  </ion-text>
                </h1>
              </div>
            </div>
          </div>
          <div class="content-container mf-site-container">
            <div class="content-center">
              {Array.from(blogData.blogCards.values()).map(
                (blogCard, index) => (
                  <site-blog-card
                    large={index === 0 ? true : false}
                    blogCardProps={blogCard}
                  ></site-blog-card>
                )
              )}
              <ion-infinite-scroll
                ref={(el) => (this.infiniteScroll = el)}
                onIonInfinite={(ev) => this.loadNextData(ev)}
                position="bottom"
                threshold={state.DEVICE.screen === "mobile" ? "60%" : "300px"}
              >
                <ion-infinite-scroll-content
                  loadingSpinner="bubbles"
                  loadingText="Loading more data..."
                ></ion-infinite-scroll-content>
              </ion-infinite-scroll>
            </div>
            <div class="column-right">
              <site-blog-categories
                categories={blogData.categories}
                filter={blogData.filter}
                categoriesTitle={blogData.categoriesTitle}
              ></site-blog-categories>
              <site-blog-social
                followLabel={blogData.followLabel}
                footerLinks={shellData.footerLinks}
              ></site-blog-social>
              <site-blog-newsletter
                newsletterLabels={blogData.newsletterLabels}
              ></site-blog-newsletter>
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
