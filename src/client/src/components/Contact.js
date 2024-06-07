import React, { useState } from 'react';
import '../styles/Contacto.css';

function Contact() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    pais: '',
    celular: '',
    preguntas: ''
  });

  const [data, setData] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isEmptyField = Object.values(formData).some((value) => !value);
    if (isEmptyField) {
      alert('Por favor, complete todos los campos del formulario.');
      return;
    }

    setData([...data, formData]);

    setFormData({
      nombre: '',
      email: '',
      pais: '',
      celular: '',
      preguntas: ''
    });
  };

  return (
    <>
      <section className="section-contacto">
        <div className="texto-ayuda">
          <h1>Estamos para ayudarte</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <p>Nombre</p>
          <input className="cuadro-ayuda" type="text" name="nombre" value={formData.nombre} onChange={handleChange} />
          <p>Correo electrónico</p>
          <input className="cuadro-ayuda" type="email" name="email" value={formData.email} onChange={handleChange} />
          <p>País</p>
          <input className="cuadro-ayuda" type="text" name="pais" value={formData.pais} onChange={handleChange} />
          <p>Celular</p>
          <input className="cuadro-ayuda" type="text" name="celular" value={formData.celular} onChange={handleChange} />
          <br />
          <br />
          <p>Déjanos aquí tus preguntas</p>
          <textarea className="cuadro-ayuda" cols="70" rows="20" name="preguntas" value={formData.preguntas} onChange={handleChange}></textarea>
          <input type="submit" value="Enviar" className="boton-ayuda" />
        </form>
      </section>

      <section className="tabla-contacto">
        <div className="contenido-centrado">
          <div className="tabla-container">
            <h2>Datos Registrados del Contacto</h2>
            <table id="contactTable">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>País</th>
                  <th>Celular</th>
                  <th>Preguntas</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index}>
                    <td>{item.nombre}</td>
                    <td>{item.email}</td>
                    <td>{item.pais}</td>
                    <td>{item.celular}</td>
                    <td>{item.preguntas}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}

export default Contact;

