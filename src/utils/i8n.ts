import { APP_CONFIG } from "../config";
import enGB from "date-fns/locale/en-GB";
import fr from "date-fns/locale/fr";
import nlBE from "date-fns/locale/nl-BE";
import es from "date-fns/locale/es";
import { logger } from "./logger";
import { curry as Rcurry } from "ramda";

type SupportedLanguages = keyof typeof APP_CONFIG.supportedLanguages;

export const LOCALES: Record<SupportedLanguages | string, Locale> = {
  EN: enGB,
  FR: fr,
  NL: nlBE,
  ES: es,
};

const DefaultLang: SupportedLanguages = APP_CONFIG.defaultLanguage as SupportedLanguages;
interface Translations<T> {
  translations: Array<T & { lang: string }>;
  translated?: T;
}

function getLanguageData<T>(
  translations: Array<T & { lang: string }>,
  languageCode: string
) {
  const langMapping = translations.reduce((result, tr) => {
    return { ...result, [tr.lang]: { ...tr } };
  }, {});
  let langData = langMapping[languageCode];
  if (!langData) {
    logger.warn(
      `Translation data for language ${languageCode} is missing. Setting language to default locale:${languageCode}`
    );
    langData = langMapping[DefaultLang];
  }
  return langData;
}

const getLocale = (languageCode: string): Locale => {
  return LOCALES[languageCode.toUpperCase() as SupportedLanguages];
};

const setLang = <T extends Translations<any>>(
  languageCode: string,
  data: T
): T => {
  return {
    ...data,
    translated: getLanguageData<typeof data.translations>(
      data.translations,
      languageCode
    ),
  };
};

type LocalTranslation<T> = Record<SupportedLanguages, T>;

type LocalTranslatorHelper = <T>(rawLocalData: unknown) => T;

const LocalTranslator = Rcurry(
  <T>(languageCode: string, data: LocalTranslation<T>) => {
    return data[languageCode];
  }
);

export { Translations, setLang, SupportedLanguages, getLocale, LocalTranslator, LocalTranslatorHelper, DefaultLang };
