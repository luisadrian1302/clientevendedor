
import types from "../types"
// import { Swal } from "sweetalert2/dist/sweetalert2";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'


import { URL as URL2, URLAPI } from "../url";
import axios from "axios";

export const registrarUsuario = (datos, navigation) => {

    return async(dispatch) => {

        try {        

            // const autor =await clienteAxios.post("/autor", datos);
            const data = await axios.post(`${URLAPI}/users/register`, datos);
            const usuarioDatos =await data.data;
            // dispatch(registrar())
            if (data.status == 201) {
                Swal.fire({
                    title: 'Exito!',
                    text: 'Se registró correctamente, se mando un codigo de seguridad para habilitar su cuenta',
                    icon: 'success',
                    confirmButtonText: 'Aceptar',
                  }).then((result) => {
                    /* Read more about isConfirmed, isDenied below */
                    console.log(navigation);

                    // let data = {
                    //     correo: usuarioDatos.email,
                    //     id: usuarioDatos.id,
                    // }
                    // localStorage.setItem("datos_personales", JSON.stringify(data))
                    
                    navigation("/login");

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


export const verificarUsuario = (datos, navigation) => {

    return async(dispatch) => {

        try {
           
            // const autor =await clienteAxios.post("/autor", datos);
            const autor =await axios.post(`${URLAPI}/users/verificar`, datos);


            if (autor.data) {
                Swal.fire({
                    title: 'Cuenta verficada',
                    text: 'Se verifico el usuario exitosamente, ahora inicie sesion para continuar con su cuenta',
                    icon: 'success',
                    confirmButtonText: 'Aceptar',
                  }).then((result) => {
                    /* Read more about isConfirmed, isDenied below */
                    navigation("/login");
                  });
            }else{

                Swal.fire({
                    title: 'Error!',
                    text: 'No se pudo colocar a la base de datos',
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                  })

            }
            
        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: error.response.data.message,
                icon: 'error',
                confirmButtonText: 'Aceptar'
              })

            
        }
    }
}

export const loginUser = (datos, navigation) => {

    return async(dispatch) => {

        try {
            

            // const autor =await clienteAxios.post("/autor", datos);
            const autor =await axios.post(`${URL2}/login`, datos);


            if (autor.data) {
                Swal.fire({
                    title: 'Correcto',
                    text: 'Inicio sesión correctamente',
                    icon: 'success',
                    confirmButtonText: 'Aceptar',
                  }).then((result) => {
                    /* Read more about isConfirmed, isDenied below */

                    localStorage.setItem("token", autor.data.token);
                    localStorage.setItem("email", autor.data.username);
                    dispatch(iniciarSesion(autor.data.token, autor.data));

                    let route = localStorage.getItem("route");
                    if (route) {
                        
                        navigation(route);
                    }else{

                        navigation("/")
                    }
                  });
            }else{

                Swal.fire({
                    title: 'Error!',
                    text: 'No se pudo colocar a la base de datos',
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                  })

            }
            
        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: 'No se pudo iniciar sesión, intentelo de nuevo',
                icon: 'error',
                confirmButtonText: 'Aceptar'
              })

            
        }
    }
}

export const authLogin = (token) => {

    return async(dispatch) => {

        try {
            
            console.log(window.location.href);
            
            // const autor =await clienteAxios.post("/autor", datos);
            const autor =await axios.get(`${URLAPI}/users/getTokenDeserialize`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(autor.data);
            dispatch(iniciarSesion(token, autor.data));           

        } catch (error) {   
            dispatch(nologin());

            console.log(error);
            
        }
    }
}

export const cerrarSesionAuth = (navigate) => {

    return async(dispatch) => {

        
            
            // const autor =await clienteAxios.post("/autor", datos);
         
            
            
            localStorage.removeItem("token");
            localStorage.removeItem("email");
            dispatch(cerrarSesion());
            navigate("/")
        
    }
}



export const obtenerAutor = (data) => {
    return async(dispatch) => {

        dispatch(obtenerAutorDispatch(data));
    }

}

const iniciarSesion = (token, data) => ({

    
    type: types.auth,
    payload: {
        msg: 'se registró exitosamente',
        token,
        data
    }
})

const nologin = () => ({

    type: types.authFailed,
    payload: {
        msg: 'se capturo exitosamente',
    }
})

const cerrarSesion = () => ({

    type: types.cerrarsesion,
    payload: {
        msg: 'se registró exitosamente'
    }
})





const resetearValores = () => ({

    type: types.resetearValores,
    payload: {
        msg: '',
        status: false
    }
})

export const quitarValoresAutor = () => ({

    type: types.actualizarAutor,
    payload: {}
})


const obtenerAutorDispatch = (autor) => ({

    type: types.obtenerAutor,
    payload: {
        autor
    }
})