import axios from "axios";
import types from "../types";
import { URLAPI } from "../url";

function generateRandomSixDigitNumber() {
    return Math.floor(10000000 + Math.random() * 90000000);
}
  


export const actualizarProductos = () => {
    return async(dispatch) => {

        console.log("updated");
        
        dispatch(actualizarProductosDispatch(generateRandomSixDigitNumber()));
    }

}


export const countNotification = () => {
    return async(dispatch) => {

        try {        
            const token = localStorage.getItem('token'); 
            

            // const autor =await clienteAxios.post("/autor", datos);
            const data = await axios.get(`${URLAPI}/notifications/getcountByID`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
           
            console.log(data);
            dispatch( obtenerNuevasNotificaciones(data.data))
            
            
        } catch (error) {
            console.log(error);
            
        }
        
        // dispatch(actualizarProductosDispatch(generateRandomSixDigitNumber()));
    }

}


const actualizarProductosDispatch = (update) => ({

    type: types.actualizarProductos,
    payload: {
        update
    }
})


const obtenerNuevasNotificaciones = (update) => ({

    type: types.actualizarNotificacion,
    payload: {
        update
    }
})