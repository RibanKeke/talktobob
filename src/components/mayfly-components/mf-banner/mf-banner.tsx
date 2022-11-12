import { Component, h } from "@stencil/core";

@Component({
  tag: "mf-banner",
  styleUrl: "mf-banner.scss",
  shadow: true,
})
export class MfBanner {
  render() {
    return (
      <div>
        <slot></slot>
      </div>
    );
  }
}
