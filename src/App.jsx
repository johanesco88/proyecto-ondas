// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

import Login from './components/Login';
import { Home } from './components/Home';
import EditarProyecto from './components/EditarProyecto';
import VerProyecto from './components/VerProyecto';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta raíz redirige a /login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/EditarProyecto/:titulo/:id" element={<EditarProyecto />} />
        <Route path="/VerProyecto/:titulo/:id" element={<VerProyecto />} />
        
        {/* Ruta para manejar errores 404 opcional */}
        <Route path="*" element={<h2 style={{ textAlign: "center" }}>404 - Página no encontrada</h2>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

