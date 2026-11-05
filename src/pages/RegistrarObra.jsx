import { useState } from 'react';
import axios from 'axios';
import './RegistrarObra.css';

export default function RegistrarObra() {
  // ESTADO ÚNICO : Guarda los datos de los 4 pasos
  const [datos, setDatos] = useState({
    archivo: null,
    titulo: '',
    categoria: '',
    descripcion: '',
    autor: 'Jorge Camacho'
  });

  const [pasoActual, setPasoActual] = useState(1);
  const [folioGenerado, setFolioGenerado] = useState('');
  const [cargando, setCargando] = useState(false);

  // Función para actualizar los datos
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'archivo') {
      setDatos({ ...datos, archivo: files[0] });
    } else {
      setDatos({ ...datos, [name]: value });
    }
  };

  // --- VALIDACIONES POR PASO ---
  const esPasoValido = () => {
    if (pasoActual === 1) return datos.archivo !== null;
    if (pasoActual === 2) return datos.titulo.trim().length >= 5 && datos.categoria !== '';
    return true; // Pasos 3 y 4 siempre son válidos
  };

  const siguientePaso = () => {
    if (esPasoValido()) setPasoActual(pasoActual + 1);
  };

  const pasoAnterior = () => {
    if (pasoActual > 1) setPasoActual(pasoActual - 1);
  };

  // --- ENVÍO AL BACKEND ---
  const confirmarRegistro = async () => {
    setCargando(true);
    try {
      // Generamos el folio últimos 4 dígitos (Boleta: 602419)
      const folio = `OBRA-2419-00${Math.floor(Math.random() * 9) + 1}`; 
      
      const formData = new FormData();
      formData.append('archivo', datos.archivo);
      formData.append('folio', folio);
      formData.append('titulo', datos.titulo);
      formData.append('categoria', datos.categoria);
      formData.append('descripcion', datos.descripcion);
      formData.append('autor', datos.autor);

      // Enviamos al backend (puerto 4000)
      await axios.post('http://localhost:4000/obras', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setFolioGenerado(folio); // Mostramos el folio
      setPasoActual(5); // Paso extra para la pantalla de éxito
    } catch (error) {
      console.error(error);
      alert('Error al registrar la obra. ¿Está encendido el servidor backend?');
    }
    setCargando(false);
  };

  // --- BARRA DE PROGRESO ---
  const renderProgreso = () => {
    const pasos = ['1. Archivo', '2. Metadatos', '3. Vista Previa', '4. Confirmar'];
    return (
      <div className="barra-progreso">
        {pasos.map((nombre, index) => (
          <div key={index} className={`circulo-paso ${pasoActual > index ? 'activo' : ''}`}>
            <span className="numero">{index + 1}</span>
            <span className="etiqueta">{nombre.split('. ')[1]}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="wizard-container">
      <h2>Registrar Nueva Obra</h2>
      
      {pasoActual <= 4 && renderProgreso()}

      {/* SUBIR ARCHIVO */}
      {pasoActual === 1 && (
        <div className="paso-contenido">
          <h3>Paso 1: Sube el archivo de tu obra</h3>
          <input type="file" name="archivo" onChange={handleChange} />
          {!datos.archivo && <p className="error">Debes seleccionar un archivo para continuar.</p>}
        </div>
      )}

      {/* METADATOS */}
      {pasoActual === 2 && (
        <div className="paso-contenido">
          <h3>Paso 2: Información de la obra</h3>
          <div className="campo">
            <label>Título (mínimo 5 letras):</label>
            <input type="text" name="titulo" value={datos.titulo} onChange={handleChange} />
          </div>
          <div className="campo">
            <label>Categoría:</label>
            <select name="categoria" value={datos.categoria} onChange={handleChange}>
              <option value="">Selecciona...</option>
              <option value="Fotografía">Fotografía</option>
              <option value="Pintura">Pintura</option>
              <option value="Escultura">Escultura</option>
              <option value="Literatura">Literatura</option>
            </select>
          </div>
          <div className="campo">
            <label>Descripción:</label>
            <textarea name="descripcion" value={datos.descripcion} onChange={handleChange} rows="3" />
          </div>
        </div>
      )}

      {/* VISTA PREVIA */}
      {pasoActual === 3 && (
        <div className="paso-contenido">
          <h3>Paso 3: Vista Previa</h3>
          <ul className="resumen">
            <li><strong>Archivo:</strong> {datos.archivo?.name}</li>
            <li><strong>Título:</strong> {datos.titulo}</li>
            <li><strong>Categoría:</strong> {datos.categoria}</li>
            <li><strong>Descripción:</strong> {datos.descripcion || 'Sin descripción'}</li>
          </ul>
        </div>
      )}

      {/* CONFIRMACIÓN */}
      {pasoActual === 4 && (
        <div className="paso-contenido">
          <h3>Paso 4: Confirmar Registro</h3>
          <p>¿Estás seguro de que deseas registrar esta obra?</p>
          <button className="btn-confirmar" onClick={confirmarRegistro} disabled={cargando}>
            {cargando ? 'Registrando...' : 'Sí, registrar obra'}
          </button>
        </div>
      )}

      {/* PANTALLA DE ÉXITO */}
      {pasoActual === 5 && (
        <div className="pantalla-exito">
          <h3>¡Obra registrada con éxito!</h3>
          <p>Tu folio de registro es:</p>
          <h1 className="folio">{folioGenerado}</h1>
        </div>
      )}

      {/* BOTONES ATRÁS Y SIGUIENTE */}
      {pasoActual <= 4 && (
        <div className="botones-navegacion">
          {pasoActual > 1 && (
            <button onClick={pasoAnterior} className="btn-atras">Atrás</button>
          )}
          {pasoActual < 4 && (
            <button onClick={siguientePaso} className="btn-siguiente" disabled={!esPasoValido()}>
              Siguiente
            </button>
          )}
        </div>
      )}
    </div>
  );
}