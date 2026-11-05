import { jsPDF } from 'jspdf';
import QRCode from 'qrcode';

export const generarCertificado = async (obra) => {
  const doc = new jsPDF('p', 'mm', 'a4');
  const anchoPagina = doc.internal.pageSize.getWidth();

  // Generar QR
  const qrDataURL = await QRCode.toDataURL(obra.folio);

  // --- DISEÑO ---

  // Etiqueta superior izquierda
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(96, 36, 25); // Tu color vino (#602419)
  doc.text('REGISTRO DE AUTORÍA', 20, 25);

  // Título principal (Grande y elegante)
  doc.setTextColor(30, 30, 30); // Gris muy oscuro
  doc.setFont('times', 'bold'); // Usamos Times para darle un toque más de diploma
  doc.setFontSize(36);
  doc.text('Certificado de Registro de Autoría', 20, 50);

  // Nombre de la Obra
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(96, 36, 25);
  doc.text('NOMBRE DE LA OBRA', 20, 85);
  
  doc.setFont('times', 'normal');
  doc.setFontSize(24);
  doc.setTextColor(30, 30, 30);
  doc.text(obra.titulo, 20, 95);

  // Nombre del Autor
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(96, 36, 25);
  doc.text('NOMBRE DEL AUTOR', 20, 115);
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(18);
  doc.setTextColor(30, 30, 30);
  doc.text(obra.autor, 20, 125);

  // Línea divisoria
  doc.setDrawColor(200, 200, 200);
  doc.setLineWidth(0.5);
  doc.line(20, 160, anchoPagina - 20, 160);

  // Folio (Esquina inferior izquierda)
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(96, 36, 25);
  doc.text('FOLIO DE REGISTRO', 20, 180);
  
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(30, 30, 30);
  doc.text(obra.folio, 20, 188);

  // Código QR (Esquina inferior derecha)
  doc.addImage(qrDataURL, 'PNG', anchoPagina - 50, 175, 30, 30);

  // Leyenda obligatoria (Pie de página)
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text('Registrado por: Jorge Camacho', 20, 220);

  // Guardar
  doc.save(`certificado-${obra.folio}.pdf`);
};