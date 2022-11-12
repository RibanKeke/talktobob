import { firstValueFrom, from } from "rxjs";
import { switchMap } from "rxjs/operators";
import { Blog } from "../../../services/Blog/Blog.interface";

async function computeHomeViewFromWorker(language: string) {
  return firstValueFrom(
    from(import("./home/home.view")).pipe(
      switchMap(({ computeSiteHomeView }) => computeSiteHomeView(language))
    )
  );
}

async function computeShellViewFromWorker(language: string) {
  return firstValueFrom(
    from(import("./shell/shell.view")).pipe(
      switchMap(({ computeSiteShellView }) => computeSiteShellView(language))
    )
  );
}

async function computeBlogListViewFromWorker(
  blogs: Array<Blog>,
  start: number,
  limit: number,
  filter: string,
  language: string
) {
  return firstValueFrom(
    from(import("./blog/blog.view")).pipe(
      switchMap(({ computeSiteBlogListView }) =>
        computeSiteBlogListView(blogs, start, limit, filter, language)
      )
    )
  );
}

export {
  computeHomeViewFromWorker,
  computeShellViewFromWorker,
  computeBlogListViewFromWorker,
};
