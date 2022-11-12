import { of } from "rxjs";
import { FetchHandler } from "../services/Api/api";

const mockFetchFactory = ({json,ok,status}:{json:Array<unknown>|unknown; ok:boolean; status:number}):jest.MockedFunction<FetchHandler> => jest.fn().mockReturnValue(of({json: async () => json, ok,status}));
const mockFetchNotFound = mockFetchFactory({json:[], ok:false,status:404});
const mockFetchHandler = mockFetchFactory({json:[], ok:true,status:200});

export {mockFetchFactory, mockFetchNotFound,mockFetchHandler}