import api from "@/helpers/api";
import contants from "@/helpers/utils";

api.interceptors.response.use(
  (res) => res,
  (err) => Promise.reject(err)
);

// -- API SERVICES

export const getLocation = (param: any) => {
  return api.get(`${contants.osa_nominatim_base_host}`, {
    params: param,
  });
};

export const getHotel = (param: any) => {
  return api.get(`${contants.rapidapi_base_host}hotels/expressResults`, {
    params: param,
    headers: {
      "X-RapidAPI-Key": contants.rapidapi_key,
      "X-RapidAPI-Host": contants.rapidapi_host,
    },
  });
};

export const getHotelDetail = (param: any) => {
  return api.get(`${contants.rapidapi_base_host}hotels/details`, {
    params: param,
    headers: {
      "X-RapidAPI-Key": contants.rapidapi_key,
      "X-RapidAPI-Host": contants.rapidapi_host,
    },
  });
};