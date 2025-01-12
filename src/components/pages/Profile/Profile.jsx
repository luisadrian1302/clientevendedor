import { User } from 'lucide-react'
import React, { useEffect, useMemo, useState } from 'react'
import "../../../styles/profile.css"
import axios from 'axios'
import countries from "../../../countries.json";
import { URLAPI } from '../../../url'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { actualizarImagenPerfil, actualizarInformacionGeneral, actualizarPassword } from '../../../actions/UserAction';
import UserImageModal from '../../layout/modal/UserImageModal';
import { HeaderProfile } from '../../layout/componentes/HeaderProfile';

export const Profile = () => {


    const [datos, setdatos] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        countryCode: ''
    })
    const [changePassword, setchangePassword] = useState({
        newpassword: '',
        newpasswordRepeat: '',
        oldpassword: ''
    })
    const formikInitialValues = useMemo(() => changePassword, [changePassword]);

    const { isUpdated, isUpdatedProfile, isUpdatedPassword } = useSelector(re => re.AuthReducer);


    const [dataStatic, setDataStatic] = useState({})
    const [dataImageObject, setUataImageObject] = useState("")

    const dispatch = useDispatch();
    const navegate = useNavigate();

    const [isVerified, setIsVerified] = useState(false);


    const [showModal, setShowModal] = useState(false);

    const handleImageUpdate = (file) => {
        // Aquí manejas la lógica para subir la imagen al servidor
        console.log('Archivo a subir:', file);
        let token = localStorage.getItem("token")

        const formData = new FormData();
        formData.append('image', file);

        dispatch(actualizarImagenPerfil(formData, token))
    };

    useEffect(() => {

        const obtenerUsuario = async () => {

            try {
                let token = localStorage.getItem("token")
                const { data } = await axios.get(`${URLAPI}/users/getTokenDeserialize`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })

                setDataStatic(data);
                setdatos({
                    email: data.email,
                    firstName: data.nombre,
                    lastName: data.apellidos ?? "",
                    phone: data.numeroTelefonico ?? "",
                    countryCode: data.code_number ?? ""
                });
                setIsVerified(data.verifiedNumber)

                // obtener la imagen

                const response = await fetch(`${URLAPI}/users/image/${data.email}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (!response.ok) throw new Error('Image not found');
                const blob = await response.blob();
                const imageUrl = URL.createObjectURL(blob);


                // Usar la URL en un elemento img
                console.log(imageUrl);
                setUataImageObject(imageUrl)
            } catch (error) {
                console.log("se cerró la sesion", error);
            }
        }

        obtenerUsuario();
    }, [])

    useEffect(() => {

        const obtenerUsuario = async () => {

            try {
                let token = localStorage.getItem("token")

                const { data } = await axios.get(`${URLAPI}/users/getTokenDeserialize`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })

                setDataStatic(data);
                setdatos({
                    email: data.email,
                    firstName: data.nombre,
                    lastName: data.apellidos ?? "",
                    phone: data.numeroTelefonico ?? "",
                    countryCode: data.code_number ?? ""
                });
                setIsVerified(data.verifiedNumber)




            } catch (error) {

                console.log("se cerró la sesion", error);


            }

        }

        obtenerUsuario();
    }, [isUpdated])

    useEffect(() => {

        const obtenerUsuario = async () => {

            try {
                let token = localStorage.getItem("token")



                // obtener la imagen

                const response = await fetch(`${URLAPI}/users/image/${dataStatic.email}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (!response.ok) throw new Error('Image not found');
                const blob = await response.blob();
                const imageUrl = URL.createObjectURL(blob);


                // Usar la URL en un elemento img
                console.log(imageUrl);
                setUataImageObject(imageUrl)
            } catch (error) {
                console.log("se cerró la sesion", error);
            }
        }

        obtenerUsuario();
    }, [isUpdatedProfile])

    useEffect(() => {
        setchangePassword({
            newpassword: "",
            newpasswordRepeat: "",
            oldpassword: ""
        })

        console.log("desdeupdate", isUpdatedPassword);


    }, [isUpdatedPassword])






    function obtenerEstado() {

        if (dataStatic.client) {

            if (dataStatic.client.status == 1) {

                return <p className="card-text text-success">Cuenta verificada</p>
            } else {
                return <p className="card-text text-danger">Cuenta no verificada</p>

            }

        } else {
            return <p className="card-text text-danger">Cuenta no verificada</p>
        }

    }

    return (
        <>

            <div className="container my-4">
                <h2 className="mb-4">Usuario</h2>
                <HeaderProfile/>

                <div className="row mt-4">
                    {/* Formulario */}
                    <div className="col-md-8 " >
                        <div className="p-3 p-md-4 p-sm-3" style={{ background: "white" }}>
                            <h4>Información general</h4>
                            <Formik
                                enableReinitialize
                                initialValues={datos}
                                validate={values => {

                                    console.log(values);

                                    const errors = {};
                                    if (!values.firstName) errors.firstName = 'Requerido';
                                    if (!values.lastName) errors.lastName = 'Requerido';
                                    if (!values.email) {
                                        errors.email = 'Requerido';
                                    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
                                        errors.email = 'Email inválido';
                                    }
                                    if (!values.phone) errors.phone = 'Requerido';
                                    return errors;
                                }}
                                onSubmit={(values, { setSubmitting }) => {

                                    try {
                                        console.log(values);

                                        let token = localStorage.getItem("token");
                                        dispatch(actualizarInformacionGeneral(values, token))
                                        setSubmitting(false)
                                        console.log('Formulario enviado con los siguientes datos:', values);


                                    } catch (error) {
                                        setSubmitting(false)

                                    }


                                }}
                            >
                                {({ handleSubmit, isSubmitting }) => (
                                    <Form onSubmit={handleSubmit}>
                                        <div className="row mb-3">
                                            <div className="col-md-6">
                                                <label htmlFor="firstName" className="form-label">
                                                    Nombre *
                                                </label>
                                                <Field
                                                    type="text"
                                                    className="form-control"
                                                    id="firstName"
                                                    name="firstName"

                                                />
                                                <ErrorMessage name="firstName" component="div" className="text-danger" />
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="lastName" className="form-label">
                                                    Apellido *
                                                </label>
                                                <Field
                                                    type="text"
                                                    className="form-control"
                                                    id="lastName"
                                                    name="lastName"
                                                />
                                                <ErrorMessage name="lastName" component="div" className="text-danger" />
                                            </div>
                                        </div>


                                        <div className="mb-4 ">
                                            <label htmlFor="email" className="form-label">
                                                Email *
                                            </label>
                                            <Field
                                                type="email"
                                                className="form-control"
                                                id="email"
                                                name="email"
                                                disabled
                                            />
                                            <ErrorMessage name="email" component="div" className="text-danger" />
                                        </div>

                                        <div className="mb-3 ">
                                            <div className="row">

                                                <label htmlFor="phone" className="form-label col-6 ">
                                                    Teléfono *
                                                </label>


                                                {
                                                    isVerified ?
                                                        <span className="text-end text-success col-6">Número verificado</span>

                                                        :
                                                        <span className="text-end text-danger col-6">Número sin verificar</span>

                                                }

                                            </div>
                                            <div className=" row ">

                                                <div className="col-lg-3 col-sm-3 col-4">
                                                    <Field as="select" name="countryCode" className="form-select">

                                                        {countries.map(e => (
                                                            <option value={e.dial_code} key={e.code}>{e.name + " " + e.dial_code}</option>

                                                        ))}

                                                    </Field>

                                                </div>
                                                <div className="col-lg-9 col-sm-9 col-8">


                                                    <Field
                                                        type="text"
                                                        className="form-control"
                                                        id="phone"
                                                        name="phone"
                                                    />
                                                </div>

                                            </div>
                                            <ErrorMessage name="phone" component="div" className="text-danger" />
                                        </div>

                                        <button type="submit" className="btn btn-warning" disabled={isSubmitting}>
                                            Actualizar información
                                        </button>
                                    </Form>
                                )}
                            </Formik>
                            <hr />

                            <h4 className=" mt-5">Contraseñas</h4>
                            <Formik
                                enableReinitialize
                                initialValues={changePassword} // Se asegura de que sea un nuevo objeto al cambiar
                                validate={values => {
                                    const errors = {};
                                    if (values.newpassword !== values.newpasswordRepeat) {
                                        errors.newpassword = 'Las contraseñas deben coincidir';
                                        errors.newpasswordRepeat = 'Las contraseñas deben coincidir';
                                    }
                                    if (!values.newpassword) errors.newpassword = 'Requerido';
                                    if (!values.newpasswordRepeat) errors.newpasswordRepeat = 'Requerido';
                                    if (!values.oldpassword) {
                                        errors.oldpassword = 'Requerido';
                                    }
                                    return errors;
                                }}
                                onSubmit={async (values, { setSubmitting }) => {
                                    try {
                                        const token = localStorage.getItem("token");
                                        dispatch(actualizarPassword(values, token));
                                        setSubmitting(false);
                                       
                                    } catch (error) {
                                        console.log(error);
                                        
                                        setSubmitting(false);
                                    }
                                }}
                            >
                                {({ handleSubmit, isSubmitting }) => (
                                    <Form onSubmit={handleSubmit}>
                                        <div className="row mb-3">
                                            <div className="col-md-6">
                                                <label htmlFor="newPassword" className="form-label">Cambiar contraseña</label>
                                                <Field
                                                    type="text"
                                                    className="form-control"
                                                    id="newpassword"
                                                    name="newpassword"
                                                />
                                                <ErrorMessage name="newpassword" component="div" className="text-danger" />
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="repeatPassword" className="form-label">Repetir contraseña</label>
                                                <Field
                                                    type="text"
                                                    className="form-control"
                                                    id="newpasswordRepeat"
                                                    name="newpasswordRepeat"
                                                />
                                                <ErrorMessage name="newpasswordRepeat" component="div" className="text-danger" />
                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="currentPassword" className="form-label">* Introducir contraseña</label>
                                            <Field
                                                type="text"
                                                className="form-control"
                                                id="oldpassword"
                                                name="oldpassword"
                                            />
                                            <ErrorMessage name="oldpassword" component="div" className="text-danger" />
                                        </div>
                                        <button type="submit" className="btn btn-warning" disabled={isSubmitting}>
                                            Actualizar información
                                        </button>
                                    </Form>
                                )}
                            </Formik>

                        </div>

                    </div>

                    {/* Perfil */}
                    <div className="col-md-4 mt-lg-0 mt-2  text-center" >
                        <div className="card p-3 " style={{ "border": "none", background: "white" }} >
                            <div className="card-body">

                                {
                                    dataImageObject == "" ? <User size={200}></User> :
                                        <img src={dataImageObject} id='img_profile' style={{
                                            width: "200px",
                                            borderRadius: "50%",
                                            marginBottom: "10px"
                                        }} />
                                }


                                {obtenerEstado()}

                                {
                                    !dataStatic ?
                                        <h5 className="card-title">N/A</h5>

                                        :
                                        <h5 className="card-title">{dataStatic.nombre + " " + (dataStatic.apellidos == null ? "" : dataStatic.apellidos)}</h5>
                                }

                                {
                                    !dataStatic ?
                                        <h5 className="card-title">N/A</h5>

                                        :
                                        <p className="text-muted">{dataStatic.email}</p>
                                }

                                <button className="btn btn-primary d-block w-100" onClick={() => setShowModal(true)}>Cambiar perfil</button>
                                <UserImageModal
                                    show={showModal}
                                    handleClose={() => setShowModal(false)}
                                    onImageUpdate={handleImageUpdate}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
