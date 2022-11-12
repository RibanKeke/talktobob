import { CustomError } from "../../utils/error";
import {
  Navigation,
  NavigationData,
  NavigationRoute,
  Route,
  NavigationMenu,
} from "./Navigation.interface";

import * as R from "ramda";

function getNavigationUrl({
  route,
  param = undefined,
  navigation,
}: {
  route: string;
  param?: string;
  navigation: NavigationData;
}): string {
  const navRoute = [
    ...R.toPairs(navigation.routes).map(([index, value]) => ({
      name: index,
      url: value.url,
    })),
    ...R.keys(navigation.menu.subRoutes).map((key) => ({
      name: key,
      url:
        navigation.menu.url === "/"
          ? `${navigation.menu.url}${key}`
          : `${navigation.menu.url}/${key}`,
    })),
  ].find((navRoute) => navRoute.name === route);

  if (navRoute) {
    const targetUrl = `${navRoute.url}${param ? "/" + param : ""}`;
    return targetUrl;
  } else {
    const message = `Wrong route: <${route}> route doesn't exist: Can't compute navigation url`;
    const navigationError = new CustomError(message, {
      name: "NavigationError",
      severity: "FATAL",
    });
    throw navigationError;
  }
}

function getRedirects(
  guard: string,
  navigation: NavigationData
): Array<{ from: string; to: string }> {
  const redirects = navigation.redirects.map((redirect) => {
    return {
      from: redirect.url,
      to: redirect.targetUrl,
    };
  });
  const routeGuards = R.flatten(
    R.toPairs(navigation.routeGuards)
      .map(([name, value]) => ({ name, value }))
      .filter((g) => g.name === guard)
      .map((g) => g.value)
  );
  return [...routeGuards, ...redirects];
}

function getRoutes(routes: Array<Route>) {
  const navigationRoutes: Array<NavigationRoute> = [];
  for (const route of routes) {
    const component = route.component;
    const detailComponent = route.detail_component;
    const param = route.param;
    if (component) {
      navigationRoutes.push({ url: route.url, component: component });
    }
    if (detailComponent && param) {
      navigationRoutes.push({
        url: `${route.url}/:${param}`,
        component: detailComponent,
      });
    }
  }
  return navigationRoutes;
}

function getMenu(menu: NavigationMenu) {
  const baseUrl = menu.url;
  const items = R.toPairs(menu.subRoutes).map(([name, value]) => ({
    component: value.component,
    icon: value.icon,
    url: value.url ?? `/${name}`,
    name: name,
    labels: R.keys(menu.labels).reduce(
      (labels, key) => ({ ...labels, [key]: menu.labels[key][name] }),
      {}
    ),
  }));
  return { baseUrl, items, type: menu.type };
}

function get404Routes(routes: Record<string, Route>, menu: NavigationMenu) {
  let notFoundRoutes: Array<NavigationRoute> = [
    { url: "/:any", component: "app-404" },
  ];

  notFoundRoutes = [
    ...notFoundRoutes,
    ...R.keys(menu.subRoutes).map((name) => ({
      url:
        menu.url === "/"
          ? `${menu.url}${name}/:any`
          : `${menu.url}/${name}/:any`,
      component: "app-404",
    })),
  ];

  notFoundRoutes = [
    ...notFoundRoutes,
    ...R.toPairs(routes)
      .map(([name, value]) => ({ name, value }))
      .map((rt) =>
        rt.value.param
          ? { url: `${rt.value.url}/:any/:any`, component: "app-404" }
          : { url: `${rt.value.url}/:any`, component: "app-404" }
      ),
  ];

  return notFoundRoutes;
}

function computeNavigation(
  navigation: NavigationData,
  guard: string
): Navigation {
  const redirects = guard ? getRedirects(guard, navigation) : [];
  const routes = [...getRoutes(Object.values(navigation.routes)), { component: "app-500", url: "/500/:errorId" }];
  const menu = getMenu(navigation.menu);
  const route404 = get404Routes(navigation.routes, navigation.menu);
  const { root } = navigation;
  return { redirects, routes, menu, route404, root };
}

function computePreRenderRoutes(
  routes: Array<Route>,
  menu: NavigationMenu,
  root
): Navigation {
  return {
    root,
    route404: [
      { url: "/404", component: "app-404" },
      { url: "/:any", component: "app-404" },
    ],
    routes: [
      ...getRoutes(routes),
      { component: "app-500", url: "/500/:errorId" },
    ],
    redirects: [],
    menu: getMenu(menu),
  };
}

export { computeNavigation, getNavigationUrl, computePreRenderRoutes };
