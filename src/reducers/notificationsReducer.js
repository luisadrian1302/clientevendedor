import types from "../types";

const initialState = {
    isUpdateProduct: "",
    countNotifications: 0
}


export default (state = initialState, {type, payload}) => {
    switch (type){
        case types.actualizarProductos:
            return {
                ...state,
                isUpdateProduct: payload.update
               
        }
        case types.actualizarNotificacion:
            return {
                ...state,
                countNotifications: payload.update
               
        }
        default:
            return {
                ...state
        }
    }
}