export const VersionHash = "DeWalt";

export function ToCacheBustable(uri: string): string {
  return uri + "?hash=" + VersionHash;
}
