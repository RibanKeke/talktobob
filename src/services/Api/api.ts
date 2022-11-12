import { APP_CONFIG } from "../../config";
import { switchMap } from "rxjs/operators";
import { CustomError } from "../../utils/error";
import { Observable } from "rxjs";
import { logger } from "../../utils/logger";

type FILTERS = "get" | "equal" | "all" | "in" | "limit" | "count";

type API_ENDPOINTS =
  | "quizzes"
  | "challenges"
  | "chapters"
  | "actions"
  | "qcm_questions"
  | "blogs"
  | "achievements"
  | "rewards"
  | "gamification"
  | "lockers"
  | "levels"
  | "tutorials";

type RequestBuilder = (
  endPoint: string,
  options?: Record<
    string,
    string | number | Array<string | number> | Array<Record<string, string>>
  >
) => string;

type FetchHandler = (query: string | Request) => Observable<Response>;
export interface MediaAsset {
  ext: string;
  url: string;
  name: string;
  formats?: {
    thumbnail: { url: string };
    small: { url: string };
    medium: { url: string };
    large: { url: string };
  };
}

function inFilterQuery(field: string, filterValues: Array<string>) {
  return filterValues.reduce((query, value, index) => {
    if (index === 0) {
      return `${field}_in=${value}`;
    } else {
      return `${query}&${field}_in=${value}`;
    }
  }, "");
}

function computeSort(sort: Array<{ field: string; order: "ASC" | "DESC" }>) {
  return sort.reduce((acc, value, index) => {
    if (index === 0) {
      return `${value.field}:${value.order}`;
    } else {
      return `${acc},${value.field}:${value.order}`;
    }
  }, "");
}

const API_REQUESTS: { [filter_key in FILTERS]: RequestBuilder } = {
  get: (endPoint: API_ENDPOINTS, options: { value: string }) =>
    `${APP_CONFIG.apiHost}/${endPoint}/${options.value ?? ""}`,
  all: (
    endPoint: API_ENDPOINTS,
    options?: { value: string; locale?: string }
  ) =>
    `${APP_CONFIG.apiHost}/${endPoint}${
      options?.locale ? "?_locale=" + options.locale.toLowerCase() : ""
    }`,
  equal: (
    endPoint: API_ENDPOINTS,
    options: { field: string; value: string; locale?: string }
  ) =>
    `${APP_CONFIG.apiHost}/${endPoint}?${options.field}_eq=${options.value}${
      options?.locale ? "&_locale=" + options.locale.toLowerCase() : ""
    }`,
  in: (
    endPoint: API_ENDPOINTS,
    options: { field: string; value: Array<string>; locale?: string }
  ) =>
    `${APP_CONFIG.apiHost}/${endPoint}?${inFilterQuery(
      options.field,
      options.value
    )}${options?.locale ? "&_locale=" + options.locale.toLowerCase() : ""}`,
  limit: (
    endPoint: API_ENDPOINTS,
    options: {
      start: number;
      limit: number;
      locale?: string;
      sort?: Array<{ field: string; order: "ASC" | "DESC" }>;
    }
  ) =>
    `${APP_CONFIG.apiHost}/${endPoint}?_start=${options.start}&_limit=${
      options.limit
    }${options?.locale ? "&_locale=" + options.locale.toLowerCase() : ""}${
      options?.sort && options.sort.length > 0
        ? "&_sort=" + computeSort(options.sort)
        : ""
    }`,
  count: (endPoint: API_ENDPOINTS, options: { locale?: string }) =>
    `${APP_CONFIG.apiHost}/${endPoint}/count${
      options?.locale ? "?_locale=" + options.locale.toLowerCase() : ""
    }`,
};

function _get(fetch: FetchHandler, endPoint: API_ENDPOINTS, id: string) {
  const request = API_REQUESTS.get(endPoint, { value: id });
  logger.info(`Api request: ${request}`);
  return fetch(request).pipe(
    switchMap((response) => {
      if (response.ok) {
        return response.json() as Promise<{}>;
      } else {
        if (response.status === 404) {
          const apiError = new CustomError("Not found");
          apiError.context = `Document from ${endPoint} with id: ${id} : Was not found`;
          apiError.name = "NotFoundError";
          apiError.severity = "ERROR";
          throw apiError;
        } else {
          const apiError = new CustomError(
            "Unexpected error happening while fetching the API"
          );
          apiError.context = `Query for document from ${endPoint} with id: ${id}`;
          apiError.name = "AppError";
          apiError.severity = "FATAL";
          throw apiError;
        }
      }
    })
  );
}

function _getByName(
  fetch: FetchHandler,
  locale: string,
  endPoint: API_ENDPOINTS,
  value: string
) {
  const request = API_REQUESTS.equal(endPoint, {
    value: value,
    field: "name",
    locale,
  });
  logger.info(`Api request: ${request}`);
  return fetch(request).pipe(
    switchMap((response) => {
      return response.json() as Promise<Array<{}>>;
    })
  );
}

function _getAll(fetch: FetchHandler, locale: string, endPoint: API_ENDPOINTS) {
  const request = API_REQUESTS.all(endPoint, { locale });
  logger.info(`Api request: ${request}`);
  return fetch(request).pipe(
    switchMap((response) => {
      return response.json() as Promise<Array<{}>>;
    })
  );
}

function _getByListParam(
  fetch: FetchHandler,
  locale: string,
  endPoint: API_ENDPOINTS,
  field: string,
  filterValues: Array<string>
) {
  const request = API_REQUESTS.in(endPoint, {
    field,
    value: filterValues,
    locale,
  });
  logger.info(`Api request: ${request}`);
  return fetch(request).pipe(
    switchMap((response) => {
      return response.json() as Promise<Array<{}>>;
    })
  );
}

function _getWithLimit(
  fetch: FetchHandler,
  locale: string,
  endPoint: API_ENDPOINTS,
  start: number,
  limit: number,
  sort?: Array<{ field: string; order: "ASC" | "DESC" }>
) {
  const request = API_REQUESTS.limit(endPoint, { start, limit, locale, sort });
  logger.info(`Api request: ${request}`);
  return fetch(request).pipe(
    switchMap((response) => {
      return response.json() as Promise<Array<{}>>;
    })
  );
}

function _count(fetch: FetchHandler, locale: string, endPoint: API_ENDPOINTS) {
  const request = API_REQUESTS.count(endPoint, { locale });
  logger.info(`Api request: ${request}`);
  return fetch(request).pipe(
    switchMap((response) => {
      return response.json() as Promise<number>;
    })
  );
}

function _customQuery(
  fetch: FetchHandler,
  request: string,
  endPoint: API_ENDPOINTS
) {
  logger.info(`Api request: ${request}`);
  return fetch(`${APP_CONFIG}/${endPoint}/${request}`).pipe(
    switchMap((response) => {
      return response.json() as Promise<number>;
    })
  );
}

export {
  API_REQUESTS,
  API_ENDPOINTS,
  _get,
  _getAll,
  _getByListParam,
  _getByName,
  _customQuery,
  _count,
  FetchHandler,
  _getWithLimit,
};
