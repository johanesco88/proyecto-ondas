// src/components/Proyectos.jsx
import React, { useState, useEffect } from "react";
import { crearProyecto, obtenerProyectos, actualizarProyecto, eliminarProyecto } from "../services/proyectoService";
import "./Proyectos.css";
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
    estadoActual: "Formulación",
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
      setNuevoProyecto({ titulo: "", area: "", cronograma: "", presupuesto: 0, institucion: "", docenteId: "", observaciones: "" });
    } catch (error) {
      console.error("Error al crear proyecto:", error);
    }
  };

  // Actualizar proyecto
  const handleActualizar = async () => {
    try {
      await actualizarProyecto(id, proyecto);
      alert("Proyecto actualizado exitosamente.");
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
      <h2 className="proyectos-titulo">Crear Proyecto</h2>

      <div className="proyecto-formulario">
        <input
          className="proyecto-input"
          type="text"
          placeholder="Título del Proyecto"
          value={nuevoProyecto.titulo}
          onChange={(e) =>
            setNuevoProyecto({ ...nuevoProyecto, titulo: e.target.value })
          }
        />
        <input
          className="proyecto-input"
          type="text"
          placeholder="Área"
          value={nuevoProyecto.area}
          onChange={(e) =>
            setNuevoProyecto({ ...nuevoProyecto, area: e.target.value })
          }
        />
        <input
          className="proyecto-input"
          type="text"
          placeholder="Cronograma"
          value={nuevoProyecto.cronograma}
          onChange={(e) =>
            setNuevoProyecto({ ...nuevoProyecto, cronograma: e.target.value })
          }
        />
        <input
          className="proyecto-input"
          type="number"
          placeholder="Presupuesto"
          value={nuevoProyecto.presupuesto}
          onChange={(e) =>
            setNuevoProyecto({ ...nuevoProyecto, presupuesto: e.target.value })
          }
        />
        <input
          className="proyecto-input"
          type="text"
          placeholder="Institución"
          value={nuevoProyecto.institucion}
          onChange={(e) =>
            setNuevoProyecto({ ...nuevoProyecto, institucion: e.target.value })
          }
        />
        <input
          className="proyecto-input"
          type="text"
          placeholder="Docente Encargado"
          value={nuevoProyecto.docenteId}
          onChange={(e) =>
            setNuevoProyecto({ ...nuevoProyecto, docenteId: e.target.value })
          }
        />
        <input
          className="proyecto-input"
          type="text"
          placeholder="Estado Actual"
          value={nuevoProyecto.estadoActual}
          disabled // Puedes quitar esto si quieres que sea editable
          onChange={(e) =>
            setNuevoProyecto({ ...nuevoProyecto, estadoActual: e.target.value })
          }
        />


        <button className="proyecto-boton" onClick={handleCrearProyecto} >
          <button className="proyecto-boton" onClick={() => window.history.back()}>
            Crear Proyecto
          </button>
        </button>
      </div>

    </div>
  );
};

export default Proyectos;
