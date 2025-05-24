import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { obtenerProyectos, actualizarProyecto, obtenerUsuarios } from "../services/proyectoService";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import "./CSS/Editar_CrearProyecto.css";
import SubirArchivo from "./subirArchivo";




const EditarProyecto = () => {
  const { id } = useParams();
  const [proyecto, setProyecto] = useState(null);
  const [nuevoIntegrante, setNuevoIntegrante] = useState("");
  const [nuevoObjetivo, setNuevoObjetivo] = useState("");
  const [nuevoEstado, setNuevoEstado] = useState({ estado: "", observaciones: "" });
  const [archivoUrl, setArchivoUrl] = useState("");
  const [nuevoAvance, setNuevoAvance] = useState({ objetivoId: "", descripcion: "", estudianteId: "" });
  const [usuarios, setUsuarios] = useState([]);


  useEffect(() => {
    const fetchProyecto = async () => {
      const todosLosProyectos = await obtenerProyectos();
      const proyectoEncontrado = todosLosProyectos.find((p) => p.id === id);
      if (proyectoEncontrado) {
        setProyecto(proyectoEncontrado);
      }
    };

    const fetchUsuarios = async () => {
      const listaUsuarios = await obtenerUsuarios();
      setUsuarios(listaUsuarios);
    };

    fetchProyecto();
    fetchUsuarios();
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
    const usuario = usuarios.find((u) => u.id === nuevoIntegrante);
    if (!usuario) return;
    const nuevos = [...(proyecto.integrantes || []), {
      idUsuario: usuario.id,
      nombres: usuario.nombres,
      apellidos: usuario.apellidos
    }];
    setProyecto({ ...proyecto, integrantes: nuevos });
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

  const agregarAvance = () => {
    if (!archivoUrl) {
      alert("Debes subir un archivo antes de agregar el avance.");
      return;
    }

    const nuevo = {
      id: Date.now().toString(),
      ...nuevoAvance,
      archivoUrl,
      fecha: new Date().toISOString(),
    };

    setProyecto({
      ...proyecto,
      avances: [...(proyecto.avances || []), nuevo],
    });

    // Resetear campos
    setNuevoAvance({ objetivoId: "", descripcion: "", estudianteId: "" });
    setArchivoUrl("");
  };

  const obtenerNombreEstudiante = (id) => {
    const usuario = usuarios.find((u) => u.id === id);
    return usuario ? usuario.nombre : "Desconocido";
  };

  const obtenerDescripcionObjetivo = (id) => {
    const objetivo = proyecto?.objetivos?.find((o) => o.id === id);
    return objetivo ? objetivo.descripcion : "Objetivo no encontrado";
  };


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
        <p><strong>Docente:</strong> {proyecto.docenteId}</p>

        <h3 className="Subtitulos">Integrantes</h3>
        <ul className="proyecto-input-lista">
          {proyecto.integrantes.map((i, idx) => (
            <li key={idx}>
              {i.nombres} {i.apellidos}
              <button className="BotonEliminar" type="button" onClick={() => eliminarIntegrante(i.idUsuario)}>✘</button>
            </li>
          ))}
        </ul>

        <select value={nuevoIntegrante} onChange={(e) => setNuevoIntegrante(e.target.value)}>
          <option value="">-- Selecciona estudiante --</option>
          {usuarios
            .filter((u) => u.rol === "estudiante")
            .map((u) => (
              <option key={u.id} value={u.id}>
                {u.nombres} {u.apellidos}
              </option>
            ))}
        </select>

        <button onClick={agregarIntegrante}>Agregar integrante</button>


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
        <h3 className="Subtitulos">Avances</h3>
        <ul className="proyecto-input-lista">
          {(proyecto.avances || []).map((a, idx) => (
            <li key={idx}>
              <div className="ContenedorContenidoListas">
                <strong>Objetivo:</strong> {obtenerDescripcionObjetivo(a.objetivoId)}<br />
                <strong>Descripción:</strong> {a.descripcion} <br />
                <strong>Estudiante:</strong> {obtenerNombreEstudiante(a.estudianteId)}<br />
                <a href={a.archivoUrl} target="_blank" rel="noopener noreferrer">Ver archivo</a> <br />
                <small>{new Date(a.fecha).toLocaleString()}</small>
              </div>
            </li>
          ))}
        </ul>

        <h4>Agregar nuevo avance</h4>
        <h3>Avances del Proyecto</h3>
        <ul>
          {(proyecto.avances || []).map((a, idx) => (
            <li key={idx}>
              <strong>Objetivo:</strong> {a.objetivoId} |
              <strong>Avance:</strong> {a.descripcion} |
              <strong>Por:</strong> {a.estudianteId} |
              <strong>Fecha:</strong> {a.fecha}
              {a.archivoUrl && (
                <span> | <a href={a.archivoUrl} target="_blank" rel="noopener noreferrer">Ver archivo</a></span>
              )}
            </li>
          ))}
        </ul>
        <select value={nuevoAvance.objetivoId} onChange={(e) => setNuevoAvance({ ...nuevoAvance, objetivoId: e.target.value })}>
          <option value="">-- Objetivo --</option>
          {(proyecto.objetivos || []).map((o) => (
            <option key={o.id} value={o.id}>{o.descripcion}</option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Descripción del avance"
          value={nuevoAvance.descripcion}
          onChange={(e) => setNuevoAvance({ ...nuevoAvance, descripcion: e.target.value })}
        />
        <select value={nuevoAvance.estudianteId} onChange={(e) => setNuevoAvance({ ...nuevoAvance, estudianteId: e.target.value })}>
          <option value="">-- Estudiante --</option>
          {(proyecto.integrantes || []).map((i) => (
            <option key={i.idUsuario} value={i.idUsuario}>{i.nombre}</option>
          ))}
        </select>


        <SubirArchivo onUpload={(url) => setArchivoUrl(url)} />
        <button onClick={agregarAvance}>Agregar avance</button>

        <button className="BotonesEditarCrear" onClick={handleActualizar}>Guardar Cambios</button>
        <button className="BotonesEditarCrear" onClick={() => window.history.back()}>Regresar</button>
      </div>
    </div>
  );
};

export default EditarProyecto;

