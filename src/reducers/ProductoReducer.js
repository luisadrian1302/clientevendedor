import types from "../types";

const initialState = {
  
    isCreated: "",
   
}


export default (state = initialState, {type, payload}) => {
    switch (type){
        case types.crearProducto:
            return {
                ...state,
                isCreated: payload.updated,
               
               
        }
        default:
            return {
                ...state
        }
    }
}