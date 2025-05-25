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
import Layout from './components/Layout';
import PrivateRoute from './components/PrivateRoute';
import { useAuth } from './hooks/useAuth';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<Layout />}>
          <Route path="Home" element={
            <PrivateRoute allowedRoles={['administrador', 'coordinador', 'docente', 'estudiante']}>
              <Home />
            </PrivateRoute>
          } />

          <Route path="Usuarios" element={
            <PrivateRoute allowedRoles={['administrador', 'coordinador']}>
              <UserList />
            </PrivateRoute>
          } />

          <Route path="Proyectos" element={
            <PrivateRoute allowedRoles={['administrador', 'coordinador', 'docente', 'estudiante']}>
              <Proyectos />
            </PrivateRoute>
          } />

          <Route path="/CrearProyecto" element={
            <PrivateRoute allowedRoles={['administrador', 'coordinador', 'docente']}>
              <CrearProyecto />
            </PrivateRoute>
          } />

          <Route path="/EditarProyecto/:titulo/:id" element={
            <PrivateRoute allowedRoles={['administrador', 'coordinador', 'docente','estudiante']}>
              <EditarProyecto />
            </PrivateRoute>
          } />

          <Route path="/VerProyecto/:titulo/:id" element={
            <PrivateRoute allowedRoles={['administrador', 'coordinador', 'docente', 'estudiante']}>
              <VerProyecto />
            </PrivateRoute>
          } />
        </Route>

        <Route path="*" element={<h2 style={{ textAlign: "center" }}>404 - Página no encontrada</h2>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

