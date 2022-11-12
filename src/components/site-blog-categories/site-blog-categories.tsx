import { Component, h, Prop, Event, EventEmitter } from "@stencil/core";

@Component({
  tag: "site-blog-categories",
  styleUrl: "site-blog-categories.scss",
  shadow: true,
})
export class SiteBlogCategories {
  @Prop() categories: Record<string, {title:string, text:string, label:string}>;
  @Prop() filter:string;
  @Prop() categoriesTitle:string;
  @Event() filterCategories: EventEmitter;
  render() {
    return (
      <div class="main-container">
        <h2 class="categories-title">
          <ion-text>{this.categoriesTitle}</ion-text>
        </h2>
        {Object.entries(this.categories).map(([key, value]) => (
          <ion-button
            class={`btn-category ${this.filter === key? 'selected-'+ key:''}`}
            onClick={() => this.filterCategories.emit({ filter: key })}
          >
            {value.label}
          </ion-button>
        ))}
      </div>
    );
  }
}
