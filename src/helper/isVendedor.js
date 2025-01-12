import axios from "axios";
import { URLAPI } from "../url";

export const verificarVendedor = async (token) => {
    try {        
        // const autor =await clienteAxios.post("/autor", datos);
        const data = await axios.get(`${URLAPI}/users/isVendedor`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const usuarioDatos =await data.data;
        // dispatch(registrar())
        return true;
    } catch (error) {
        console.log(error);
        
        return false;

        
    }
}