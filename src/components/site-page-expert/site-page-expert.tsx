import { Component, h } from "@stencil/core";

@Component({
  tag: "site-page-expert",
  styleUrl: "site-page-expert.scss",
  shadow: true,
})
export class SitePageExpert {
  render() {
    return (
      <div>
        <p>Hello SitePageExpert!</p>
      </div>
    );
  }
}
