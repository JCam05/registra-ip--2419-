import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Registro from './pages/Registro';
import Dashboard from './pages/Dashboard';
import RutaProtegida from './components/RutaProtegida';
import './App.css';
import RegistrarObra from './pages/RegistrarObra';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* El Layout envuelve a las páginas que queremos que tengan el encabezado */}
        <Route element={<Layout />}>
          
          {/* Ruta por defecto: redirige a /registro */}
          <Route path="/" element={<Navigate to="/registro" replace />} />
          
          {/* Ruta pública */}
          <Route path="/registro" element={<Registro />} />
          
          {/* Ruta protegida (solo entra si hay sesión) */}
          <Route element={<RutaProtegida />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/registrar-obra" element={<RegistrarObra />} />
          </Route>
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;