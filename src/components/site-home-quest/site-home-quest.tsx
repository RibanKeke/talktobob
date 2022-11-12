import { Component, getAssetPath, h, Prop } from "@stencil/core";

@Component({
  tag: "site-home-quest",
  styleUrl: "site-home-quest.scss",
  shadow: true,
})
export class SiteHomeQuest {
  /* We don't import interfaces, these should be defined by the imported component */
  @Prop() questData: {
    imgUrl?: string;
    title: string;
    subTitle: string;
    descriptionStart: string;
    descriptionIntro?: string;
    descriptionTag?: string;
    descriptionEnd?: string;
  };
  render() {
    return (
      <mf-section>
        <div class="quest-container" slot="content">
          <img
            class="quest-img"
            src={getAssetPath(`../../assets/site/${this.questData.imgUrl}`)}
            alt="Character Jumping Hurdle Image"
          ></img>
          <div class="quest-content">
            <h1 class="quest-title">{this.questData.title}</h1>
            <h2 class="quest-subtitle">{this.questData.subTitle}</h2>
            <p class="quest-description"><ion-text>{this.questData.descriptionStart}</ion-text></p>
            <h3 class="quest-tag"><ion-text>{this.questData.descriptionTag}</ion-text></h3>
            <p class="quest-description"><ion-text>{this.questData.descriptionEnd}</ion-text></p>
            <div class="categories-container">
              <div class="categories-left">
                <div class="category">
                  <img
                    class="ic-category"
                    src="../../assets/site/ic-food.svg"
                    alt="Food Icon"
                  />
                  <h4 class="category-title food"><ion-text>
                    Food <br /> <span class="category-subtitle">Diet</span>
                  </ion-text></h4>
                </div>
                <div class="category">
                  <img
                    class="ic-category"
                    src="../../assets/site/ic-move.svg"
                    alt="Movement Icon"
                  />
                  <h4 class="category-title move"><ion-text>
                    Move <br />{" "}
                    <span class="category-subtitle">Physical exercise</span>
                  </ion-text></h4>
                </div>
                <div class="category">
                  <img
                    class="ic-category"
                    src="../../assets/site/ic-purpose.svg"
                    alt="Purpose Icon"
                  />
                  <h4 class="category-title purpose"><ion-text>
                    Purpose <br />{" "}
                    <span class="category-subtitle">Personal fulfilment</span>
                  </ion-text></h4>
                </div>
                <div class="category">
                  <img
                    class="ic-category"
                    src="../../assets/site/ic-stepback.svg"
                    alt="Step Back Icon"
                  />
                  <h4 class="category-title stepback"><ion-text>
                    Stepback <br />{" "}
                    <span class="category-subtitle">
                      Meditation / Sleep / Mental Health
                    </span>
                  </ion-text>
                  </h4>
                </div>
              </div>
              <div class="categories-right">
                <div class="category">
                  <img
                    class="ic-category"
                    src="../../assets/site/ic-nature.svg"
                    alt="Nature Icon"
                  />
                  <h4 class="category-title nature"><ion-text>
                    Nature <br />{" "}
                    <span class="category-subtitle">
                      Connecting with Nature
                    </span>
                  </ion-text></h4>
                </div>
                <div class="category">
                  <img
                    class="ic-category"
                    src="../../assets/site/ic-lifestyle.svg"
                    alt="Lifestyle Icon"
                  />
                  <h4 class="category-title lifestyle"><ion-text>
                    Lifestyle
                    <br />
                    <span class="category-subtitle">Beneficial Rituals</span>
                  </ion-text></h4>
                </div>
                <div class="category">
                  <img
                    class="ic-category"
                    src="../../assets/site/ic-enjoy.svg"
                    alt="Enjoy Icon"
                  />
                  <h4 class="category-title enjoy"><ion-text>
                    Enjoy
                    <br />
                    <span class="category-subtitle">
                      Creativity / Enjoyment
                    </span>
                  </ion-text>
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </mf-section>
    );
  }
}
