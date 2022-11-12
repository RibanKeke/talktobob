import { setLang } from "../../../../utils/i8n";
import { SiteShell } from "./shellView.interface";

const computeSiteShellView: (languageCode: string) => Promise<SiteShell> = async (
  languageCode: string
) => {
  const rawHomeData = await import(
    "../../../../content/site/data/site_shell.json"
  );
  return setLang<SiteShell>(languageCode, rawHomeData);
};

export { computeSiteShellView };
