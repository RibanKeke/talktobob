import { SITE_NAVIGATION } from "../../config";
import {
  computePreRenderRoutes,
  getNavigationUrl,
  computeNavigation,
} from "./Navigation";
import { values as Rvalues, keys as Rkeys } from "ramda";

const ROUTES = [
  ...Rkeys(SITE_NAVIGATION.routes),
  ...Rkeys(SITE_NAVIGATION.menu.subRoutes),
];

function getUrl({
  route,
  param = undefined,
}: {
  route: string;
  param?: string;
}) {
  return getNavigationUrl({ route, param, navigation: SITE_NAVIGATION });
}

function preRenderRoutes() {
  return computePreRenderRoutes(
    [...Rvalues(SITE_NAVIGATION.routes)],
    SITE_NAVIGATION.menu,
    SITE_NAVIGATION.root
  );
}

function computeSiteNavigation() {
  return computeNavigation(SITE_NAVIGATION, null);
}

export {
  getUrl,
  preRenderRoutes,
  computeSiteNavigation,
  ROUTES,
};
