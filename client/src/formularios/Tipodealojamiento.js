import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const TipoAlojamiento = () => {
  const [descripcion, setDescripcion] = useState('');
  const [tipos, setTipos] = useState([]);

  useEffect(() => {
    getAlojamientos();
  }, []);

  const enviar = async (evento) => {
    evento.preventDefault();
    if (!descripcion.trim()) {
      alert('Por favor ingresa una descripción');
      return;
    }
    const json = {
      Descripcion: descripcion,
    };

    try {
      const respuesta = await fetch(
        'http://localhost:3001/tiposAlojamiento/createTipoAlojamiento',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(json),
        }
      );
      if (respuesta.ok) {
        alert('Se creó correctamente el Tipo Alojamiento');
        setDescripcion('');
        getAlojamientos();
      } else {
        alert('ERROR!! No se creó el Tipo Alojamiento');
      }
    } catch (error) {
      console.error('Failed to create:', error);
    }
  };

  const getAlojamientos = () => {
    fetch('http://localhost:3001/tiposAlojamiento/getTiposAlojamiento')
      .then((res) => res.json())
      .then((res) => {
        if (Array.isArray(res)) {
          setTipos(res);
        } else {
          console.error('ERROR: Array esperada pero no obtenida', res);
        }
      })
      .catch((error) => console.error('Error recuperación de datos:', error));
  };

  const Borrar = async (id) => {
    try {
      const respuesta = await fetch(
        `http://localhost:3001/tiposAlojamiento/deleteTipoAlojamiento/${id}`,
        {
          method: 'DELETE',
        }
      );
      if (respuesta.ok) {
        alert('Se eliminó correctamente el Tipo Alojamiento');
        console.log('BORRADO EXITOSO:', respuesta);
        getAlojamientos();
      } else {
        console.error('ERROR al borrar:', respuesta);
        alert('ERROR!! No se eliminó el Tipo Alojamiento');
      }
    } catch (err) {
      console.error('Error al eliminar datos:', err);
      alert('ERROR!! No se eliminó el Tipo Alojamiento');
    }
  };

  const Editar = async (id) => {
    if (!descripcion.trim()) {
      alert('Por favor ingresa una descripción');
      return;
    }
    const json = {
      Descripcion: descripcion,
    };
    try {
      const respuesta = await fetch(
        `http://localhost:3001/tiposAlojamiento/putTipoAlojamiento/${id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(json),
        }
      );
      if (respuesta.ok) {
        alert('Se modificó el elemento');
        console.log('Corrección Exitosa:', respuesta);
        setDescripcion('');
        getAlojamientos();
      } else {
        console.error('ERROR al modificar:', respuesta);
        alert('ERROR!! No se modificó el Tipo Alojamiento');
      }
    } catch (err) {
      console.error('ERROR al modificar los datos:', err);
      alert('ERROR!! No se modificó el Tipo Alojamiento');
    }
  };

  return (
    <div className="p-4 container">
      <div className="formularioAlojamiento col p-3">
        <h1>Alta de Tipo Alojamiento</h1>
        <form onSubmit={enviar}>
          <div>
            <label className="p-3" htmlFor="descripcion">
              Descripción:
            </label>
            <input
              className="col-sm-5 col-form-label mt-3 rounded-4 form-control"
              name="descripcion"
              id="descripcion"
              value={descripcion}
              type="text"
              placeholder="Descripción Tipo Alojamiento"
              aria-label=".form-control-lg example"
              onChange={(evento) => setDescripcion(evento.target.value)}
            />
          </div>
          <button className="btn btn-success mt-3 col-sm-3" type="submit">
            Enviar
          </button>
        </form>
        <table className="table col">
          <thead>
            <tr>
              <th scope="col" className="table-primary">
                Tipo Alojamiento
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(tipos) ? (
              tipos.map((tipo) => (
                <tr key={tipo.idTipoAlojamiento}>
                  <td>{tipo.Descripcion}</td>
                  <div className="mb-2 bg-transparent d-flex align-items-center">
                    <button
                      onClick={() => Borrar(tipo.idTipoAlojamiento)}
                      className="btn btn-danger"
                    >
                      Eliminar
                    </button>
                    <button
                      onClick={() => Editar(tipo.idTipoAlojamiento)}
                      className="btn btn-warning"
                    >
                      Editar
                    </button>
                  </div>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3"></td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TipoAlojamiento;

