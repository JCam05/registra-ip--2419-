import { Outlet } from 'react-router-dom';
import './Layout.css';

export default function Layout() {
  return (
    <div className="layout-container">
      <header className="header">
        <h1>REGISTRA-IP</h1>
      </header>
      <main className="main-content">
        <Outlet /> 
      </main>
    </div>
  );
}