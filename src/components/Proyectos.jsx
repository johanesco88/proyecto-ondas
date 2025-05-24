// src/components/Proyectos.jsx
import React, { useState, useEffect } from "react";
import { crearProyecto, obtenerProyectos, actualizarProyecto, eliminarProyecto } from "../services/proyectoService";
import "./CSS/Proyectos.css";
import { useNavigate } from "react-router-dom";


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
    historialEstados: []
  });

  const navigate = useNavigate();

  // Obtener proyectos
  useEffect(() => {
    const fetchProyectos = async () => {
      const proyectosData = await obtenerProyectos();
      setProyectos(proyectosData);
    };

    fetchProyectos();
  }, []);

  // Crear proyecto
  const handleCrearProyecto = async () => {
    try {
      const id = await crearProyecto(nuevoProyecto);
      setProyectos([...proyectos, { ...nuevoProyecto, id }]);
      setNuevoProyecto({ titulo: "", area: "", cronograma: "", presupuesto: 0, institucion: "", docenteId: "", observaciones: "", integrantes: [], objetivos: [], avances: [], historialEstados: [] });
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

  return (

    <div className="proyectos-container">
      <h2 className="proyectos-titulo">Proyectos</h2>

      <ul className="proyecto-lista">
        {proyectos.map((proyecto) => (
          <li key={proyecto.id} className="proyecto-item">
            <h3 className="proyecto-item-titulo">{proyecto.titulo}</h3>
            <p className="proyecto-item-titulo">Área: {proyecto.area}</p>
            <p className="proyecto-item-titulo">Cronograma: {proyecto.cronograma}</p>
            <p className="proyecto-item-titulo">Presupuesto: {proyecto.presupuesto}</p>
            <p className="proyecto-item-titulo">Institución Encargada: {proyecto.institucion}</p>
            <p className="proyecto-item-titulo">Docente Encargado: {proyecto.docenteId}</p>
            <p className="proyecto-item-titulo">
              Integrantes:
              <ul>
                {proyecto.integrantes.map((i, idx) => (
                  <li key={idx}>{i.nombre}</li>
                ))}
              </ul>
            </p>

            <p className="proyecto-item-titulo">
              Objetivos:
              <ul>
                {proyecto.objetivos.map((o, idx) => (
                  <li key={idx}>{o.descripcion}</li>
                ))}
              </ul>
            </p>
            <p className="proyecto-item-titulo">
              Estado(s):
              <ul>
                {proyecto.historialEstados.map((estado, idx) => (
                  <li key={idx}>
                    <strong>{estado.estado}</strong> - {new Date(estado.fecha).toLocaleDateString()}<br />
                    <em>{estado.observaciones}</em>
                  </li>
                ))}
              </ul>
            </p>
            <button
              className="proyecto-actualizar"
              onClick={() => navigate(`/EditarProyecto/${proyecto.titulo}/${proyecto.id}`)}
            >
              Actualizar
            </button>
            <button
              className="proyecto-eliminar"
              onClick={() => handleEliminarProyecto(proyecto.id)}
            >
              Eliminar
            </button>
            <button
              className="proyecto-Mostrar"
              onClick={() => navigate(`/VerProyecto/${proyecto.titulo}/${proyecto.id}`)}
            >
              Ver proyecto
            </button>
          </li>
        ))}
      </ul>
      <button className="proyecto-boton" onClick={() => navigate(`/CrearProyecto`)}>
        Crear Proyecto
      </button>
    </div>
  );
};

export default Proyectos;
