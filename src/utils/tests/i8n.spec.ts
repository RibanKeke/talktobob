/**
 * Author: Banziziki Muhire Robert
 */
import { Translations, setLang } from "../i8n";
import { curry as Rcurry } from "ramda";

interface TestTranslated {
  name: string;
}
interface TestTranslation extends Translations<TestTranslated> {
  id: string;
}

describe("Test internalization helper functions", () => {
  const testTranslations: TestTranslation = {
    id: "test-id",
    translations: [
      { lang: "EN", name: "Robert" },
      { lang: "ES", name: "Roberto" },
    ],
  };
  test("SHOULD PASS: Formatted api language data: English", () => {
    const translatedTest = Rcurry(setLang)("EN")(testTranslations);
    expect(translatedTest.translated.name).toEqual("Robert");
  });

  test("SHOULD PASS: Formatted api language data: Spanish", () => {
    const translatedTest =  Rcurry(setLang)("ES")(testTranslations);
    expect(translatedTest.translated.name).toEqual("Roberto");
  });

  test("SHOULD PASS: Formatted api language data: Missing language, fallback to default", () => {
    const translatedTest =  Rcurry(setLang)("NL")(testTranslations);
    expect(translatedTest.translated.name).toEqual("Robert");
  });
});
