import { actionTypesHome } from "./actions";

const initialState = {
  allCityData: [],
  allCountryData: [],
  oneCity: {},
  loading: false, // handle this also
  error: null, // handle this later
};

export const getAllCityDataReducer = (
  state = initialState,
  { type, payload }: any
) => {
  switch (type) {
    case actionTypesHome.GET_ALL_CITY_DATA:
      return {
        ...state,
        allCityData: payload,
      };
    case actionTypesHome.GET_ALL_COUNTRY:
      return {
        ...state,
        allCountryData: payload,
      };
    case actionTypesHome.GET_ONE_CITY:
      return {
        ...state,
        oneCity: payload,
      };
    case actionTypesHome.REMOVE_ONE_CITY:
      return {
        ...state,
        oneCity: {},
      };
    default:
      return state;
  }
};
