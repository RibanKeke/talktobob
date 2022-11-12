import { Translations } from "../../../../utils/i8n";

interface HomeHeading {
  title: string;
  subTitle: string;
}
interface HomeSection extends HomeHeading {
  descriptionStart: string;
  descriptionIntro?: string;
  descriptionTag?: string;
  descriptionEnd?: string;
}
interface HomeAdvantages extends HomeHeading {
  habits: HomeHeading;
  domains: HomeHeading;
  progress: HomeHeading;
}

interface SiteHomeTranslatedData {
  labels: {
    startLabel: string;
    knowMoreLabel: string;
    availableLabel: string;
    downloadLabel: string;
    soonStoreLabel: string;
  };
  sections: {
    hero: HomeHeading;
    quest: HomeSection;
    mission: HomeSection;
    advantages: HomeAdvantages;
    challenges: HomeSection;
    about_us: HomeSection;
  };
  getZendare: HomeHeading;
}

export interface SiteHome extends Translations<SiteHomeTranslatedData> {
  assets: {
    qrCodeImgUrl: string;
    questImgUrl: string;
    challengesImgUrl: string;
    heroImgUrl: string;
    habitsImgUrl: string;
    domainsImgUrl: string;
    progressImgUrl: string;
    getZendareImgUrl: string;
    pwaImgUrl: string;
    appStoreImgUrl: string;
    playStoreImgUrl: string;
  };
}
