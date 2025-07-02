import React, { useEffect, useState } from 'react'
import { HeaderProfile } from '../../layout/componentes/HeaderProfile'
import { Card, Form } from 'react-bootstrap';
import { User } from 'lucide-react';
import { URLAPI } from '../../../url';
import axios from 'axios';
import states from "../../../states.json";
import statesMunicipio from "../../../states-municipio.json";
import { useNavigate, useParams } from 'react-router-dom';
import MapComponent from '../../layout/componentes/MapComponent';
import { obtenerCalle, obtenerciudadoPueblo, obtenerCodigoPostal, obtenerColonia, obtenerMunicipio, obtenerNumeroExterior, quitarAcentos } from '../../../helper/mapsFuncions';

export const EditarDireccion = () => {

    const [dataImageObject, setUataImageObject] = useState("")
    const [dataStatic, setDataStatic] = useState({})
    const [direccionEstatica, setdireccionEstatica] = useState({})
    const [municipios, setMunicipios] = useState([])
    const navegate = useNavigate();
    const { id } = useParams();
    const [positionDefault, setpositionDefault] = useState({}); // CDMX por defecto

    const [position, setPosition] = useState({}); 


    const [validated, setValidated] = useState(false);
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        pais: 'México',
        estado: 'Ciudad de México',
        ciudad: 'Ciudad de México',
        municipio: 'Benito Juarez',
        colonia: 'Ciudad de México',
        calle: '',
        entreCalle: '',
        yCalle: '',
        numeroExterno: '',
        numeroInterno: '',
        codigoPostal: '',
        referencias: '',
        
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleChangeState = (e) => {
        handleChange(e)
        const { value } = e.target;

        const municipio = statesMunicipio[value];

        setMunicipios(municipio);

    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");

        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
            setValidated(true);
            return
        }

        setValidated(true);
        
        // Add form submission logic here
        try {
          
            let token = localStorage.getItem("token")
            formData.latitude = position.lat ?  position.lat.toString() : "";
            formData.longitud = position.lng ? position.lng.toString(): "";
            console.log(formData);
            
            const { data } = await axios.put(`${URLAPI}/direccion/actualizar/${id}`, formData,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            

            navegate("/Direcciones-y-cuentas")
                 
            
        } catch (error) {
            // setError(error);}
            console.log(error);
            

            
        }
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
                setUataImageObject(imageUrl)
            } catch (error) {
                console.log("se cerró la sesion", error);
            }
        }


        const obtenerDireccion = async () => {

            try {
                let token = localStorage.getItem("token")
                const { data } = await axios.get(`${URLAPI}/direccion/getAll/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                let direccion = data[0];
                
                
                const municipio = statesMunicipio[direccion.estado];
                setMunicipios(municipio);
                setdireccionEstatica(direccion);

                setFormData({
                    calle: direccion.calle,
                    ciudad: direccion.ciudad,
                    codigoPostal: direccion.codigoPostal,
                    colonia: direccion.colonia,
                    entreCalle: direccion.entre_calle,
                    numeroExterno: direccion.numero_externo,
                    numeroInterno: direccion.numero_interno,
                    pais: direccion.pais,
                    referencias: direccion.referencias,
                    yCalle: direccion.y_calle,
                    estado: direccion.estado,
                    municipio: direccion.municipio
                })
                // obtener coordenadas

                let latitude = parseFloat(direccion.latitude);
                let longitud = parseFloat(direccion.longitud);

                
                
                if (!isNaN(latitude) && !isNaN(longitud)) {
                    
                    setpositionDefault({
                        lat: latitude,
                        lng: longitud
                    })
                } 

            } catch (error) {
                console.log("se cerró la sesion", error);
            }
        }


        obtenerUsuario();
        obtenerDireccion();
    }, [])


    useEffect(() => {
      console.log(positionDefault); 
    }, [positionDefault])
    
   
    

    // refactorizar este codigo
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

   

    function obtenerData(data, latitude){

        let address = data.address;

        // obtener los datos de los select

        let state = states.find( (value) => value.nombre == address.state);
        const municipio = statesMunicipio[state.clave];
        setMunicipios(municipio);
        

        let mun = quitarAcentos(obtenerMunicipio(address));
        
        
        setFormData(data => ({
            ...data,
            colonia: obtenerColonia(address, data.colonia),
            codigoPostal: obtenerCodigoPostal(address, data.codigoPostal),
            calle: obtenerCalle(address,  data.calle),
            ciudad: obtenerciudadoPueblo(address, data.ciudad),
            estado: state.clave,
            municipio: mun,
            numeroExterno: obtenerNumeroExterior(address, data.numeroExterno)

        }))
        
        setPosition(latitude)

        
    }

    function verificarCasoUso(){

        if (Object.entries(direccionEstatica).length > 0) {
            
            let latitude = parseFloat(direccionEstatica.latitude);
            let longitud = parseFloat(direccionEstatica.longitud);
    
            if (!isNaN(latitude) && !isNaN(longitud)) {
                
               return positionDefault.lat ?  <MapComponent changePosition={obtenerData} pos={positionDefault} />: null
            } else{
                return <MapComponent changePosition={obtenerData} pos={positionDefault} />
            }
        }




    }
    return (
        <div className="container my-4">
            <h2 className="mb-4">Usuario</h2>
            <HeaderProfile />

            <div className="row mt-4">

                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12 d-block d-md-none " style={{ "border": "none", background: "white" }}>
                            <h3 className='my-2'>Seleccionar dirección</h3>
                            {verificarCasoUso()}

                        </div>
                        <div className="col-md-8 p-4 " style={{ "border": "none", background: "white" }} >
                            <Form onSubmit={handleSubmit}  noValidate validated={validated} >
                                <h4 className="mb-4">Direcciones</h4>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">País*</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="pais"
                                            value={formData.pais}
                                            disabled
                                            onChange={handleChange}
                                            required
                                        />
                                       
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Estado*</label>
                                       

                                        <select as="select" name="estado" className="form-select form-control"
                                            value={formData.estado} onChange={handleChangeState} required>
                                            <option value="" selected >--------------seleccione--------</option>

                                            {states.map(e => (
                                                <option value={e.clave} key={e.clave}>{e.nombre}</option>

                                            ))}

                                        </select>

                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Municipio o Alcaldía*</label>
                                        <select as="select" name="municipio" className="form-select form-control"
                                            value={formData.municipio} onChange={handleChange} required>

                                            <option value="" selected disabled>--------------seleccione--------</option>

                                            {municipios.map((e, i) => (
                                                <option value={e} key={i + "municipio"}>{e}</option>

                                            ))}

                                        </select>
                                    </div>


                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Ciudad*</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="ciudad"
                                            value={formData.ciudad}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                </div>

                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Colonia*</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="colonia"
                                            value={formData.colonia}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <h5 className="mt-4 mb-3">Dirección y Calles</h5>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Calle*</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="calle"
                                            value={formData.calle}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Entre Calle*</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="entreCalle"
                                            value={formData.entreCalle}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Y Calle</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="yCalle"
                                            value={formData.yCalle}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Número Externo*</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="numeroExterno"
                                            value={formData.numeroExterno}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Número Interno</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="numeroInterno"
                                            value={formData.numeroInterno}
                                            onChange={handleChange}
                                            
                                        />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Código Postal*</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="codigoPostal"
                                            value={formData.codigoPostal}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Referencias</label>
                                    <textarea
                                        className="form-control"
                                        name="referencias"
                                        value={formData.referencias}
                                        onChange={handleChange}
                                        rows="3"
                                    ></textarea>
                                </div>

                                {error != "" ? 
                                <div className="text-danger">
                                    {error}

                                </div> : null }

                                <div className="d-grid">
                                    <button type="submit" className="btn btn-primary">Actualizar Información</button>
                                </div>
                            </Form>
                        </div>
                        <div className="col-md-4 mt-lg-0 mt-2  text-center d-none d-md-block" >
                            {/* Placeholder for user profile section */}
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


                                    <h2>O Selecciona tu ubicación</h2>
                                    {verificarCasoUso()}
                                   
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}
