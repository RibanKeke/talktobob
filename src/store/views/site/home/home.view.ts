import { setLang } from "../../../../utils/i8n";
import { SiteHome } from "./homeView.interface";

const computeSiteHomeView: (languageCode: string) => Promise<SiteHome> = async (
  languageCode: string
) => {
  const rawHomeData = await import(
    "../../../../content/site/data/site_home.json"
  );
  return setLang<SiteHome>(languageCode, rawHomeData);
};

export { computeSiteHomeView };
