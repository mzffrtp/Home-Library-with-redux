import {createStore,combineReducers} from "redux";

import booksreducer from "./reducers/booksReducers";
import categoriesReducer from "./reducers/categoriesReducer";

const rootReducer = combineReducers({
    booksState: booksreducer,
    categoriesState: categoriesReducer
})

const store = createStore(rootReducer)

export default store