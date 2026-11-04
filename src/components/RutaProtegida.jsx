import { Navigate, Outlet } from 'react-router-dom';

export default function RutaProtegida() {
  // Buscamos si el usuario está guardado en el navegador
  const usuarioGuardado = localStorage.getItem('registraIpUsuario');

  // Si NO hay usuario, lo mandamos a registrarse
  if (!usuarioGuardado) {
    return <Navigate to="/registro" replace />;
  }

  // Si SÍ hay usuario, lo dejamos pasar a la página que quería ver
  return <Outlet />;
}