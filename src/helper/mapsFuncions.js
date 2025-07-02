 export function obtenerColonia(address, value){

    if (address.neighbourhood) {
        return address.neighbourhood;
    }
    if (address.village) {
        return address.village;
    }
    return value;
}

export function obtenerCodigoPostal(address, value){

    if (address.postcode) {
        return address.postcode;
    }
    return value;
}


export function obtenerCalle(address, value){

    if (address.road) {
        return address.road;
    }
    return value;
}

export function obtenerciudadoPueblo(address, value){

    if (address.city) {
        return address.city;
    }
    if (address.town) {
        return address.town;
    }

    if (address.borough) {
        return address.borough;
    }
    if (address.county) {
        return address.county;
    }
    return value;
}

export function obtenerMunicipio(address){
    

    if (address.borough) {
        return address.borough;
    }
    if (address.county) {
        return address.county;
    }
    if (address.city) {
        return address.city;
    }
    if (address.town) {
        return address.town;
    }
    return "";
}

export function obtenerNumeroExterior(address, value){

    if (address.house_number) {
        return address.house_number;
    }
    return value;
}

export function quitarAcentos(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}