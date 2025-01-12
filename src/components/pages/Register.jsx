import React, { useState } from 'react'
import '../../styles/auth.css'
import { Formik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';

import axios from 'axios'
import { URL, URLAPI } from '../../url';
import { useDispatch, useSelector } from "react-redux";
import { registrarUsuario } from '../../actions/AuthAction';


export const Register = () => {
    const [error, setError] = useState("")

    const dispatch = useDispatch();
    const navigate = useNavigate();
    return (
        <>

            <div class="container ">
                <div class="row">
                    <div class="col-md-5 mx-auto">
                        <div id="first">
                            <div class="myform form ">
                                <div class="logo mb-3">
                                    <div class="col-md-12 text-center">
                                        <h1>Registrar</h1>
                                    </div>
                                </div>


                                <Formik
                                    initialValues={{ email: '', password: '', nombre: '' }}
                                    validate={values => {
                                        const errors = {};
                                        console.log(values);
                                        if (!values.nombre) {
                                            errors.nombre = 'Campo requerido';
                                        } 

                                        
                                        if (!values.email ) {
                                            errors.email = 'Campo requerido';
                                        }else if (
                                            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                                        ) {
                                            errors.email = 'El correo electronico es invalido';
                                        }
                                        return errors;
                                    }}
                                    onSubmit={async (values, { setSubmitting }) => {

                                        try {
                                            let datos = {
                                                "password": values.password,
                                                "name": values.nombre,
                                                "email": values.email
                                            }
                                            dispatch(registrarUsuario(datos, navigate))
                                            
                                            // setSubmitting(false);
                                        } catch (error) {
                                            console.log(error);
                                            
                                            // setError(error.getMessage)
                                        }
                                       
                                    }}
                                >
                                    {({
                                        values,
                                        errors,
                                        touched,
                                        handleChange,
                                        handleBlur,
                                        handleSubmit,
                                        isSubmitting,
                                        /* and other goodies */
                                    }) => (
                                        <form onSubmit={handleSubmit} name="login">

                                            <div class="form-group mb-3">
                                                <label for="exampleInputEmail1">Nombre</label>
                                                <input
                                                        type="text"
                                                        name="nombre"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.nombre}
                                                        class="form-control"
                                                        placeholder="Ingrese su nombre"  
                                                    />
                                            </div>
                                            <p  className='text-danger'>
                                                {errors.nombre && touched.nombre && errors.nombre}
                                            </p>
                                           

                                            <div className="form-group mb-3">
                                                <label for="exampleInputEmail1">Correo electronico</label>
                                                <input
                                                        type="email"
                                                        name="email"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.email}
                                                        class="form-control"
                                                        placeholder="Ingrese su correo"  
                                                    />
                                            </div>
                                            <p className='text-danger'>
                                                {errors.email && touched.email && errors.email}
                                            </p>

                                            <div className="form-group mb-3">
                                                <label for="exampleInputEmail1">Password</label>
                                                <input
                                                        type="password"
                                                        name="password"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.password}
                                                        class="form-control" aria-describedby="emailHelp" placeholder="Enter Password" 
                                                    />
                                            </div>
                                            {errors.password && touched.password && errors.password}

                                            <p className='text-danger'>
                                                {error}
                                            </p>
                                        

                                            <div className="form-group mb-3">
                                                <p class="text-center">Al iniciar sesion aceptas los <a href="#">teminos y condiciones</a></p>
                                            </div>
                                            <div className="col-md-12 text-center ">
                                                <button type="submit" class=" btn btn-block  w-100 mybtn btn-primary tx-tfm" disabled={isSubmitting}>Registrar</button>
                                            </div>

                                            <div className="col-md-12 ">
                                        <div className="login-or">
                                            <hr className="hr-or" />
                                            <span className="span-or">o</span>
                                        </div>
                                    </div>
                                    <div className="col-md-12 mb-3">
                                        <p className="text-center">
                                            <a href="javascript:void();" class="google btn mybtn"><i className="fa fa-google-plus">
                                            </i> Signup using Google
                                            </a>
                                        </p>
                                    </div>
                                    <div className="form-group">
                                        <p className="text-center">Ya tienes cuenta? <Link to={'/login'} id="signup">Inicia sesion</Link></p>
                                    </div>
                                        </form>
                                    )}
                                </Formik>
                               

                            </div>
                        </div>
                       
                    </div>
                </div>
            </div>


        </>
    )
}
