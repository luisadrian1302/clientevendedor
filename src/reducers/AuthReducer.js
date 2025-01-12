import types from "../types";

const initialState = {
    token: '',
    isAuth: false,
    isCheckout: false,
    isUpdated: "",
    isUpdatedProfile: "",
    isUpdatedPassword: "",
    photo: "",
    userData: {}
}


export default (state = initialState, {type, payload}) => {
    switch (type){
        case types.auth:
            return {
                ...state,
                token: payload.token,
                userData: payload.data,
                isAuth: true,
                isCheckout: true
               
        }
        case types.authFailed:
            return {
                ...state,
                isCheckout: true
               
        }
        case types.infoGeneral:
            return {
                ...state,
                isUpdated: payload.updated
               
        }

        case types.updatedProfile:
            return {
                ...state,
                isUpdatedProfile: payload.updated
               
        }

        case types.updatedPassowrd:
            return {
                ...state,
                isUpdatedPassword: payload.updated
               
        }

        case types.cerrarsesion:
            return {
                ...state,
                token: "",
                isAuth: false,
               
        }
        default:
            return {
                ...state
        }
    }
}