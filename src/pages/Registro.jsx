import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Registro.css'; // Lo crearemos enseguida

export default function Registro() {
  const navigate = useNavigate();
  
  // Estados para guardar lo que el usuario escribe
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    tipoCreador: 'Diseñador'
  });
  
  // Estados para los errores
  const [errores, setErrores] = useState({});

  // Función para actualizar los campos cuando el usuario escribe
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Función para validar y enviar
  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevosErrores = {};

    // Validación 1: Nombre no vacío
    if (!formData.nombre.trim()) {
      nuevosErrores.nombre = 'El nombre es obligatorio.';
    }

    // Validación 2: Correo con formato válido
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexCorreo.test(formData.correo)) {
      nuevosErrores.correo = 'Ingresa un correo electrónico válido.';
    }

    // Si hay errores, los mostramos y detenemos el envío
    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores);
      return;
    }

    // Si todo está bien, guardamos en localStorage y redirigimos
    localStorage.setItem('registraIpUsuario', JSON.stringify(formData));
    navigate('/dashboard');
  };

  return (
    <div className="registro-container">
      <h2>Registro de Creador</h2>
      
      {/* Contenedor de errores con aria-live para accesibilidad */}
      <div aria-live="polite" className="mensajes-error">
        {errores.nombre && <p className="error">{errores.nombre}</p>}
        {errores.correo && <p className="error">{errores.correo}</p>}
      </div>

      <form onSubmit={handleSubmit} className="formulario">
        
        <div className="campo">
          <label htmlFor="nombre">Nombre completo:</label>
          <input 
            type="text" 
            id="nombre" 
            name="nombre" 
            value={formData.nombre} 
            onChange={handleChange} 
          />
        </div>

        <div className="campo">
          <label htmlFor="correo">Correo electrónico:</label>
          <input 
            type="text" 
            id="correo" 
            name="correo" 
            value={formData.correo} 
            onChange={handleChange} 
          />
        </div>

        <div className="campo">
          <label htmlFor="tipoCreador">Tipo de creador:</label>
          <select 
            id="tipoCreador" 
            name="tipoCreador" 
            value={formData.tipoCreador} 
            onChange={handleChange}
          >
            <option value="Diseñador">Diseñador</option>
            <option value="Fotógrafo">Fotógrafo</option>
            <option value="Escritor">Escritor</option>
            <option value="Cineasta">Cineasta</option>
          </select>
        </div>

        <button type="submit" className="btn-primario">Registrarse</button>
      </form>
    </div>
  );
}