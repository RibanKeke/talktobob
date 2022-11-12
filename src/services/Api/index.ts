import { curry } from "ramda";
import { fromFetch } from "rxjs/fetch";
import {
  _getAll,
  _get,
  _getByListParam,
  _getByName,
  _getWithLimit,
  _count,
  _customQuery
} from "./api";

const getAll = curry(_getAll)(fromFetch);
const getById = curry(_get)(fromFetch);
const getByName = curry(_getByName)(fromFetch);
const getByListParam = curry(_getByListParam)(fromFetch);
const getWithLimit = curry(_getWithLimit)(fromFetch);
const count = curry(_count)(fromFetch);
const customQuery = curry(_customQuery)(fromFetch);

export { getAll, getById, getByListParam, getByName, getWithLimit, count, customQuery };
