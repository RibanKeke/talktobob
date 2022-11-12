import { from } from "rxjs";
import { map, switchMap } from "rxjs/operators";

const blogEntity$ = from(import("./Blog.interface")).pipe(
  map(({ BlogEntity }) => new BlogEntity())
);

function blogsObservable(languageCode: string) {
  return blogEntity$.pipe(
    switchMap((entity) => entity.getAll({ locale: languageCode.toLowerCase() }))
  );
}

function blogListByIdsObservable(ids: Array<string>,locale:string) {
  return blogEntity$.pipe(
    switchMap((entity) => entity.getByListParam("id", ids, {locale}))
  );
}

function blogByIdObservable(id: string) {
  return blogEntity$
    .pipe(switchMap((entity) => entity.get(id)))
    .pipe(map((data) => data[0]));
}

function blogsByLimitObservable(
  start: number,
  limit: number,
  languageCode: string
) {
  return blogEntity$.pipe(
    switchMap((entity) =>
      entity.getWithLimit(start, limit, languageCode.toLowerCase(), [
        { field: "published_at", order: "DESC" },
      ])
    )
  );
}

export {
  blogListByIdsObservable,
  blogByIdObservable,
  blogsObservable,
  blogsByLimitObservable
};
