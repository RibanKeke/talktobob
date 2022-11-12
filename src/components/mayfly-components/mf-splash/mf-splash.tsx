import { Component, h, Prop } from "@stencil/core";

@Component({
  tag: "mf-splash",
  styleUrl: "mf-splash.scss",
  shadow: true,
})
export class MfSplash {
  @Prop() srcPath: string;
  render() {
    return (
      <div class="main-container">
        <div class="img-container">
        <img class="splash-logo" src={this.srcPath} alt="Logo Zendare" />
        </div>
        <div class="subtitle-container">
          <img class="mayflyapp-logo" src="../../../assets/splash/mayflyapp-logo.svg" alt="Logo MayflyApp"/>
        </div>
      </div>
    );
  }
}
