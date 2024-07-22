import React, { useState, useEffect } from 'react';


const FiltradoTipoAlojamiento = () => {

    const [tipos, setTipos] = useState([]);
    
    useEffect(() => {
        getAlojamientos();
    }, []);
    
    const getAlojamientos = () => {
        fetch('http://localhost:3001/tiposAlojamiento/getTipoAlojamiento')
            .then(res => res.json())
            .then(res => {
                if (Array.isArray(res)) {
                    setTipos(res);
                } else {
                    console.error('ERROR: Array esperada pero no obtenida', res);
                }
            })
            .catch(error => console.error('Error recuperacion de datos:', error));
    };
  return (
    <div>
        <table className='table col'>
                <thead>
                    <tr>
                        <th scope='col' className='table-info'>Tipo Alojamientos</th>
                    </tr>
                </thead>
                <tbody>
                    <select className='form-select' aria-label="Default select example">
                        <option selected>Elegir</option>
                        {Array.isArray(tipos) ? tipos.map(tipo => (
                        <option key={tipo.Descripcion}>{tipo.Descripcion}</option>)): <tr></tr>}
                    </select>
                </tbody>
        </table>
    </div>
  )
}

export default FiltradoTipoAlojamiento