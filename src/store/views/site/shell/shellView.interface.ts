import { Translations } from "../../../../utils/i8n";

interface ShellLabels {
  iphone_label: string;
  android_label: string;
  blog_label: string;
  company_label: string;
  application_label: string;
  donation_label: string;
  language_labels: { [key: string]: string };
  general_conditions_label: string;
  cookie_policy_label: string;
  copyright_label: string;
  email_label: string;
  email_subject: string;
  cookieLabels: {
    title:string;
    btnLabel: string;
    text: string;
    moreInfoLabel: string;
  }
  newsletter_title: string;
  newsletter_subtitle: string;
  newsletter_input_placeholder: string;
}

export interface SiteShell extends Translations<ShellLabels> {
  footerLinks: {
    facebook_url: string;
    linkedin_url: string;
    youtube_url: string;
    instagram_url: string;
    twitter_url: string;
  };
  email: string;
}
