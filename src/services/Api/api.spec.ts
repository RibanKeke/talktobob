
import { curry } from "ramda";
import { APP_CONFIG } from "../../config";
import { mockFetchHandler, mockFetchNotFound } from "../../utils/mock";
import { _get, _getAll, _getByListParam, _getByName, _getWithLimit } from "./api";


describe("TEST API", () => {
  test("SHOULD PASS : Get all by locale ", (done) => {
    curry(_getAll)(mockFetchHandler)('en')("quizzes").subscribe(() => {
      expect(mockFetchHandler).toBeCalledWith(`${APP_CONFIG.apiHost}/quizzes?_locale=en`);
      done();
    });
  });
  test("SHOULD PASS : Get by id ", (done) => {
    curry(_get)(mockFetchHandler)("quizzes")("12345").subscribe(() => {
      expect(mockFetchHandler).toBeCalledWith(`${APP_CONFIG.apiHost}/quizzes/12345`); 
      done();
    });
  });

  test("SHOULD PASS : Get all ", (done) => {
    curry(_getAll)(mockFetchHandler)(null)("quizzes").subscribe(() => {
      expect(mockFetchHandler).toBeCalledWith(`${APP_CONFIG.apiHost}/quizzes`);
      done();
    });
  });

  test("SHOULD PASS : Get by list param ", (done) => {
    curry(_getByListParam)(mockFetchHandler)(null)("quizzes")("name")(["robert","florent"]).subscribe(() => {
      expect(mockFetchHandler).toBeCalledWith(`${APP_CONFIG.apiHost}/quizzes?name_in=robert&name_in=florent`);
      done();
    });
  });

  test("SHOULD PASS : Get by name ", (done) => {
    curry(_getByName)(mockFetchHandler)(null)("quizzes")("robert").subscribe(() => {
      expect(mockFetchHandler).toBeCalledWith(`${APP_CONFIG.apiHost}/quizzes?name_eq=robert`);
      done();
    });
  });

  test("SHOULD FAIL: Validation fails, document not found", (done) => {
    curry(_get)(mockFetchNotFound)("quizzes")("test-id").subscribe({
      error(err) {
        expect(err.message).toEqual("Not found");
        done();
      },
    });
  });

  test("SHOULD PASS : Get by limit param ", (done) => {
    curry(_getWithLimit)(mockFetchHandler)(null)("quizzes")(0)(50)(null).subscribe(() => {
      expect(mockFetchHandler).toBeCalledWith(`${APP_CONFIG.apiHost}/quizzes?_start=0&_limit=50`);
      done();
    });
  });

  test("SHOULD PASS : Get by limit param with order ", (done) => {
    curry(_getWithLimit)(mockFetchHandler)(null)("quizzes")(0)(50)([{field:'created_at',order:'DESC'}]).subscribe(() => {
      expect(mockFetchHandler).toBeCalledWith(`${APP_CONFIG.apiHost}/quizzes?_start=0&_limit=50&_sort=created_at:DESC`);
      done();
    });
  }); 
});
