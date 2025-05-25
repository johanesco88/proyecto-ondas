// src/components/Proyectos.jsx
import React, { useState, useEffect } from "react";
import { crearProyecto, obtenerProyectos, actualizarProyecto, eliminarProyecto, obtenerUsuarios } from "../services/proyectoService";
import "./CSS/Proyectos.css";
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useAuth } from '../hooks/useAuth';



const Proyectos = () => {
  const [proyectos, setProyectos] = useState([]);
  const [nuevoProyecto, setNuevoProyecto] = useState({
    titulo: "",
    area: "",
    cronograma: "",
    presupuesto: 0,
    institucion: "",
    docenteId: "",
    observaciones: "",
    integrantes: [],
    objetivos: [],
    avances: [],
    historialEstados: []
  });
  const [docentes, setDocentes] = useState([]);
  const { rol } = useAuth();



  const navigate = useNavigate();

  useEffect(() => {
    const fetchDatos = async () => {
      const proyectosData = await obtenerProyectos();
      const usuariosData = await obtenerUsuarios();
      const soloDocentes = usuariosData.filter(u => u.rol === "docente");

      setProyectos(proyectosData);
      setDocentes(soloDocentes);
    };

    fetchDatos();
  }, []);
  // Crear proyecto
  const handleCrearProyecto = async () => {
    try {
      const id = await crearProyecto(nuevoProyecto);
      setProyectos([...proyectos, { ...nuevoProyecto, id }]);
      setNuevoProyecto({ titulo: "", area: "", cronograma: "", presupuesto: 0, institucion: "", docenteId: "", observaciones: "", integrantes: [], objetivos: [], avances: [], historialEstados: [], estadoActual: "Formulacion" });
    } catch (error) {
      console.error("Error al crear proyecto:", error);
    }
  };

  // Actualizar proyecto
  const handleActualizarProyecto = async (id) => {
    const proyectoActualizado = { ...nuevoProyecto };  // Los datos actualizados aquí
    try {
      await actualizarProyecto(id, proyectoActualizado);
      setProyectos(proyectos.map(proyecto => proyecto.id === id ? { ...proyecto, ...proyectoActualizado } : proyecto));
    } catch (error) {
      console.error("Error al actualizar proyecto:", error);
    }
  };

  // Eliminar proyecto
  const handleEliminarProyecto = async (id) => {
    try {
      await eliminarProyecto(id);
      setProyectos(proyectos.filter(proyecto => proyecto.id !== id));
    } catch (error) {
      console.error("Error al eliminar proyecto:", error);
    }
  };

  const obtenerNombreDocente = (docenteId) => {
    const docente = docentes.find(d => d.id === docenteId);
    return docente ? `${docente.nombres} ${docente.apellidos}` : "Docente no encontrado";
  };




  if (!proyectos) {
    return (
      <Box className="Cargando">
        <CircularProgress />
      </Box>
    );
  }

  return (

    <div className="proyectos-container">
      <h2 className="proyectos-titulo">Proyectos</h2>

      <ul className="proyecto-lista">
        {proyectos.map((proyecto) => (
          <li key={proyecto.id} className="proyecto-item">
            <h3 className="proyecto-item-titulo">{proyecto.titulo}</h3>
            <p className="proyecto-item-titulo">Área: {proyecto.area}</p>
            <p className="proyecto-item-titulo">Institución Encargada: {proyecto.institucion}</p>
            <p className="proyecto-item-titulo">
              Docente Encargado: {obtenerNombreDocente(proyecto.docenteId)}
            </p>
            <p className="proyecto-item-titulo">Estado Actual: {proyecto.estadoActual}</p>
            <button
              className="proyecto-actualizar"
              onClick={() => navigate(`/EditarProyecto/${proyecto.titulo}/${proyecto.id}`)}
            >
              Actualizar
            </button>
            {rol != 'estudiante' && (
              <button
                className="proyecto-eliminar"
                onClick={() => handleEliminarProyecto(proyecto.id)}
              >
                Eliminar
              </button>
            )}


            <button
              className="proyecto-Mostrar"
              onClick={() => navigate(`/VerProyecto/${proyecto.titulo}/${proyecto.id}`)}
            >
              Ver proyecto
            </button>
          </li>
        ))}
      </ul>


      {rol != 'estudiante' && (<button className="proyecto-boton" onClick={() => navigate(`/CrearProyecto`)}>
        Crear Proyecto
      </button>)}


    </div>
  );
};

export default Proyectos;
