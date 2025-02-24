export function validarValor(e, value, setInformacionGeneral) {

    let valor = e.target.value
    // inforacionGeneral[value] = valor

    if (isNaN(valor)) {
        return;
    }

    if (valor.split(".").length >=2) {
        let value = valor.split(".");
        valor = value[0]+"."+value[1];
        console.log(valor);
        
    }else if (valor.includes(".") && value != "cantidad" && value != "porcentaje_descuento") {
        let value = valor.split(".");

        if (value[1] == 0) {
            
            valor = valor + "00"
        }

    }
    // console.log(value, inforacionGeneral[value]);
    
    if (valor > 1 && valor < 99999999) {
        setInformacionGeneral(el=> ({...el, [value]: valor}))
    } else {
        setInformacionGeneral(el=> ({...el, [value]: 1}))

    }
}