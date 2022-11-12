import { Translations } from "../../../../utils/i8n";

interface DonationTranslatedData {
    supportTitle:string;
    supportText:string;
    donationTitle:string;
    donationMessage:string;
    donationText:string;
    donationBtnLabel:string;
}

interface DonationLocalData extends Translations<DonationTranslatedData> {

}

interface SiteDonation extends DonationTranslatedData {}

export { SiteDonation, DonationLocalData}
