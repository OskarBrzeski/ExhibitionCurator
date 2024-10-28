import axios from "axios";
import axiosRateLimit from "axios-rate-limit";
import { Object, Search } from "./api";

const axiosInstance = axios.create({
  baseURL: "https://openaccess-api.clevelandart.org/api/artworks?cc0=true",
});
const api = axiosRateLimit(axiosInstance, {
  maxRequests: 60,
  perMilliseconds: 1000,
});

export function getObjectById(objectId: number): Promise<Object> {
  return api.get(`/artworks/${objectId}`).then((response) => {
    console.log(response.data);

    const obj = response.data;

    return {
      medium: obj.record.techniques[0].text,
      objectDate: obj.productionDates[0].date.text,
      title: obj.record.titles[0].title,
    } as Object;
  });
}

export function getSearchByQuery(
  query: string,
  pagesize: number,
  page: number
): Promise<Search> {
  return api.get(`${query} ${pagesize} ${page}`);
}
