import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { obtenerProyectos, actualizarProyecto } from "../services/proyectoService";
import "./VerProyecto.css";


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

  if (!proyecto) return <p>Cargando proyecto...</p>;

  return (
   <div className="proyecto-informe">
  <h2 className="proyecto-titulo">{proyecto.titulo}</h2>

  <div className="proyecto-detalles">
    <p><strong>Área:</strong> {proyecto.area}</p>
    <p><strong>Cronograma:</strong> {proyecto.cronograma}</p>
    <p><strong>Presupuesto:</strong> ${proyecto.presupuesto}</p>
    <p><strong>Institución:</strong> {proyecto.institucion}</p>
    <p><strong>Docente Encargado:</strong> {proyecto.docenteId}</p>
  </div>

  <div className="proyecto-acciones">
    <button className="proyecto-boton" onClick={() => window.history.back()}>
      Regresar
    </button>
  </div>
</div>
  );
};

export default VerProyecto;
