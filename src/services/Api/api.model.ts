import { map } from "rxjs/operators";
import { API_ENDPOINTS } from "./api";
import { getById, getAll, getByListParam, getByName, getWithLimit, count, customQuery } from ".";
import { throwError } from "rxjs";
import { CustomError } from "../../utils/error";


type EndPointType = 'single' | 'collection'

abstract class ApiEntity<R> {
  protected endPoint: API_ENDPOINTS;
  protected endPointType: EndPointType;

  constructor(endPoint: API_ENDPOINTS, endPointType: EndPointType = 'collection') {
    this.endPoint = endPoint;
    this.endPointType = endPointType;
  }

  protected abstract validate(rawData: Array<unknown>): R;


  private entityTypeErrorFactory() {
    return new CustomError(`This operation is not supported of entity ${this.endPoint}`, { name: 'APIError' })
  }

  get(id: string) {
    if (this.endPointType === 'single') {
      return throwError(this.entityTypeErrorFactory)
    }
    return getById(this.endPoint)(id).pipe(
      map((responseData) => this.validate([responseData]))
    );
  }

  getByName(value: string, options: { locale: string }) {
    /* this should be a decorator */
    if (this.endPointType === 'single') {
      return throwError(this.entityTypeErrorFactory)
    }

    return getByName(options.locale)(this.endPoint)(value).pipe(
      map((responseData) => this.validate(responseData))
    );
  }
  getByListParam(
    field: string,
    filterValues: Array<string>,
    options?: { locale: string }
  ) {
    if (this.endPointType === 'single') {
      return throwError(this.entityTypeErrorFactory)
    }

    return getByListParam(options?.locale ?? null)(this.endPoint)(field)(
      filterValues
    ).pipe(map((responseData) => this.validate(responseData)));
  }

  getAll(options?: { locale: string }) {
    return getAll(options?.locale ?? null)(this.endPoint).pipe(
      map((responseData) => {
        if(this.endPointType === 'single'){
          return this.validate([responseData]);
        } else {
          return this.validate(responseData);
        }
        
      })
    );
  }

  getWithLimit(start: number, limit: number, locale: string, sort?: Array<{ field: string, order: 'ASC' | 'DESC' }>) {
    if (this.endPointType === 'single') {
      return throwError(this.entityTypeErrorFactory)
    }
    return getWithLimit(locale ?? null)(this.endPoint)(start)(limit)(sort).pipe(
      map((responseData) => this.validate(responseData))
    );
  }
  count(locale: string) {
    if (this.endPointType === 'single') {
      return throwError(this.entityTypeErrorFactory)
    }
    return count(locale ?? null)(this.endPoint)
  }

  customQuery(request: string) {
    if (this.endPointType === 'single') {
      return throwError(this.entityTypeErrorFactory)
    }
    return customQuery(request)(this.endPoint)
  }
}
export { ApiEntity };
