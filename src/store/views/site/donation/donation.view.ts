import { setLang } from "../../../../utils/i8n";
import { SiteDonation, DonationLocalData } from "./donationView.interface";

const computeSiteDonationView: (languageCode: string) => Promise<SiteDonation> = async (
  languageCode: string
) => {
  const rawDonationData = await import(
    "../../../../content/site/data/site_donation.json"
  );
  const translatedLocalData = setLang<DonationLocalData>(languageCode, rawDonationData);
  return {
      ...translatedLocalData.translated
  }
};

export { computeSiteDonationView };
