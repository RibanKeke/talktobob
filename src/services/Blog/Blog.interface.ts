import { ApiEntity } from "../Api/api.model";

import { type, string, array, enums } from "superstruct";
import { validateStruct } from "../../utils/validate";
import { coerceTags } from "../serviceUtils";
import { MediaAsset, MediaAssetStruct } from "../../utils/assets";

interface Author {
  profileImg: MediaAsset;
  firstName: string;
  lastName: string;
  expertise: string;
  introduction: string;
  about: string;
}

const AuthorStruct = type({
  profileImg: MediaAssetStruct,
  firstName: string(),
  lastName: string(),
  introduction: string(),
  expertise: string(),
  about: string(),
});

const BlogStruct = type({
  id: string(),
  tags: array(string()),
  created_at: string(),
  topic: enums(["highlighted", "learning", "tipsAndTricks"]),
  updated_at: string(),
  coverImg: MediaAssetStruct,
  author: AuthorStruct,
  title: string(),
  intro: string(),
  content: string(),
});
export interface Blog {
  id: string;
  tags: Array<string>;
  topic: string;
  created_at: string;
  updated_at: string;
  coverImg: MediaAsset;
  author: Author;
  title: string;
  intro: string;
  content: string;
}
export class BlogEntity extends ApiEntity<Array<Blog>> {
  constructor() {
    super("blogs");
  }
  validate(rawData: Array<unknown>): Array<Blog> {
    return rawData.map((rawItem) =>
      validateStruct<Blog>(rawItem, BlogStruct,this.endPoint, [
        { field: "tags", transform: coerceTags },
        {
          field: "topic",
          transform: (value: string) =>
            `${value.substr(0, 1).toLowerCase()}${value.slice(1)}`,
        },
        { field: "id", transform: (id: number) => id.toString() },
      ])
    );
  }
}
