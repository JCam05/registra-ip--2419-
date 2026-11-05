import { useState } from 'react';
import { generarCertificado } from '../utils/generarCertificado';

export default function DetalleObra() {
  // Datos de prueba
  const [obra] = useState({
    folio: 'OBRA-2419-002',
    titulo: 'Atardecer en la Ciudad',
    autor: 'Jorge Camacho',
    fechaRegistro: new Date().toISOString()
  });

  const handleDescargar = () => {
    generarCertificado(obra);
  };

  return (
    <div style={{ padding: '2rem', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', maxWidth: '600px', margin: '0 auto' }}>
      <h2>Detalle de la Obra</h2>
      <p><strong>Título:</strong> {obra.titulo}</p>
      <p><strong>Folio:</strong> {obra.folio}</p>
      <p><strong>Autor:</strong> {obra.autor}</p>
      
      <button 
        onClick={handleDescargar}
        style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: '#602419', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
      >
        Descargar Certificado PDF
      </button>
    </div>
  );
}