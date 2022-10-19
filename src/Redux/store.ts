import {
    combineReducers,
    legacy_createStore as createStore,
    applyMiddleware,
} from "redux";
import thunk from "redux-thunk";
import {getAllCityDataReducer} from "./Home/reducers";
import {composeWithDevTools} from "redux-devtools-extension";

const rootReducer = combineReducers({
    getAllCityDataReducer,
});

const middleware = [thunk];

export const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(...middleware))
);
