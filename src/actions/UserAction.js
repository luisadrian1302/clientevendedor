import types from "../types"
// import { Swal } from "sweetalert2/dist/sweetalert2";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'


import { URL, URLAPI } from "../url";
import axios from "axios";

export const actualizarInformacionGeneral = (datos, token) => {

    return async(dispatch) => {

        try {        

            // const autor =await clienteAxios.post("/autor", datos);
            const data = await axios.post(`${URLAPI}/users/informacionGeneral`, datos, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const usuarioDatos =await data.data;
            // dispatch(registrar())
            if (usuarioDatos) {
                Swal.fire({
                    title: 'Actualización con exitó!',
                    text: 'Se actualizó correctamente tu cuenta',
                    icon: 'success',
                    confirmButtonText: 'Aceptar',
                  }).then((result) => {
                    /* Read more about isConfirmed, isDenied below */
                    

                    dispatch(actualizarUno(generateRandomSixDigitNumber()))
                    // actualizar el mensaje

                  });
            }else{

                Swal.fire({
                    title: 'Error!',
                    text: 'Ocurrio un error',
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                  })

            }
            
        } catch (error) {
            console.log(error);
            
            Swal.fire({
                title: 'Error!',
                text: error.response.data.email,
                icon: 'error',
                confirmButtonText: 'Aceptar'
              })

            
        }

       
    }
}



export const actualizarPassword = (datos, token) => {

    return async(dispatch) => {

        try {        

            // const autor =await clienteAxios.post("/autor", datos);
            const data = await axios.post(`${URLAPI}/users/updatedPassword`, datos, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const usuarioDatos =await data.data;
            // dispatch(registrar())
            if (usuarioDatos) {
                Swal.fire({
                    title: 'Actualización con exitó!',
                    text: 'Se actualizó correctamente tu contraseña',
                    icon: 'success',
                    confirmButtonText: 'Aceptar',
                  }).then((result) => {
                    /* Read more about isConfirmed, isDenied below */
                    dispatch(actualizarpassword2(generateRandomSixDigitNumber()))
                    datos.newpassword = "";
                    datos.newpasswordRepeat = "";
                    datos.oldpassword = "";
                    // actualizar el mensaje

                  });
            }else{

                Swal.fire({
                    title: 'Error!',
                    text: 'Ocurrio un error',
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                  })

            }
            
        } catch (error) {
            console.log(error);
            
            Swal.fire({
                title: 'Error!',
                text: error.response.data.message,
                icon: 'error',
                confirmButtonText: 'Aceptar'
              })

            
        }

       
    }
}
export const actualizarImagenPerfil = (datos, token) => {

    return async(dispatch) => {

        try {        

            // const autor =await clienteAxios.post("/autor", datos);
            const response = await fetch(`${URLAPI}/users/uploadImage`, {
                method: 'POST',
                body: datos,
                headers: {
                    Authorization: `Bearer ${token}`
                }
              }, );
          
              if (!response.ok) {
                throw new Error('Error al subir la imagen');
              }
          
              const imageUrl = await response.text();
              console.log('Imagen subida exitosamente:', imageUrl);
            // dispatch(registrar())
            if (imageUrl) {
                Swal.fire({
                    title: 'Actualización de perfil con exitó!',
                    text: 'Se actualizó correctamente tu foto de perfil de tu cuenta',
                    icon: 'success',
                    confirmButtonText: 'Aceptar',
                  }).then((result) => {
                    /* Read more about isConfirmed, isDenied below */

                    dispatch(actualizarProfile(generateRandomSixDigitNumber()))
                    // actualizar el mensaje

                  });
            }else{

                Swal.fire({
                    title: 'Error!',
                    text: 'Ocurrio un error',
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                  })

            }
            
        } catch (error) {
            console.log(error);
            
            Swal.fire({
                title: 'Error!',
                text: error.response.data.email,
                icon: 'error',
                confirmButtonText: 'Aceptar'
              })

            
        }

       
    }
}


function generateRandomSixDigitNumber() {
    return Math.floor(100000 + Math.random() * 900000);
  }
  
  // Ejemplo de uso

  

const actualizarUno = (updated) => ({

    type: types.infoGeneral,
    payload: {
        msg: 'se registró exitosamente',
        updated
    }
})

const actualizarProfile = (updated) => ({

    type: types.updatedProfile,
    payload: {
        msg: 'se registró exitosamente',
        updated
    }
})


const actualizarpassword2 = (updated) => ({

    type: types.updatedPassowrd,
    payload: {
        msg: 'se registró exitosamente',
        updated
    }
})


