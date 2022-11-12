import { type, string, enums, optional, nullable } from "superstruct";
const MediaAssetStruct = type({
  ext: enums([".svg", ".jpg", ".jpeg", ".png"]),
  url: string(),
  name: string(),
  formats: nullable(
    type({
      thumbnail: optional(type({ url: string() })),
      small: optional(type({ url: string() })),
      medium: optional(type({ url: string() })),
      large: optional(type({ url: string() })),
    })
  ),
});
interface MediaAsset {
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

function extractAsset(asset: MediaAsset, host: string) {
  let thumbnail: string;
  let small: string;
  let medium: string;
  let large: string;
  if (asset.ext === ".jpg") {
    thumbnail = host + asset.formats.thumbnail.url;
    small = host + asset.formats.small.url;
    medium = host + asset.formats.medium.url;
    large = host + asset.formats.large.url;
  } else {
    thumbnail = small = medium = large = host + asset.url;
  }
  return { thumbnail, small, medium, large };
}

/* function fetchImageDetails(fetchHandler: FetchHandler ,mainUrl: string, host: string) {
  const fetchUrl = `${host}/upload/files?url_eq=${mainUrl}`;
  return fetchHandler(fetchUrl).pipe(
    switchMap(response => response.json()),
    map(response => extractAsset(validateStruct(response[0],MediaAssetStruct, 'ImgAsset' ),host))
  );
} */

export { extractAsset, /* fetchImageDetails ,*/ MediaAssetStruct, MediaAsset };
