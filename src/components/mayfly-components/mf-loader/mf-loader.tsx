import { Component, h } from "@stencil/core";

@Component({
  tag: "mf-loader",
  styleUrl: "mf-loader.scss",
  assetsDirs: ["mf-loader-assets"],
  shadow: true,
})
export class MfLoader {
  render() {
    return (
      <div class="content-container">
        <div class="main-container">
          <div class="img-container">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path fill="#645BD4" d="M208.8 131.8c74.6 34 66.7 22.2 94 5.2 27.3-17 58.2 13.4 54 39.6-7.5 46-178.6 96-153.4 123.9 18.3 20.2 109.6-50.2 157.8-67.3 80.7-28.5 86.3 119-6.7 101-60.5-11.8-129.5 13.4-196.7 52C103.6 417.4 54 313.7 122 281.5c19-9 132.2-62 123.2-77.4-9-15.4-39.7-2.7-58.1 4s-68.8-7.5-60.3-51.1c8-41.3 42.7-43.1 82-25.2Z"/>
            </svg>
          </div>
          <ion-spinner class="spinner" name="lines"></ion-spinner>
        </div>
      </div>
    );
  }
}
