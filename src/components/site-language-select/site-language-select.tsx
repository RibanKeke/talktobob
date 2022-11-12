import { Component, h, Prop, Event, EventEmitter, State } from "@stencil/core";

@Component({
  tag: "site-language-select",
  styleUrl: "site-language-select.scss",
  shadow: true,
})
export class SiteLanguageSelect {
  @Prop() selectOptions: { [key: string]: string };
  @Prop() selected: string;
  @Event() selectChanged: EventEmitter;

  @State() showOptions = false;

  renderSelectOption() {
    const selectOptionComponents: Array<HTMLIonSelectOptionElement> = [];
    for (const key of Object.keys(this.selectOptions).filter(
      (key) => key !== this.selected
    )) {
      selectOptionComponents.push(
        <ion-item
          button={true}
          onClick={() => this.emitChange({ key: this.selectOptions[key] })}
        >
          <ion-label>{this.selectOptions[key]}</ion-label>
        </ion-item>
      );
    }
    return selectOptionComponents;
  }

  emitChange(selected) {
    setTimeout(() => {
      this.selectChanged.emit(selected);
      this.showOptions = false;
    }, 200);
  }

  revealLanguageOptions() {
    this.showOptions = true;
    setTimeout(() => {
      this.showOptions = false;
    }, 2000);
  }

  render() {
    return (
      <div class="select-container">
        <ion-button
          fill="clear"
          onClick={() => this.revealLanguageOptions()}
          onMouseOver={() => this.revealLanguageOptions()}
        >
          <ion-text slot="start">{this.selected}</ion-text>
          <ion-icon name="caret-down-outline" slot="end"></ion-icon>
        </ion-button>
        <div class={`lang-select ${this.showOptions ? "" : "hide"}`}>
          <ion-list lines="none">{this.renderSelectOption()}</ion-list>
        </div>
      </div>
    );
  }
}
