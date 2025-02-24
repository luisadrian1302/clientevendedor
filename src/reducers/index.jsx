import { combineReducers } from "redux"
import AuthReducer from "./AuthReducer"
import ProductoReducer from "./ProductoReducer"
// import exampleReducer from "./exampleReducer"
// import autorReducer from '../reducers/autor'
// import categoriaReducer from '../reducers/Categoria'
// import libroReducer from '../reducers/Libro'

export default combineReducers({
    AuthReducer: AuthReducer,
    ProductoReducer: ProductoReducer
    // autorReducer: autorReducer,
    // categoria: categoriaReducer,
    // libro: libroReducer
}) 