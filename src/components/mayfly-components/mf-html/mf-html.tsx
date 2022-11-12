import { Component, h, Element, Prop } from "@stencil/core";

@Component({
  tag: "mf-html"
})
export class MfHtml {
  @Element() el: HTMLElement;
  @Prop() content: string;
  contentElement: HTMLElement;
  componentDidLoad() {
    this.contentElement = this.el.querySelector("#content");
    if (this.contentElement) {
      this.contentElement.innerHTML = this.content;
    }
  }
  componentDidUpdate() {
    this.contentElement = this.el.querySelector("#content");
    if (this.contentElement) {
      this.contentElement.innerHTML = this.content;
    }
  }
  render() {
    return <div id="content"></div>;
  }
}
