import { combineLatest, from, of } from "rxjs";
import { switchMap } from "rxjs/operators";
import { state } from "../..";
import { reportError } from "../../error/effects";
import { BlogDetail } from "./blog/blogView.interface";
import { updateSiteView } from "./site.views";

function siteHomeViewEffect() {
  const effect = "siteHomeViewEffect";

  return of(state.DEVICE.languageCode)
    .pipe(
      switchMap((language) => {

        return from(import("./site.worker")).pipe(
          switchMap(({ computeHomeViewFromWorker }) =>
            computeHomeViewFromWorker(language)
          )
        );
      })
    )
    .subscribe({
      next(siteHome) {
        updateSiteView({ siteHome }, effect);
      },
      error(err) {
        reportError("VIEWS", err, effect);
      },
    });
}

function siteShellViewEffect() {
  const effect = "siteShellViewEffect";
  return of(state.DEVICE.languageCode)
    .pipe(
      switchMap((language) => {

        //Compute page from worker
        return from(import("./site.worker")).pipe(
          switchMap(({ computeShellViewFromWorker }) =>
            computeShellViewFromWorker(language)
          )
        );
      })
    )
    .subscribe({
      next(siteShell) {
        updateSiteView({ siteShell }, effect);
      },
      error(err) {
        reportError("VIEWS", err, effect);
      },
    });
}

function siteBlogListViewEffect(start: number, limit: number, filter: string) {
  const effect = "siteBlogListViewEffect";

  const blogs$ = (language: string) =>
    from(import("../../../services/Blog/blog")).pipe(
      switchMap(({ blogsByLimitObservable }) =>
        blogsByLimitObservable(start, limit, language)
      )
    );

  return of(state.DEVICE.languageCode)
    .pipe(
      switchMap((language) => {

        return combineLatest([
          from(import("./site.worker")),
          blogs$(language),
        ]).pipe(
          switchMap(([{ computeBlogListViewFromWorker }, blogs]) =>
            computeBlogListViewFromWorker(
              blogs,
              start,
              limit,
              filter,
              language
            )
          )
        );
      })
    )
    .subscribe({
      next(newSummary) {
        if (state.VIEWS.blogsSummary?.filter === filter) {
          updateSiteView(
            {
              blogsSummary: {
                ...newSummary,
                blogCards: new Map([
                  ...state.VIEWS.blogsSummary.blogCards,
                  ...newSummary.blogCards,
                ]),
              },
            },
            effect
          );
        } else {
          updateSiteView({ blogsSummary: { ...newSummary } }, effect);
        }
      },
      error(err) {
        reportError("VIEWS", err, effect);
      },
    });
}

function siteBlogDetailViewEffect(blogId: string) {
  const effect = "siteBlogDetailViewEffect";
  const blog$ = (blogId) =>
    from(import("../../../services/Blog/blog")).pipe(
      switchMap(({ blogByIdObservable }) => blogByIdObservable(blogId))
    );

  return of(state.DEVICE.languageCode)
    .pipe(
      switchMap((language) => {
        return combineLatest([
          from(import("./blog/blog.view")),
          blog$(blogId),
        ]).pipe(
          switchMap(([{ computeSiteBlogDetail }, blog]) =>
            computeSiteBlogDetail(blog, language)
          )
        );
      })
    )
    .subscribe({
      next(blogDetailView) {
        updateSiteView(
          {
            blogsDetail: new Map<string, BlogDetail>([
              ...state.VIEWS.blogsDetail,
              [blogDetailView.id, blogDetailView],
            ]),
          },
          effect
        );
      },
      error(err) {
        reportError("VIEWS", err, effect);
      },
    });
}

function siteDonationViewEffect() {
  const effect = "siteDonationViewEffect";
  return of(state.DEVICE.languageCode)
    .pipe(
      switchMap((language) => {
        return from(import("./donation/donation.view")).pipe(
          switchMap(({ computeSiteDonationView }) =>
            computeSiteDonationView(language)
          )
        );
      })
    )
    .subscribe({
      next(donation) {
        updateSiteView({ donation }, effect);
      },
      error(err) {
        reportError("VIEWS", err, effect);
      },
    });
}

export {
  siteHomeViewEffect,
  siteShellViewEffect,
  siteBlogListViewEffect,
  siteBlogDetailViewEffect,
  siteDonationViewEffect,
};
