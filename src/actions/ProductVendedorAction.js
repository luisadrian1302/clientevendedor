import Swal  from "sweetalert2/dist/sweetalert2";
import { URLAPI } from "../url";
import types from "../types";

export const mandarInfomracionGeneralProducto = (data, navegate) => {

    return async (dispatch) => {
        try {
            let token = localStorage.getItem("token");

            const response = await fetch(`${URLAPI}/product/crearProducto`, {
                method: 'POST',
                body: data,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            },);
    
            if (!response.ok) {
                throw new Error('Error al enviar la informacion');
            }
    
            const imageUrl = await response.text();

            if (imageUrl) {
                Swal.fire({
                    title: 'Se creo el producto con exito',
                    text: 'Se creo el producto de forma exitosa',
                    icon: 'success',
                    confirmButtonText: 'Aceptar',
                  }).then((result) => {
                    /* Read more about isConfirmed, isDenied below */

                    dispatch(crearProducto(generateRandomSixDigitNumber()))
                    // actualizar el mensaje
                    navegate("/vendedorProductos");


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
            Swal.fire({
                title: 'Error!',
                text: 'Ocurrio un error en el servidor, intenelo mas tarde',
                icon: 'error',
                confirmButtonText: 'Aceptar'
              })
            
        }

      

    }
} 


export const actualizarInfomracionGeneralProducto = (data, navegate) => {

    return async (dispatch) => {
        try {
            let token = localStorage.getItem("token");

            const response = await fetch(`${URLAPI}/product/actualizarProducto`, {
                method: 'POST',
                body: data,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            },);
    
            if (!response.ok) {
                throw new Error('Error al enviar la informacion');
            }
    
            const imageUrl = await response.text();

            if (imageUrl) {
                Swal.fire({
                    title: 'Se actualizó el producto con exito',
                    text: 'Se actualizó el producto de forma exitosa',
                    icon: 'success',
                    confirmButtonText: 'Aceptar',
                  }).then((result) => {
                    /* Read more about isConfirmed, isDenied below */

                    dispatch(crearProducto(generateRandomSixDigitNumber()))
                    // actualizar el mensaje
                    navegate("./");


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
            Swal.fire({
                title: 'Error!',
                text: 'Ocurrio un error en el servidor, intenelo mas tarde',
                icon: 'error',
                confirmButtonText: 'Aceptar'
              })
            
        }

      

    }
} 

function generateRandomSixDigitNumber() {
    return Math.floor(100000 + Math.random() * 900000);
  }
  

const crearProducto = (updated) => ({

    type: types.crearProducto,
    payload: {
        msg: 'se registró exitosamente',
        updated
    }
})
