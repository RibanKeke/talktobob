
import { setState, state } from '../..';
import { SiteHome } from './home/homeView.interface';
import { SiteShell } from './shell/shellView.interface';
import { BlogDetail, SiteBlogs } from './blog/blogView.interface';
import { Mapped, View } from '../..';
import { SiteDonation } from './donation/donationView.interface';

type SiteViews = {
    siteHome:View<SiteHome>;
    siteShell:View<SiteShell>;
    blogsSummary:View<SiteBlogs>,
    blogsDetail: Mapped<BlogDetail>,
    donation: View<SiteDonation>,
}

const defaultSiteViewsState: SiteViews = {
    siteHome:null,
    siteShell:null,
    blogsSummary:null,
    blogsDetail:new Map<string, BlogDetail>(),
    donation:null
};

function updateSiteView(payload: Partial<SiteViews>, effect: string) {
  setState("VIEWS", { VIEWS: { ...state.VIEWS, ...payload } }, effect);
}

export { SiteViews, defaultSiteViewsState, updateSiteView };
