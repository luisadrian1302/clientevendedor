import { BookCheck, Delete, DeleteIcon, Plus, RemoveFormatting, X } from 'lucide-react';
import React, { useEffect, useState } from 'react'


export const ShowItems = ({ caracteristicas = [], setCaracteristica, onUpdate }) => {

    const [remove, setRemove] = useState(false);


    function removeItem(index) {

        let caracteristica = caracteristicas.filter((e, i) => i != index);


        setCaracteristica(caracteristica);

    }

    function showItemRemove(index) {

        return (
            <>
                <X className='text-danger ms-2 w-25 ' onClick={() => removeItem(index)} />

            </>
        )

    }

    function getDataUpdate(i){

        
        onUpdate(caracteristicas[i], i);

    }

    return (
        <>

            {caracteristicas.map((e, i) => (
                <div key={i}>
                    {e.tipo == "color" ? <>
                        <p className='mb-1 mt-2'>{e.propiedad}</p>
                        <div className="row m-0 p-0" style={{ alignItems: "center" }}>
                            <div className='showItems' style={{ backgroundColor: e.valor }} 
                            onClick={(e) => getDataUpdate(i)}>

                            </div>
                            {remove == true ? showItemRemove(i) : null}

                        </div>
                    </> : null}
                    {e.tipo == "boton" ?
                        <div className='' >
                            <p className='mb-1 '> {e.propiedad}</p>
                            <button className='btn btn-outline-dark ' type='button' 
                            onClick={(e) => getDataUpdate(i)}
                            >{e.valor}   </button>
                            {remove == true ? showItemRemove(i) : null}

                        </div> : null}


                </div>
            ))}

            {remove ? <>
                <div className="edit-group  mt-2"   >
                    <button className='btn text-success m-0 p-0' type='button'
                        onClick={() => setRemove(false)}
                    >
                        <BookCheck className='mx-2' />

                        Cerrar </button>
                </div>
            </> : null}

            {caracteristicas.length > 0 ? <>

                <div className="edit-group  mt-2"   >
                    <button className='btn text-danger m-0 p-0' type='button'
                        onClick={() => setRemove(true)}
                    >
                        <X className='mx-2' />

                        Eliminar caracteristica </button>
                </div>

            </> : null}

        </>
    )
}
