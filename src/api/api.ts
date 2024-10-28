import * as metmuseum from "./metmuseum";
import * as vamuseum from "./vamuseum";

type apiModule = {
  getObjectById: (objectId: number) => Promise<Object>;
};

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

const api: Record<string, apiModule> = { met: metmuseum, va: vamuseum };

export function getObjectById(
  source: string,
  objectId: number
): Promise<Object> {
  return api[source].getObjectById(objectId).then((data) => data);
}
