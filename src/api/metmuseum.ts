import axios from "axios";
import axiosRateLimit from "axios-rate-limit";

import { Object, Search } from "./api";

const axiosInstance = axios.create({
  baseURL: "https://collectionapi.metmuseum.org/public/collection/v1",
});
const api = axiosRateLimit(axiosInstance, {
  maxRequests: 60,
  perMilliseconds: 1000,
});

export function getObjectById(objectId: number): Promise<Object> {
  return api.get(`/objects/${objectId}`).then((response) => {
    const obj = response.data;

    return {
      artistName: obj.artistDisplayName,
      artistBio: obj.artistDisplayBio,
      artistNationality: obj.artistNationality,
      department: obj.department,
      dimensions: obj.dimensions,
      medium: obj.medium,
      museumId: "met",
      objectDate: obj.objectDate,
      objectId: obj.objectId,
      objectURL: obj.objectURL,
      primaryImage: obj.primaryImage,
      primaryImageSmall: obj.primaryImageSmall,
      title: obj.title,
    } as Object;
  });
}

export function getSearchByQuery(
  query: string,
  pagesize: number,
  page: number
): Promise<Search> {
  return api.get(`/search?q=${query}&hasImages=true`).then((response) => {
    const start = (page - 1) * pagesize;
    const end = start + pagesize;

    return {
      objects: response.data.objectIDs.slice(start, end).map((id: number) => {
        return { source: "met", objectId: id };
      }),
      total: response.data.total,
    } as Search;
  });
}
