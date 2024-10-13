import axios, { AxiosError } from "axios";
import axiosRateLimit from "axios-rate-limit";

import * as types from "./sciencemuseumtypes";

const axiosInstance = axios.create({
  baseURL: "https://collectionapi.metmuseum.org/public/collection/v1",
});
const api = axiosRateLimit(axiosInstance, {
  maxRequests: 5,
  perMilliseconds: 1000,
});

export function objects(): Promise<types.Objects> {
  return api.get("/objects").then((response) => {
    return response.data.objectIDs;
  });
}

export function object(objectId: number): Promise<types.Object> {
  return api
    .get(`/objects/${objectId}`)
    .then((response) => {
        console.log(response.data);
        
      return response.data;
    })
    .catch((error: AxiosError) => {
      if (error.status === 404) {
        return null;
      }
    });
}

export function departments(): Promise<types.Departments> {
  return api.get("/departments").then((response) => {
    return response.data.departments;
  });
}

export function search(query: string): Promise<types.Search> {
  return api.get(`/search?q=${query}&hasImages=true`).then((response) => {
    console.log(response.data);

    return response.data;
  });
}
