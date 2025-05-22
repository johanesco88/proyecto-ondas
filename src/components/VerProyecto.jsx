import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  obtenerProyectos,
  actualizarProyecto,
  obtenerUsuarios,
} from "../services/proyectoService"; // asegúrate de tener estas funciones
import "./CSS/VerProyecto.css";

const VerProyecto = () => {
  const { id } = useParams();
  const [proyecto, setProyecto] = useState(null);
  const [usuarios, setUsuarios] = useState([]);
  const [nuevoIntegrante, setNuevoIntegrante] = useState("");
  const [nuevoObjetivo, setNuevoObjetivo] = useState("");
  const [nuevoAvance, setNuevoAvance] = useState({ objetivoId: "", descripcion: "", estudianteId: "" });
  const [nuevoEstado, setNuevoEstado] = useState({ estado: "", observaciones: "" });

  useEffect(() => {
    const fetchProyecto = async () => {
      const todos = await obtenerProyectos();
      const encontrado = todos.find((p) => p.id === id);
      if (encontrado) setProyecto(encontrado);
    };
    const fetchUsuarios = async () => {
      const lista = await obtenerUsuarios(); // deberás crear esta función
      setUsuarios(lista);
    };
    fetchProyecto();
    fetchUsuarios();
  }, [id]);

  const guardarCambios = async () => {
    try {
      await actualizarProyecto(id, proyecto);
      alert("Proyecto actualizado.");
    } catch (error) {
      console.error("Error al actualizar:", error);
    }
  };

  const agregarIntegrante = () => {
    const usuario = usuarios.find((u) => u.id === nuevoIntegrante);
    if (!usuario) return;
    const nuevos = [...(proyecto.integrantes || []), { idUsuario: usuario.id, nombre: usuario.nombre }];
    setProyecto({ ...proyecto, integrantes: nuevos });
    setNuevoIntegrante("");
  };

  const agregarObjetivo = () => {
    const nuevos = [...(proyecto.objetivos || []), { id: Date.now().toString(), descripcion: nuevoObjetivo }];
    setProyecto({ ...proyecto, objetivos: nuevos });
    setNuevoObjetivo("");
  };

  const agregarAvance = () => {
    const nuevos = [...(proyecto.avances || []), {
      id: Date.now().toString(),
      ...nuevoAvance,
      fecha: new Date().toISOString()
    }];
    setProyecto({ ...proyecto, avances: nuevos });
    setNuevoAvance({ objetivoId: "", descripcion: "", estudianteId: "" });
  };

  const agregarEstado = () => {
    const nuevos = [...(proyecto.historialEstados || []), {
      estado: nuevoEstado.estado,
      observaciones: nuevoEstado.observaciones,
      fecha: new Date().toISOString(),
    }];
    setProyecto({ ...proyecto, historialEstados: nuevos });
    setNuevoEstado({ estado: "", observaciones: "" });
  };

  if (!proyecto) return <p>Cargando...</p>;

  return (
    <div className="proyecto-informe">
      <h2>{proyecto.titulo}</h2>

      <div className="proyecto-detalles">
        <p><strong>Área:</strong> {proyecto.area}</p>
        <p><strong>Cronograma:</strong> {proyecto.cronograma}</p>
        <p><strong>Presupuesto:</strong> ${proyecto.presupuesto}</p>
        <p><strong>Institución:</strong> {proyecto.institucion}</p>
        <p><strong>Docente:</strong> {proyecto.docenteId}</p>
      </div>

      {/* INTEGRANTES */}
      <h3>Integrantes</h3>
      <ul>
        {(proyecto.integrantes || []).map((i, idx) => (
          <li key={idx}>{i.nombre}</li>
        ))}
      </ul>
      <select value={nuevoIntegrante} onChange={(e) => setNuevoIntegrante(e.target.value)}>
        <option value="">-- Selecciona estudiante --</option>
        {usuarios.map((u) => (
          <option key={u.id} value={u.id}>{u.nombre}</option>
        ))}
      </select>
      <button onClick={agregarIntegrante}>Agregar integrante</button>

      {/* OBJETIVOS */}
      <h3>Objetivos</h3>
      <ul>
        {(proyecto.objetivos || []).map((o, idx) => (
          <li key={idx}>{o.descripcion}</li>
        ))}
      </ul>
      <input
        type="text"
        placeholder="Nuevo objetivo"
        value={nuevoObjetivo}
        onChange={(e) => setNuevoObjetivo(e.target.value)}
      />
      <button onClick={agregarObjetivo}>Agregar objetivo</button>

      {/* AVANCES */}
      <h3>Avances del Proyecto</h3>
      <ul>
        {(proyecto.avances || []).map((a, idx) => (
          <li key={idx}>
            <strong>Objetivo:</strong> {a.objetivoId} | <strong>Avance:</strong> {a.descripcion} | <strong>Por:</strong> {a.estudianteId} | <strong>Fecha:</strong> {a.fecha}
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
      <button onClick={agregarAvance}>Agregar avance</button>

      {/* HISTORIAL DE ESTADOS */}
      <h3>Historial de Estados</h3>
      <ul>
        {(proyecto.historialEstados || []).map((e, idx) => (
          <li key={idx}>
            <strong>{e.estado}</strong> - {e.fecha} <br />
            <em>{e.observaciones}</em>
          </li>
        ))}
      </ul>
      <input
        type="text"
        placeholder="Nuevo estado"
        value={nuevoEstado.estado}
        onChange={(e) => setNuevoEstado({ ...nuevoEstado, estado: e.target.value })}
      />
      <input
        type="text"
        placeholder="Observaciones"
        value={nuevoEstado.observaciones}
        onChange={(e) => setNuevoEstado({ ...nuevoEstado, observaciones: e.target.value })}
      />
      <button onClick={agregarEstado}>Agregar estado</button>

      {/* GUARDAR */}
      <button onClick={guardarCambios}>Guardar todos los cambios</button>
      <button onClick={() => window.history.back()}>Regresar</button>
    </div>
  );
};

export default VerProyecto;
