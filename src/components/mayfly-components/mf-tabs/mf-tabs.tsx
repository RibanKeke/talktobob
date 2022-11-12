import { Component, h, Element, Prop } from "@stencil/core";
import { state } from "../../../store";

@Component({
  tag: "mf-tabs",
  styleUrl: "mf-tabs.scss",
})
export class MfTabs {
  @Element() el: HTMLElement;
  @Prop() tabs: Array<{
    component: string;
    name: string;
    icon: string;
    labels: { [key: string]: string };
  }>;

  async componentDidLoad() {
    await customElements.whenDefined("ion-tabs");
    const tabsElement = this.el.querySelector("ion-tabs");
    if (tabsElement) {
      const selected = await tabsElement.getSelected();
      if (!selected) {
        tabsElement.select(this.tabs[0].name);
      }
    }
  }
  render() {
    if (!this.tabs) return <div></div>;
    return (
      <ion-tabs>
        {...this.tabs.map((tabItem) => (
          <ion-tab tab={tabItem.name} component={tabItem.component}></ion-tab>
        ))}
        <ion-tab-bar class="tab-container" slot="bottom">
          {...this.tabs.map((tabItem) => (
            <ion-tab-button class="buttons" tab={tabItem.name}>
              <ion-icon name={tabItem.icon} class="tab-button-icon"></ion-icon>
              <ion-label class="tab-button-label">
                {tabItem.labels[state.DEVICE.languageCode]}
              </ion-label>
            </ion-tab-button>
          ))}
        </ion-tab-bar>
      </ion-tabs>
    );
  }
}
