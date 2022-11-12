import { BlogEntity } from "./Blog.interface";
import blogReferenceData from "./blog-test-data.json";

import { mocked } from 'ts-jest/utils';
import { mockFetchFactory } from "../../utils/mock";
import { fromFetch } from "rxjs/fetch";

jest.mock('rxjs/fetch', () => {
  return { fromFetch: jest.fn() }
});

beforeEach(() => {
  mocked(fromFetch).mockClear();
});

describe("Test blog validation with reference data and corrupted data", () => {
  const testBlogId = 1;
  const rawBlogData = blogReferenceData["suite-1"].blogs.find(blog => blog.id === testBlogId);
  test("SHOULD PASS: Validation schema return valid action data: ById filter", (done) => {
    mocked(fromFetch).mockImplementation(mockFetchFactory({json:rawBlogData, ok:true,status:200}));
    new BlogEntity().get(testBlogId.toString()).subscribe((value) => {
      expect(value[0].id === testBlogId.toString());
      expect(value[0].tags).toEqual(["food"])
      done();
    });
  });
});


