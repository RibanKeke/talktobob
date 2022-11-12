import { Component, h } from "@stencil/core";

@Component({
  tag: "site-page-quest",
  styleUrl: "site-page-quest.scss",
  shadow: true,
})
export class SitePageQuest {
  render() {
    return (
      <div>
        <p>Hello SitePageQuest!</p>
      </div>
    );
  }
}
