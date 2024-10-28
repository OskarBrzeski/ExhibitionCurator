import axios from "axios";
import axiosRateLimit from "axios-rate-limit";

import { Object, Search } from "./api";

const axiosInstance = axios.create({
  baseURL: "https://openaccess-api.clevelandart.org/api",
});
const api = axiosRateLimit(axiosInstance, {
  maxRequests: 60,
  perMilliseconds: 1000,
});

export function getObjectById(objectId: number): Promise<Object> {
  return api.get(`/artworks/${objectId}`).then((response) => {
    const obj = response.data.data;
    let name, bio;

    if (obj.creators.length === 0) {
      name = "Unknown";
      bio = "Unknown";
    } else {
      name = obj.creators[0].description;
      bio = obj.creators[0].biography;
    }

    return {
      artistName: name,
      artistBio: bio,
      artistNationality: "",
      department: obj.department,
      dimensions: obj.measurements,
      medium: obj.technique,
      museumId: "cle",
      objectDate: obj.creation_date,
      objectId: objectId,
      objectURL: obj.url,
      primaryImage: obj.images.web.url,
      primaryImageSmall: obj.images.web.url,
      title: obj.title,
    } as Object;
  });
}

export function getSearchByQuery(
  query: string,
  pagesize: number,
  page: number
): Promise<Search> {
  return api
    .get(`/artworks`, {
      params: {
        q: query,
        limit: pagesize,
        skip: (page - 1) * pagesize,
        cc0: true,
        has_image: 1,
      },
    })
    .then((response) => {
      const obj = response.data;

      return {
        objects: obj.data.map((curr: { id: number }) => {
          return { objectId: curr.id, source: "cle" };
        }),
        total: obj.info.total,
      } as Search;
    });
}
