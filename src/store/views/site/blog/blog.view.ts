import { firstValueFrom, from } from "rxjs";
import { map } from "rxjs/operators";
import { APP_CONFIG } from "../../../../config";
import format from "date-fns/format";
import { extractAsset } from "../../../../utils/assets";
import { getLocale, setLang } from "../../../../utils/i8n";
import { BlogLocalData, SiteBlogCard, SiteBlogs } from "./blogView.interface";
import { getUrl } from "../../../../services/Navigation";
import { parseHtml } from "../../../../utils/markdown";
import { Blog } from "../../../../services/Blog/Blog.interface";
import { arrayToMappedState } from "../../../../utils/misc";

async function loadBlogLocalData(languageCode: string) {
  const blogLocalData = await import(
    "../../../../content/site/data/site_blog.json"
  );
  return setLang<BlogLocalData>(languageCode, blogLocalData);
}

async function computeSiteBlogView(blog: Blog, languageCode: string) {
  const userLocale = getLocale(languageCode);
  return {
    id: blog.id,
    content: parseHtml(blog.content, APP_CONFIG.apiHost),
    authorExpertise: blog.author.expertise,
    authorName: blog.author.firstName + ' ' + blog.author.lastName,
    tags: blog.tags,
    authorProfileImg: extractAsset(blog.author.profileImg, APP_CONFIG.apiHost)
      .thumbnail,
    imgUrl: extractAsset(blog.coverImg, APP_CONFIG.apiHost).thumbnail,
    largeImgUrl: extractAsset(blog.coverImg, APP_CONFIG.apiHost).large,
    introText: blog.intro,
    publishedAt: format(new Date(blog.created_at), "PP", {
      locale: userLocale,
    }),
    targetUrl: getUrl({ route: "blogs", param: blog.id }),
    title: blog.title,
  };
}

function computeBlogCardsView(blog: Blog, languageCode: string): SiteBlogCard {
  const userLocale = getLocale(languageCode);
  return {
    id: blog.id,
    imgUrl: extractAsset(blog.coverImg, APP_CONFIG.apiHost).thumbnail,
    largeImgUrl: extractAsset(blog.coverImg, APP_CONFIG.apiHost).large,
    introText: blog.intro,
    tag: blog.tags[0],
    publishedAt: format(new Date(blog.created_at), "PP", {
      locale: userLocale,
    }),
    targetUrl: getUrl({ route: "blogs", param: blog.id }),
    title: blog.title,
  };
}

async function computeSiteBlogListView(
  blogs:Array<Blog>,
  start: number,
  limit: number,
  filter: string,
  languageCode: string
): Promise<SiteBlogs> {
  const siteBlogs$ = 
    from(loadBlogLocalData(languageCode)).pipe(
    map((localData) => {
      const blogCardsList = blogs
        .filter((blog) => {
          if (filter === "all") {
            return true;
          } else {
            return blog.tags.map((tag) => tag.toLowerCase()).includes(filter);
          }
        })
        .map((blog) => computeBlogCardsView(blog, languageCode));

      let blogView: SiteBlogs = {
        blogCards: arrayToMappedState(blogCardsList),
        ...localData.translated,
        filter,
        limit,
        complete: blogs.length < limit,
        start,
      };
      return blogView;
    })
  );
  return firstValueFrom(siteBlogs$);
}

async function computeSiteBlogDetail(blog: Blog, languageCode: string) {
  return computeSiteBlogView(blog, languageCode);
}

export { computeSiteBlogListView, computeSiteBlogDetail };
