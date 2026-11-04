import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

export default function Dashboard() {
  const navigate = useNavigate();

  // Recuperamos los datos del usuario que guardamos en el Registro
  const usuarioString = localStorage.getItem('registraIpUsuario');
  const usuario = usuarioString ? JSON.parse(usuarioString) : null;

  // Función para cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem('registraIpUsuario'); // Borramos la sesión
    navigate('/registro'); // Lo mandamos de vuelta al registro
  };

  return (
    <div className="dashboard-container">
      <h2>¡Bienvenido, {usuario?.nombre || 'Creador'}!</h2>
      <p>Tu perfil de <strong>{usuario?.tipoCreador}</strong> ha sido registrado correctamente.</p>
      
      <button onClick={handleLogout} className="btn-cerrar-sesion">
        Cerrar Sesión
      </button>
    </div>
  );
}