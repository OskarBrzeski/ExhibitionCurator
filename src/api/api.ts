import * as metmuseum from "./metmuseum";
import * as clemuseum from "./clemuseum";

type apiModule = {
  getObjectById: (objectId: number) => Promise<Object>;
  getSearchByQuery: (
    query: string,
    pagesize: number,
    page: number
  ) => Promise<Search>;
};

const api: Record<string, apiModule> = { met: metmuseum, cle: clemuseum };

export type Object = {
  artistName: string;
  artistBio: string;
  artistNationality: string;
  department: string;
  dimensions: string;
  medium: string;
  museumId: string;
  objectDate: string;
  objectId: number;
  objectURL: string;
  primaryImage: string;
  primaryImageSmall: string;
  title: string;
};

export function getObjectById(
  source: string,
  objectId: number
): Promise<Object> {
  return api[source].getObjectById(objectId);
}

export type Search = {
  objects: {source: string, objectId: number}[];
  total: number;
};

export function getSearchByQuery(
  source: string,
  query: string,
  pagesize: number,
  page: number
) {
  return api[source].getSearchByQuery(query, pagesize, page);
}
