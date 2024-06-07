import React, { useState } from 'react';
import '../styles/Formularios.css';

const Tipodealojamiento = () => {
  const [formData, setFormData] = useState({
    tipoAlojamiento: '',
  });

  const [editIndex, setEditIndex] = useState(null);
  const [data, setData] = useState([]);
  const [idCounter, setIdCounter] = useState(1); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.tipoAlojamiento) {
      alert('Por favor, complete el campo del tipo de alojamiento.');
      return;
    }

    if (editIndex !== null) {
      const updatedData = data.map((item, index) => (index === editIndex ? { ...item, ...formData } : item));
      setData(updatedData);
      setEditIndex(null);
    } else {
      setData([...data, { ...formData, id: idCounter }]);
      setIdCounter(idCounter + 1); 
    }

    setFormData({
      tipoAlojamiento: '',
    });
  };

  const handleEdit = (index) => {
    setFormData(data[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedData = data.filter((_, i) => i !== index);
    setData(updatedData);
  };

  return (
    <>
      <section className="formulario">
        <h2>Registra tu Tipo de Alojamiento</h2>
        <div className="cuadro">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="label" htmlFor="tipoAlojamiento">Tipo de Alojamiento</label>
              <select
                className="casilla"
                id="tipoAlojamiento"
                name="tipoAlojamiento"
                value={formData.tipoAlojamiento}
                onChange={handleChange}
                required
              >
                <option value="">Seleccione un Tipo de Alojamiento</option>
                <option value="Casa">Casa</option>
                <option value="Departamento">Departamento</option>
                <option value="Habitacion">Habitación</option>
                <option value="Hotel">Hotel</option>
                <option value="Cabaña">Cabaña</option>
              </select>
            </div>
            <div className="boton-container">
              <button type="submit">{editIndex !== null ? 'Guardar cambios' : 'Registrar'}</button>
            </div>
          </form>
        </div>
      </section>

      <section className="tabla">
        <div className="contenido-centrado">
          <div className="tabla-container">
            <h2>Tipos de Alojamiento Registrados</h2>
            <table id="datosTabla">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Tipo de alojamiento</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.tipoAlojamiento}</td>
                    <td>
                      <button className="edit-btn" onClick={() => handleEdit(index)}>Editar</button>
                      <button className="delete-btn" onClick={() => handleDelete(index)}>Eliminar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
};

export default Tipodealojamiento;
