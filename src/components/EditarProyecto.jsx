import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { obtenerProyectos, actualizarProyecto } from "../services/proyectoService";
import CircularProgress, { circularProgressClasses } from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import "./EditarProyecto.css";


const VerProyecto = () => {
  const { id } = useParams();
  const [proyecto, setProyecto] = useState(null);

  useEffect(() => {
    const fetchProyecto = async () => {
      const todosLosProyectos = await obtenerProyectos();
      const proyectoEncontrado = todosLosProyectos.find((p) => p.id === id);
      if (proyectoEncontrado) {
        setProyecto(proyectoEncontrado);
      }
    };
    fetchProyecto();
  }, [id]);

  const handleChange = (e) => {
    setProyecto({ ...proyecto, [e.target.name]: e.target.value });
  };

  const handleActualizar = async () => {
    try {
      await actualizarProyecto(id, proyecto);
      alert("Proyecto actualizado exitosamente.");
    } catch (error) {
      console.error("Error al actualizar proyecto:", error);
    }
  };

  function CircularIndeterminate() {
  return (
    <Box className="Cargando">
      <CircularProgress />
    </Box>
  );
}

  if (!proyecto) return CircularIndeterminate();

  return (
    <div className="proyectos-container">
      <h2 className="proyectos-titulo">Editar Proyecto</h2>

      <div className="proyecto-formulario">
        <input
          className="proyecto-input"
          type="text"
          name="titulo"
          placeholder="Título del Proyecto"
          value={proyecto.titulo}
          onChange={handleChange}
        />
        <input
          className="proyecto-input"
          type="text"
          name="area"
          placeholder="Área"
          value={proyecto.area}
          onChange={handleChange}
        />
        <input
          className="proyecto-input"
          type="text"
          name="cronograma"
          placeholder="Cronograma"
          value={proyecto.cronograma}
          onChange={handleChange}
        />
        <input
          className="proyecto-input"
          type="number"
          name="presupuesto"
          placeholder="Presupuesto"
          value={proyecto.presupuesto}
          onChange={handleChange}
        />
        <input
          className="proyecto-input"
          type="text"
          name="institucion"
          placeholder="Institución"
          value={proyecto.institucion}
          onChange={handleChange}
        />
        <input
          className="proyecto-input"
          type="text"
          name="docenteId"
          placeholder="Docente Encargado"
          value={proyecto.docenteId}
          onChange={handleChange}
        />
        <input
          className="proyecto-input"
          type="text"
          name="estadoActual"
          placeholder="Estado Actual"
          value={proyecto.estadoActual}
          onChange={handleChange}
        />

        
        <button className="proyecto-boton" onClick={handleActualizar}>
          Guardar Cambios
        </button>
        <button className="proyecto-boton" onClick={() => window.history.back()}>
          Regresar
        </button>
      </div>
    </div>
  );
};

export default VerProyecto;
