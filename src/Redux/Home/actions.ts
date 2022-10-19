import axios from "axios";
import { v4 as uuid } from "uuid";

export const actionTypesHome = {
  GET_ALL_CITY_DATA: "GET_ALL_CITY_DATA",
  GET_ALL_COUNTRY: "GET_ALL_COUNTRY",
  GET_ONE_CITY: "GET_ONE_CITY",
  REMOVE_ONE_CITY: "REMOVE_ONE_CITY",
};

const getAllCityDataAction = (payload: any) => {
  return {
    type: actionTypesHome.GET_ALL_CITY_DATA,
    payload,
  };
};

const getAllCountry = (payload: any) => {
  return {
    type: actionTypesHome.GET_ALL_COUNTRY,
    payload,
  };
};

const getOneCity = (payload: any) => {
  return {
    type: actionTypesHome.GET_ONE_CITY,
    payload,
  };
};

export const removeOneCity = () => {
  return {
    type: actionTypesHome.REMOVE_ONE_CITY,
    payload: {},
  };
};

export const getOneCityCall = (id: any) => (dispatch: any) => {
  axios
    .get(`/cities/${id}`)
    .then((response) => {
      dispatch(getOneCity(response.data));
    })
    .catch((err) => {
      /**
       * Handle err
       */
    });
};

export const getAllCityDataActionCall = () => (dispatch: any) => {
  axios
    .get("/cities")
    .then((response) => {
      dispatch(getAllCityDataAction(response.data));
    })
    .catch((err) => {
      /**
       * Handle err
       */
    });
};

export const getAllCountryCall = () => (dispatch: any) => {
  axios
    .get("/countries")
    .then((response) => {
      dispatch(getAllCountry(response.data));
    })
    .catch((err) => {
      /**
       * Handle err
       */
    });
};

export const deleteCityActionCall = (id: any) => (dispatch: any) => {
  axios
    .delete(`/cities/${id}`)
    .then(() => {
      dispatch(getAllCityDataActionCall());
    })
    .catch((err) => {
      /**
       * Handle err
       */
    });
};

export const sortCityByPopulationCall =
  (sort: string, order: string) => (dispatch: any) => {
    let link: any;
    if (sort !== "" && order !== "") {
      link = `/cities?_sort=${sort}&_order=${order}`;
    } else {
      link = `/cities`;
    }
    axios
      .get(link)
      .then((response) => {
        dispatch(getAllCityDataAction(response.data));
      })
      .catch((err) => {
        /**
         * Handle err
         */
      });
  };

export const filterByCountryCall = (text: string) => (dispatch: any) => {
  axios
    .get(`/cities?q=${text}`)
    .then((response) => {
      dispatch(getAllCityDataAction(response.data));
    })
    .catch((err) => {
      /**
       * Handle err
       */
    });
};

export const postCountryCall = (country: any) => (dispatch: any) => {
  const payload = {
    id: uuid(),
    country,
  };
  axios
    .post("/countries", payload)
    .then(() => {
      dispatch(getAllCityDataActionCall());
    })
    .catch((err) => {
      /**
       * Handle err
       */
    });
};

export const postCityCall = (data: any) => (dispatch: any) => {
  const payload = {
    ...data,
    id: uuid(),
  };
  axios
    .post("/cities", payload)
    .then(() => {
      dispatch(getAllCityDataActionCall());
    })
    .catch((err) => {
      /**
       * Handle err
       */
    });
};

export const patchCityCall = (id: any, payload: any) => (dispatch: any) => {
  axios
    .put(`/cities/${id}`, payload)
    .then(() => {
      dispatch(getAllCityDataActionCall());
    })
    .catch((err) => {
      /**
       * Handle err
       */
    });
};
