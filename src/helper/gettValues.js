import { URLAPI } from "../url";

export function multimediaToImage(data) {

    let imagenes = JSON.parse(data);
    let saveImagenes = [];
    for (let i = 0; i < imagenes.length; i++) {
      const element = imagenes[i];
      const url = URLAPI + "/SubProduct/image/" + element;
      saveImagenes.push(url)
    }
    return saveImagenes;

  }


export function caracteristicaToCaractertisticaModal(data){
    let caracteristicas =[];

    
    for (let i = 0; i < data.length; i++) {
        let caracteristica = {};
        const element = data[i];

        // caracteristica.id_caractertistca = element.id;
        caracteristica.id_atributo = element.atributo.id;
        // caracteristica.id_valor = element.valor.id;
        caracteristica.propiedad = element.atributo.nombre;
        caracteristica.tipo = element.atributo.tipoPropiedad;
        caracteristica.valor = element.valor.valor;
        caracteristicas.push(caracteristica);
        
    }

    return caracteristicas;

}