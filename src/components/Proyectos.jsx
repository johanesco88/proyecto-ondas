// src/components/Proyectos.jsx
import React, { useState, useEffect } from "react";
import { crearProyecto, obtenerProyectos, actualizarProyecto, eliminarProyecto } from "../services/proyectoService";

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
  });

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
      setNuevoProyecto({ titulo: "", area: "", cronograma: "", presupuesto: 0, institucion: "", docenteId: "", observaciones: "" });
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
    <div>
      <h2>Proyectos</h2>
      <div>
        <input
          type="text"
          placeholder="Título"
          value={nuevoProyecto.titulo}
          onChange={(e) => setNuevoProyecto({ ...nuevoProyecto, titulo: e.target.value })}
        />
        {/* Agrega otros campos aquí */}
        <button onClick={handleCrearProyecto}>Crear Proyecto</button>
      </div>

      <ul>
        {proyectos.map((proyecto) => (
          <li key={proyecto.id}>
            <h3>{proyecto.titulo}</h3>
            <button onClick={() => handleActualizarProyecto(proyecto.id)}>Actualizar</button>
            <button onClick={() => handleEliminarProyecto(proyecto.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Proyectos;
