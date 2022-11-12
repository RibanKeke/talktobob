/**
 * Author: Robert Banziziki
 * Date: 16 February 2021
 */
interface TabMenuInterface {
  baseUrl: string;
  items: Array<{
    icon: string;
    labels: {[key:string]:string};
    component: string;
    name:string;
    url: string;
  }>;
  type:string;
}
interface NavigationRedirect {
  from: string;
  to: string;
}

interface NavigationRoute {
  url: string;
  component: string;
}

interface Navigation404 {
  url: string;
  component?: string;
}
interface Navigation {
  root:string;
  redirects: Array<NavigationRedirect>;
  routes: Array<NavigationRoute>;
  menu?: TabMenuInterface;
  route404: Array<Navigation404>;
}
interface Route {
  url: string;
  component?: string;
  detail_component?: string;
  param?: string;
  restriction?: string;
}

interface NavigationMenu {
  url: string;
  restriction?: string;
  type: string;/* tabs | menu */
  subRoutes: Record<
    string,
    {
      component: string;
      icon: string;
      url?:string;
    }
  >;
  labels: Record<string, { [key: string]: string }>;
}

interface RouteGuard {
  from: string;
  to: string;
}

interface Redirect {
  url: string;
  targetUrl: string;
}
interface NavigationData {
  root:string;
  menu: NavigationMenu;
  routes: Record<string, Route>;
  routeGuards: Record<string, Array<RouteGuard>>;
  redirects: Array<Redirect>;
}

export {
  Navigation,
  NavigationData,
  TabMenuInterface,
  NavigationRedirect,
  NavigationRoute,
  NavigationMenu,
  Route,
};
