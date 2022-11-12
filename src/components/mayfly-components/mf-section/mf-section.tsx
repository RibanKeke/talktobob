import { Component, h, Prop } from "@stencil/core";

@Component({
  tag: "mf-section",
  styleUrl: "mf-section.scss",
  shadow: true,
})
export class MfSection {
  @Prop() background: string;
  render() {
    return (
      <div
        class="main-container"
        style={
          this.background
            ? { backgroundColor: this.background, opacity: "1" }
            : {}
        }
      >
        <div class="left-section-container ">
          <slot name="left"></slot>
        </div>
        <div class="right-section-container ">
          <slot name="right"></slot>
        </div>
        <div class="section-container">
          <slot name="content"></slot>
        </div>
      </div>
    );
  }
}
