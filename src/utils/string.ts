/**
 * Utility function to capitalize a string
 * @param str string
 */
export function stringCapitalize(str: string) {
  const _ = str.toLowerCase();
  return _.charAt(0).toUpperCase() + _.slice(1);
}

export function stringLowerize(str: string) {
  const _ = str.toLowerCase();
  return _.charAt(0).toUpperCase() + _.slice(1);
}

export function prettyPrint(data:unknown) {
  return JSON.stringify(data, null, "\t");
}
