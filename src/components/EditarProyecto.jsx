import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { obtenerProyectos, actualizarProyecto } from "../services/proyectoService";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import "./CSS/Editar_CrearProyecto.css";

const EditarProyecto = () => {
  const { id } = useParams();
  const [proyecto, setProyecto] = useState(null);
  const [nuevoIntegrante, setNuevoIntegrante] = useState("");
  const [nuevoObjetivo, setNuevoObjetivo] = useState("");
  const [nuevoEstado, setNuevoEstado] = useState({ estado: "", observaciones: "" });

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

  const eliminarIntegrante = (idUsuario) => {
    setProyecto({
      ...proyecto,
      integrantes: proyecto.integrantes.filter((i) => i.idUsuario !== idUsuario),
    });
  };

  const agregarIntegrante = () => {
    if (!nuevoIntegrante.trim()) return;
    const nuevo = {
      idUsuario: Date.now().toString(), // Reemplaza con ID real
      nombre: nuevoIntegrante,
    };
    setProyecto({
      ...proyecto,
      integrantes: [...proyecto.integrantes, nuevo],
    });
    setNuevoIntegrante("");
  };

  const eliminarObjetivo = (id) => {
    setProyecto({
      ...proyecto,
      objetivos: proyecto.objetivos.filter((o) => o.id !== id),
    });
  };

  const agregarObjetivo = () => {
    if (!nuevoObjetivo.trim()) return;
    const nuevo = {
      id: Date.now().toString(),
      descripcion: nuevoObjetivo,
    };
    setProyecto({
      ...proyecto,
      objetivos: [...proyecto.objetivos, nuevo],
    });
    setNuevoObjetivo("");
  };

  const eliminarEstado = (idx) => {
    setProyecto({
      ...proyecto,
      historialEstados: proyecto.historialEstados.filter((_, i) => i !== idx),
    });
  };

  const agregarEstado = () => {
    if (!nuevoEstado.estado.trim()) return;
    const nuevo = {
      ...nuevoEstado,
      fecha: new Date().toISOString(),
    };
    setProyecto({
      ...proyecto,
      historialEstados: [...proyecto.historialEstados, nuevo],
    });
    setNuevoEstado({ estado: "", observaciones: "" });
  };

  const handleActualizar = async () => {
    try {
      await actualizarProyecto(id, proyecto);
      alert("Proyecto actualizado exitosamente.");
    } catch (error) {
      console.error("Error al actualizar proyecto:", error);
    }
  };

  if (!proyecto) {
    return (
      <Box className="Cargando">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div className="proyectos-container">
      <h2 className="proyectos-titulo">Editar Proyecto</h2>
      <div className="proyecto-formulario">
        <h3 className="Subtitulos">Información Básica</h3>
        <input className="proyecto-input-lista" type="text" name="titulo" placeholder="Título" value={proyecto.titulo} onChange={handleChange} />
        <input className="proyecto-input-lista" type="text" name="area" placeholder="Área" value={proyecto.area} onChange={handleChange} />
        <input className="proyecto-input-lista" type="text" name="cronograma" placeholder="Cronograma" value={proyecto.cronograma} onChange={handleChange} />
        <input className="proyecto-input-lista" type="number" name="presupuesto" placeholder="Presupuesto" value={proyecto.presupuesto} onChange={handleChange} />
        <input className="proyecto-input-lista" type="text" name="institucion" placeholder="Institución" value={proyecto.institucion} onChange={handleChange} />
        <textarea className="proyecto-input-lista" name="observaciones" placeholder="Descripción" value={proyecto.observaciones} onChange={handleChange} />

        <h3 className="Subtitulos">Integrantes</h3>
        <ul className="proyecto-input-lista">
          {proyecto.integrantes.map((i, idx) => (
            <li key={idx}>
              {i.nombre}
              <button className="BotonEliminar" type="button" onClick={() => eliminarIntegrante(i.idUsuario)}>✘</button>
            </li>
          ))}
        </ul>
        
        <input
          className="proyecto-input-lista"
          type="text"
          placeholder="Nombre del nuevo integrante"
          value={nuevoIntegrante}
          onChange={(e) => setNuevoIntegrante(e.target.value)}
        />
        <button className="BotonAgregar" type="button" onClick={agregarIntegrante}>Agregar integrante</button>

        <h3 className="Subtitulos">Objetivos</h3>
        <ul className="proyecto-input-lista">
          {proyecto.objetivos.map((o, idx) => (
            <li key={idx}>
              {o.descripcion}
              <button className="BotonEliminar" type="button" onClick={() => eliminarObjetivo(o.id)}>✘</button>
            </li>
          ))}
        </ul>
        <input
          className="proyecto-input-lista"
          type="text"
          placeholder="Nuevo objetivo"
          value={nuevoObjetivo}
          onChange={(e) => setNuevoObjetivo(e.target.value)}
        />
        <button className="BotonAgregar" type="button" onClick={agregarObjetivo}>Agregar objetivo</button>

        <h3 className="Subtitulos">Historial de Estados</h3>
        <ul className="proyecto-input-lista">
          {proyecto.historialEstados.map((e, idx) => (
            <li key={idx}>
              <div className="ContenedorContenidoListas">
                <strong>{e.estado} </strong> - {new Date(e.fecha).toLocaleDateString()}
                <br />
                <em> {e.observaciones}</em>
              </div>
              <button className="BotonEliminar" type="button" onClick={() => eliminarEstado(idx)}>✘</button>
            </li>
          ))}
        </ul>
        <input
          className="proyecto-input-lista"
          type="text"
          placeholder="Nuevo estado"
          value={nuevoEstado.estado}
          onChange={(e) => setNuevoEstado({ ...nuevoEstado, estado: e.target.value })}
        />
        <textarea
          className="proyecto-input-lista"
          placeholder="Observaciones del estado"
          value={nuevoEstado.observaciones}
          onChange={(e) => setNuevoEstado({ ...nuevoEstado, observaciones: e.target.value })}
        />
        <button className="BotonAgregar" type="button" onClick={agregarEstado}>Agregar estado</button>

        <button className="BotonesEditarCrear" onClick={handleActualizar}>Guardar Cambios</button>
        <button className="BotonesEditarCrear" onClick={() => window.history.back()}>Regresar</button>
      </div>
    </div>
  );
};

export default EditarProyecto;

