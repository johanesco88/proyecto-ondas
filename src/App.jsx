// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

import Login from './components/Login';
import { Home } from './components/Home';
import EditarProyecto from './components/EditarProyecto';
import VerProyecto from './components/VerProyecto';
import Proyectos from './components/Proyectos'
import CrearProyecto from './components/CrearProyecto';
import UserList from './components/UserList';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta raíz redirige a /login */}
        <Route path="/" element={<Navigate to="/home" replace />} />
        
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/Usuarios" element={<UserList />} />
        <Route path="/Proyectos" element={<Proyectos />} />
        <Route path="/CrearProyecto" element={<CrearProyecto />} />
        <Route path="/EditarProyecto/:titulo/:id" element={<EditarProyecto />} />
        <Route path="/VerProyecto/:titulo/:id" element={<VerProyecto />} />
        
        {/* Ruta para manejar errores 404 opcional */}
        <Route path="*" element={<h2 style={{ textAlign: "center" }}>404 - Página no encontrada</h2>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

