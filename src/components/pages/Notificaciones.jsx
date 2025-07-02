import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Badge, Card, ListGroup, Button, Dropdown } from 'react-bootstrap';
import axios from 'axios';
import { URLAPI } from '../../url';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { countNotification } from '../../actions/notificationsAction';

const NotificacionesPage = () => {
    // Datos de ejemplo para las notificaciones
    const [notificaciones, setNotificaciones] = useState([]);

    const navegate = useNavigate();
    const dispatch = useDispatch();

    const { countNotifications } = useSelector(re => re.notificationsReducer);


    //   [
    //     {
    //       id: 1,
    //       titulo: 'Nueva actualización disponible',
    //       mensaje: 'La versión 2.0 de la aplicación está disponible para descargar.',
    //       tiempo: '5 minutos',
    //       leida: false,
    //       tipo: 'info'
    //     },

    //   ]

    async function obtenerNotificaciones() {
        try {
            const token = localStorage.getItem('token');
            // const autor =await clienteAxios.post("/autor", datos);
            const { data } = await axios.get(`${URLAPI}/notifications/getById`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(data);
            setNotificaciones(data);

        } catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {
        obtenerNotificaciones();
    }, [])

    useEffect(() => {
        obtenerNotificaciones();
    }, [countNotifications])


    // Estado para filtrar notificaciones
    const [filtro, setFiltro] = useState('todas');

    // Marcar notificación como leída
    const marcarComoLeida = async (id) => {
        await cambiarEstadoAlertaFn(id);

        setNotificaciones(
            notificaciones.map(notif =>
                notif.id === id ? { ...notif, leida: true } : notif
            )
        );
    };

    // Marcar todas como leídas
    const marcarTodasComoLeidas = async () => {
        await marcarTodasLeidaFn();
        setNotificaciones(
            notificaciones.map(notif => ({ ...notif, leida: true }))
        );
    };

    // Eliminar notificación
    const eliminarNotificacion = async (id) => {
        await eliminarNotificacionFn(id)
        setNotificaciones(
            notificaciones.filter(notif => notif.id !== id)
        );
    };

    // Filtrar notificaciones
    const notificacionesFiltradas = () => {
        switch (filtro) {
            case 'no-leidas':
                return notificaciones.filter(notif => !notif.leido);
            case 'leidas':
                return notificaciones.filter(notif => notif.leido);
            default:
                return notificaciones;
        }
    };

    // Obtener color de badge según tipo
    const getBadgeColor = (tipo) => {

        if (tipo == "Error") {
            return "danger"
        }

        if (tipo == "Correcto") {
            return "success"
        }
        return tipo;
    };

    // Contador de notificaciones no leídas
    const noLeidasCount = notificaciones.filter(notif => !notif.leido).length;

    const cambiarEstadoAlerta = async (id, isRead) => {

        try {

            if (isRead) {
                return;
            }
            await cambiarEstadoAlertaFn(id)
            navegate("/subproducts/getAll")


        } catch (error) {
            console.log(error);

        }
    }

    const cambiarEstadoAlertaFn = async (id) => {

        try {

            const token = localStorage.getItem('token');
            // const autor =await clienteAxios.post("/autor", datos);
            await axios.get(`${URLAPI}/notifications/updateLeido/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            dispatch(countNotification())
        } catch (error) {
            console.log(error);
        }
    }

    const eliminarNotificacionFn = async (id) => {

        try {

            const token = localStorage.getItem('token');
            // const autor =await clienteAxios.post("/autor", datos);
            await axios.get(`${URLAPI}/notifications/eliminarNotificacion/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            dispatch(countNotification())
        } catch (error) {
            console.log(error);
        }
    }

    const marcarTodasLeidaFn = async () => {

        try {

            const token = localStorage.getItem('token');
            // const autor =await clienteAxios.post("/autor", datos);
            await axios.get(`${URLAPI}/notifications/maracarTodasLeidas`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            dispatch(countNotification())
        } catch (error) {
            console.log(error);
        }
    }





    return (
        <div className="container py-4">
            <h2 className="mb-4">Notificaciones</h2>

            <Card>
                <Card.Header className="  d-flex justify-content-between align-items-center">
                    <div>
                        <h5 className="mb-0">Notificaciones de usuario</h5>
                        {noLeidasCount > 0 && (
                            <Badge bg="light" text="primary" pill>
                                {noLeidasCount} nueva{noLeidasCount !== 1 ? 's' : ''}
                            </Badge>
                        )}
                    </div>
                    <div>
                        <Dropdown className="d-inline me-2">
                            <Dropdown.Toggle variant="light" size="sm" id="dropdown-filter">
                                {filtro === 'todas' ? 'Todas' : filtro === 'no-leidas' ? 'No leídas' : 'Leídas'}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => setFiltro('todas')}>Todas</Dropdown.Item>
                                <Dropdown.Item onClick={() => setFiltro('no-leidas')}>No leídas</Dropdown.Item>
                                <Dropdown.Item onClick={() => setFiltro('leidas')}>Leídas</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <Button
                            variant="outline-dark"
                            size="sm"
                            onClick={marcarTodasComoLeidas}
                            disabled={noLeidasCount === 0}
                        >
                            Marcar todas como leídas
                        </Button>
                    </div>
                </Card.Header>

                <ListGroup variant="flush">
                    {notificacionesFiltradas().length > 0 ? (
                        notificacionesFiltradas().map(notif => (

                            // <Link to={notif.url_direccion}  key={notif.id} style={{
                            //     listStyle: "none",
                            //     textDecoration: "none",

                            // }} >
                            <ListGroup.Item
                                key={notif.id}



                                className={`d-flex justify-content-between align-items-start ${!notif.leida ? 'bg-light' : ''}`}
                            >
                                <div className="ms-2 me-auto" onClick={(e) => cambiarEstadoAlerta(notif.id, notif.leida)}>
                                    <div className="d-flex align-items-center mb-1">
                                        <Badge bg={getBadgeColor(notif.tipo)} className="me-2">
                                            {notif.tipo === 'Aviso' && 'Info'}
                                            {notif.tipo === 'Correcto' && 'Success'}
                                            {notif.tipo === 'Error' && 'Error'}
                                            {notif.tipo === 'Importante' && 'Warning'}
                                        </Badge>
                                        <div className="fw-bold">{notif.titulo}</div>
                                        {!notif.leido && <div className="ms-2 bg-primary rounded-circle" style={{ width: '8px', height: '8px' }}></div>}
                                    </div>
                                    <p className="mb-1">{notif.descripcion}</p>
                                    <small className="text-muted">Fecha: {notif.fechaPublicacion}</small>
                                </div>
                                <div className="d-flex flex-column align-items-end">
                                    {!notif.leido && (
                                        <Button
                                            variant="outline-secondary"
                                            size="sm"
                                            className="mb-2"
                                            onClick={() => marcarComoLeida(notif.id)}
                                        >
                                            Marcar como leída
                                        </Button>
                                    )}
                                    <Button
                                        variant="outline-danger"
                                        size="sm"
                                        onClick={() => eliminarNotificacion(notif.id)}
                                    >
                                        Eliminar
                                    </Button>
                                </div>
                            </ListGroup.Item>
                            // </Link>
                        ))
                    ) : (
                        <ListGroup.Item className="text-center py-4" style={{
                            height: "400px", display: "flex",
                            alignItems: "center", justifyContent: "center"
                        }}>
                            <p className="mb-0 text-muted">No hay notificaciones para mostrar</p>
                        </ListGroup.Item>
                    )}
                </ListGroup>
            </Card>
        </div>
    );
};

export default NotificacionesPage;