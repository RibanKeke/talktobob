import { newUserDateTime } from "../date";
import { CustomError } from "../error";

describe("Test user new date for user inputed data", () => {
  test("SHOULD PASS: Generated date time base on user locale", () => {
    const userDateTime = newUserDateTime({
      year: 2021,
      month: 3,
      date: 15,
      hour: 12,
      minute: 32,
      second: 25,
    });
    expect(userDateTime.getTime()).toBeTruthy();
  });
  test("SHOULD PASS: Generated yesterday date time midnight", () => {
    try {
      newUserDateTime({ seconds: 15 } as any);
    } catch (err) {
      expect((err as CustomError).name).toEqual("ValidationError");
      expect((err as CustomError).message).toContain("Expected a number");
    }
  });

  test("SHOULD FAIL: Generated date time base on user locale -  missing required parameters ", () => {
    try {
      newUserDateTime({ seconds: 15 } as any);
    } catch (err) {
      expect((err as CustomError).name).toEqual("ValidationError");
      expect((err as CustomError).message).toContain("Expected a number");
    }
  });
});
