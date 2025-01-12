import React from 'react'
import '../../styles/auth.css'
import { Formik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../actions/AuthAction';

export const Login = () => {
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
                                        <h1>Iniciar sesión</h1>
                                    </div>
                                </div>


                                <Formik
                                    initialValues={{ email: '', password: '' }}
                                    validate={values => {
                                        const errors = {};
                                        if (!values.password) {
                                            errors.password = 'Campo requerido';
                                        }

                                        if (!values.email) {
                                            errors.email = 'Campo requerido';
                                        } else if (
                                            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                                        ) {
                                            errors.email = 'Correo electronico invalido';
                                        }
                                        return errors;
                                    }}
                                    onSubmit={(values, { setSubmitting }) => {
                                        try {
                                            
                                            dispatch(loginUser(values, navigate))
                                            setSubmitting(false)
                                        } catch (error) {

                                            console.log(error);
                                            
                                            setSubmitting(false)
                                            
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
                                                <label for="exampleInputEmail1">Correo electronico</label>
                                                <input
                                                        type="email"
                                                        name="email"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.email}
                                                        class="form-control"
                                                        placeholder="Enter email"  
                                                    />
                                            </div>
                                            <p className='text-danger'>
                                                
                                                {errors.email && touched.email && errors.email}
                                            </p>

                                            <div class="form-group mb-3">
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
                                            <p className='text-danger'>

                                                {errors.password && touched.password && errors.password}
                                            </p>
                                        

                                            <div class="form-group mb-3">
                                                <p class="text-center">Al iniciar sesion aceptas los <a href="#">teminos y condiciones</a></p>
                                            </div>
                                            <div class="col-md-12 text-center ">
                                                <button type="submit" class=" btn btn-block  w-100 mybtn btn-primary tx-tfm" disabled={isSubmitting}>Login</button>
                                            </div>

                                            <div class="col-md-12 ">
                                        <div class="login-or">
                                            <hr class="hr-or" />
                                            <span class="span-or">o</span>
                                        </div>
                                    </div>
                                    <div class="col-md-12 mb-3">
                                        <p class="text-center">
                                            <a href="javascript:void();" class="google btn mybtn"><i class="fa fa-google-plus">
                                            </i> Signup using Google
                                            </a>
                                        </p>
                                    </div>
                                    <div class="form-group">
                                        <p class="text-center">No tienes cuenta? <Link to={'/register'} id="signup">registrate</Link></p>
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
