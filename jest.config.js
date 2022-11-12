/* Configuration for local development to enable fast testing while coding, unit-tests should run before every push and pull request */
module.exports = {
  roots: ["<rootDir>/src"],
  automock: false,
  transform: {
    "^.+\\.(tsx|ts)?$": "ts-jest",
  },
  testRegex: "./*.spec.(tsx|ts)?$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  moduleNameMapper: {
    "app.json": "<rootDir>/src/config/__mocks__/app.json",
  },
};
