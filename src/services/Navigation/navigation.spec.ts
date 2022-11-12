/**
 * Author: Robert Banziziki Muhire
 * Date: 16 February 2021
 */
import { computeNavigation, getNavigationUrl } from "./Navigation";
import { TabMenuInterface } from "./Navigation.interface";
import NavigationTestData from "./navigationTestData.json";

type ROUTES = keyof typeof NavigationTestData.routes | keyof typeof NavigationTestData.menu.subRoutes;


function testGetUrl({
  route,
  param = undefined,
}: {
  route: ROUTES;
  param?: string;
}) {
  return getNavigationUrl({route, param, navigation:NavigationTestData});
}

//import { TabMenuInterface } from "./Navigation.interface";
describe("Navigation: Test getUrl utility function", () => {
  test("SHOULD PASS: getUrl returns a valid url", () => {
    const routeUrl = testGetUrl({ route:"onboarding"});
    expect(routeUrl).toEqual("/onboarding");
  })

  test("SHOULD PASS: getUrl returns a valid url with parameter", () => {
    const routeUrl = testGetUrl({ 
      route: "actions",
      param: "123456789bbbbbccccceeee",
    });
    expect(routeUrl).toEqual("/actions/123456789bbbbbccccceeee");
  });

  test("SHOULD PASS: getUrl returns a valid url of a tab route", () => {
    const routeUrl = testGetUrl({ route:"home"});
    expect(routeUrl).toEqual("/home");
  })

});

describe("Navigation: Generated routes are valid", () => {
  test("SHOULD PASS: getRoutes returns valid route", () => {
    const navigation = computeNavigation(NavigationTestData,"loggedOut");
    expect(navigation.routes).toContainEqual({
      url: "/chapters/:chapterId",
      component: "app-chapter-detail",
    });

    expect(navigation.routes).toContainEqual({
      url: "/onboarding",
      component: "app-page-onboarding",
    });
  });
});

describe("Navigation: Generated tab menu", () => {
  test("SHOULD PASS: Generated tab menu is valid", () => {
    const expectedTabMenu: TabMenuInterface = {
      baseUrl: "/",
      type:"tabs",
      items: [
        {
          component: "app-page-home",
          name:"home",
          icon: "home",
          labels: {
            "EN": "home"},
          url: "/",
        },
      ],
    };
    const navigation = computeNavigation(NavigationTestData,"completed");
    expect(navigation.menu).toEqual(expectedTabMenu);
  });
});

describe("Navigation: Generated 404 urls", () => {
  test("SHOULD PASS: Generated root redirect", () => {
    const navigation = computeNavigation(NavigationTestData,"completed");
    expect(navigation.route404).toContainEqual({
      url: "/:any",
      component: "app-404",
    });
  });

  test("SHOULD PASS: Generated 404 param url is valid", () => {
    const navigation = computeNavigation(NavigationTestData,"completed");
    expect(navigation.route404).toContainEqual({
      url: "/chapters/:any/:any",
      component: "app-404",
    });
  });
  test("SHOULD PASS: Generated 404 url is valid", () => {
    const navigation = computeNavigation(NavigationTestData,"completed");
    expect(navigation.route404).toContainEqual({
      url: "/onboarding/:any",
      component: "app-404",
    });
  });
});

describe("Navigation: Generated redirects ", () => {
  test("SHOULD PASS: Redirect root to home", () => {
    const navigation = computeNavigation(NavigationTestData,"completed");
    expect(navigation.redirects).toContainEqual({
      from: "/",
      to: "/onboarding",
    });
  });
});

describe("Navigation: Generated routeGuard ", () => {
  test("SHOULD PASS: Redirect root to home", () => {
    const navigation = computeNavigation(NavigationTestData,"completed");
    expect(navigation.redirects).toContainEqual({
      from: "/welcome",
      to: "/home",
    });
  });
});
