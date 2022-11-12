/**
 * Author: Robert Banziziki Muhire
 * Date: 18/02/2021
 */

const storageSet = async (key: string, value: any) => {
  const { Preferences } = await import("@capacitor/preferences");
  await Preferences.set({
    key: key,
    value: JSON.stringify(value),
  });
};

const storageGet = async (key: string) => {
  const { Preferences } = await import("@capacitor/preferences");
  const { value } = await Preferences.get({ key });
  return value ? JSON.parse(value) : undefined;
};

const storageRemove = async (key: string) => {
  const { Preferences } = await import("@capacitor/preferences");
  await Preferences.remove({ key });
};

export { storageGet, storageRemove, storageSet };
