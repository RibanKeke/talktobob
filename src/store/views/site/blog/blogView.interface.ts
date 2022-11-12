import { Translations } from "../../../../utils/i8n";

interface SiteBlogTranslatedData {
  categoriesTitle: string;
  categories: Record<string, { title: string; text: string; label: string }>;
  followLabel: string;
  newsletterLabels: {
    title: string;
    text: string;
  };
}

interface BlogDetail {
  id: string;
  title: string;
  targetUrl: string;
  imgUrl: string;
  largeImgUrl: string;
  introText: string;
  content: string;
  publishedAt: string;
  tags: Array<string>;
  authorName: string;
  authorExpertise: string;
  authorProfileImg: string;
}
interface SiteBlogCard {
  id: string;
  title: string;
  targetUrl: string;
  imgUrl: string;
  largeImgUrl: string;
  tag:string;
  introText: string;
  publishedAt: string;
}

interface BlogLocalData extends Translations<SiteBlogTranslatedData> {}

interface SiteBlogs {
  filter: string;
  blogCards: ReadonlyMap<string, SiteBlogCard>;
  categoriesTitle: string;
  categories: Record<string, { title: string; text: string; label: string }>;
  followLabel: string;
  newsletterLabels: {
    title: string;
    text: string;
  };
  start: number;
  limit: number;
  complete: boolean;
}

export { BlogDetail, SiteBlogs, BlogLocalData, SiteBlogCard };
