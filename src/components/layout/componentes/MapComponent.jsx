import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const LocationMarker = ({ setPosition}) => {
    useMapEvents({
        click(e) {
            setPosition({ lat: e.latlng.lat, lng: e.latlng.lng });
        },
    });
    return null;
};


    

const MapComponent = ({changePosition, pos }) => {
    const [position, setPosition] = useState({ lat: pos.lat ? pos.lat: 19.7017964,
         lng: pos.lng  ? pos.lng : -98.9819444}); // CDMX por defecto
    const [address, setAddress] = useState("");

    // Función para obtener la dirección desde lat/lng
    useEffect(() => {
        if (position.lat && position.lng) {
            fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.lat}&lon=${position.lng}&accept-language=es`)
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    
                    if (data.display_name) {
                        setAddress(data.display_name);
                        changePosition(data, position) 
                        
                    }
                })
                .catch((error) => console.error("Error obteniendo dirección:", error));
        }
    }, [position]);

    
    
    
    

    return (
        <div>
            {/* <p><strong>Dirección:</strong> {address}</p> */}
            <MapContainer center={position} zoom={13} style={{ height: "400px", width: "100%" }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={position} />
                <LocationMarker setPosition={setPosition} />
            </MapContainer>
        </div>
    );
};

export default MapComponent;
