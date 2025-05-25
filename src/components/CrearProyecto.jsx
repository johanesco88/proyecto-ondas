import React, { useState, useEffect } from "react";
import { crearProyecto, obtenerProyectos, actualizarProyecto, eliminarProyecto, obtenerUsuarios } from "../services/proyectoService";
import "./CSS/Editar_CrearProyecto.css";
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const CrearProyecto = () => {
  const [proyectos, setProyectos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);

  // Estado principal del proyecto
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

  // Estados para los campos adicionales
  const [nuevoIntegrante, setNuevoIntegrante] = useState("");
  const [nuevoObjetivo, setNuevoObjetivo] = useState("");
  const [nuevoAvance, setNuevoAvance] = useState({
    objetivoId: "",
    descripcion: "",
    estudianteId: ""
  });
  const [nuevoEstado, setNuevoEstado] = useState({
    estado: "",
    observaciones: ""
  });

  const navigate = useNavigate();

  // Obtener proyectos y usuarios
  useEffect(() => {
    const fetchData = async () => {
      try {
        const proyectosData = await obtenerProyectos();
        const usuariosData = await obtenerUsuarios();
        setProyectos(proyectosData);
        setUsuarios(usuariosData);
      } catch (error) {
        console.error("Error al cargar datos:", error);
      }
    };

    fetchData();
  }, []);

  // Funciones para agregar elementos

  //  const agregarIntegrante = () => {
  //   const usuario = usuarios.find((u) => u.id === nuevoIntegrante);
  //   if (!nuevoIntegrante.trim()) return;
  //   const nuevos = [...(nuevoProyecto.integrantes || []), {
  //     idUsuario: usuario.id,
  //     nombres: usuario.nombres,
  //     apellidos: usuario.apellidos
  //   }];
  //   setNuevoProyecto({
  //     ...nuevoProyecto,
  //     integrantes: [...nuevoProyecto.integrantes, nuevos],
  //   });
  //   setNuevoIntegrante("");
  // };

  const agregarIntegrante = () => {
    if (!nuevoIntegrante.trim()) return;
    const nuevo = {
      idUsuario: Date.now().toString(),
      nombre: nuevoIntegrante,
    };
    setNuevoProyecto({
      ...nuevoProyecto,
      integrantes: [...nuevoProyecto.integrantes, nuevo],
    });
    setNuevoIntegrante("");
  };


  const agregarObjetivo = () => {
    if (!nuevoObjetivo.trim()) return;

    const nuevosObjetivos = [...nuevoProyecto.objetivos, {
      id: Date.now().toString(),
      descripcion: nuevoObjetivo
    }];
    setNuevoProyecto({ ...nuevoProyecto, objetivos: nuevosObjetivos });
    setNuevoObjetivo("");
  };

  // const agregarAvance = () => {
  //   if (!nuevoAvance.objetivoId || !nuevoAvance.descripcion || !nuevoAvance.estudianteId) {
  //     alert("Por favor completa todos los campos del avance");
  //     return;
  //   }

  //   const nuevosAvances = [...nuevoProyecto.avances, {
  //     id: Date.now().toString(),
  //     objetivoId: nuevoAvance.objetivoId,
  //     descripcion: nuevoAvance.descripcion,
  //     estudianteId: nuevoAvance.estudianteId,
  //     fecha: new Date().toISOString()
  //   }];
  //   setNuevoProyecto({ ...nuevoProyecto, avances: nuevosAvances });
  //   setNuevoAvance({ objetivoId: "", descripcion: "", estudianteId: "" });
  // };

  const agregarEstado = () => {
    if (!nuevoEstado.estado.trim()) return;

    const nuevosEstados = [...nuevoProyecto.historialEstados, {
      estado: nuevoEstado.estado,
      observaciones: nuevoEstado.observaciones,
      fecha: new Date().toISOString(),
    }];
    setNuevoProyecto({ ...nuevoProyecto, historialEstados: nuevosEstados });
    setNuevoEstado({ estado: "", observaciones: "" });
  };

  // Crear proyecto
  const handleCrearProyecto = async () => {
    try {
      // Validaciones básicas
      if (!nuevoProyecto.titulo.trim() || !nuevoProyecto.area.trim()) {
        alert("Por favor completa al menos el título y el área del proyecto");
        return;
      }

      const id = await crearProyecto(nuevoProyecto);
      setProyectos([...proyectos, { ...nuevoProyecto, id }]);

      // Reiniciar formulario
      setNuevoProyecto({
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

      alert("Proyecto creado exitosamente!");
      navigate(-1); // Regresar a la página anterior
    } catch (error) {
      console.error("Error al crear proyecto:", error);
      alert("Error al crear el proyecto");
    }
  };

  // Eliminar elementos de las listas
  const eliminarIntegrante = (idUsuario) => {
    const nuevosIntegrantes = nuevoProyecto.integrantes.filter(i => i.idUsuario !== idUsuario);
    setNuevoProyecto({ ...nuevoProyecto, integrantes: nuevosIntegrantes });
  };

  const eliminarObjetivo = (id) => {
    const nuevosObjetivos = nuevoProyecto.objetivos.filter(o => o.id !== id);
    setNuevoProyecto({ ...nuevoProyecto, objetivos: nuevosObjetivos });
  };

  const eliminarEstado = (idx) => {
    setNuevoProyecto({
      ...nuevoProyecto,
      historialEstados: nuevoProyecto.historialEstados.filter((_, i) => i !== idx),
    });
  };

  if (!nuevoProyecto) {
    return (
      <Box className="Cargando">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div className="proyectos-container">
      <h2 className="proyectos-titulo">Crear Proyecto</h2>
      <div className="proyecto-formulario">
        <h3 className="Subtitulos">Información Básica</h3>
        <input
          className="proyecto-input-lista"
          type="text"
          placeholder="Título del Proyecto"
          value={nuevoProyecto.titulo}
          onChange={(e) =>
            setNuevoProyecto({ ...nuevoProyecto, titulo: e.target.value })
          }
        />
        <input
          className="proyecto-input-lista"
          type="text"
          placeholder="Área"
          value={nuevoProyecto.area}
          onChange={(e) =>
            setNuevoProyecto({ ...nuevoProyecto, area: e.target.value })
          }
        />
        <input
          className="proyecto-input-lista"
          type="text"
          placeholder="Cronograma"
          value={nuevoProyecto.cronograma}
          onChange={(e) =>
            setNuevoProyecto({ ...nuevoProyecto, cronograma: e.target.value })
          }
        />
        <input
          className="proyecto-input-lista"
          type="number"
          placeholder="Presupuesto"
          value={nuevoProyecto.presupuesto}
          onChange={(e) =>
            setNuevoProyecto({ ...nuevoProyecto, presupuesto: e.target.value })
          }
        />
        <input
          className="proyecto-input-lista"
          type="text"
          placeholder="Institución"
          value={nuevoProyecto.institucion}
          onChange={(e) =>
            setNuevoProyecto({ ...nuevoProyecto, institucion: e.target.value })
          }
        />
        <input
          className="proyecto-input-lista"
          type="text"
          placeholder="Docente Encargado"
          value={nuevoProyecto.docenteId}
          onChange={(e) =>
            setNuevoProyecto({ ...nuevoProyecto, docenteId: e.target.value })
          }
        />
        <textarea
          className="proyecto-input-lista"
          placeholder="Descripción del Proyecto"
          value={nuevoProyecto.observaciones}
          onChange={(e) =>
            setNuevoProyecto({ ...nuevoProyecto, observaciones: e.target.value })
          }
        />

        <h3 className="Subtitulos">Integrantes</h3>
        <ul className="proyecto-input-lista">
          {nuevoProyecto.integrantes.map((i, idx) => (
            <li key={idx}>
              {i.nombres}
              <button className="BotonEliminar" type="button" onClick={() => eliminarIntegrante(i.idUsuario)}>✘</button>
            </li>
          ))}
        </ul>

        <select className="proyecto-input-lista" value={nuevoIntegrante} onChange={(e) => setNuevoIntegrante(e.target.value)}>
          <option value="">-- Selecciona estudiante --</option>
          {usuarios
            .filter((u) => u.rol === "estudiante")
            .map((u) => (
              <option key={u.id} value={u.id}>
                {u.nombres} {u.apellidos}
              </option>
            ))}
        </select>

        <button className="BotonAgregar" onClick={agregarIntegrante}>Agregar integrante</button>

        {/* <h3 className="Subtitulos">Integrantes</h3>
        <ul className="proyecto-input-lista">
          {nuevoProyecto.integrantes.map((i, idx) => (
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
        <button className="BotonAgregar" type="button" onClick={agregarIntegrante}>Agregar integrante</button> */}


        <h3 className="Subtitulos">Objetivos</h3>
        <ul className="proyecto-input-lista">
          {nuevoProyecto.objetivos.map((o, idx) => (
            <li key={idx}>
              {o.descripcion}
              <button
                className="BotonEliminar"
                type="button"
                onClick={() => eliminarObjetivo(o.id)}
                style={{ marginLeft: '10px', fontSize: '12px' }}
              >
                ✘
              </button>
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

        <h3 className="Subtitulos">Estado</h3>
        <ul className="proyecto-input-lista">
          {nuevoProyecto.historialEstados.map((e, idx) => (
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
          placeholder="Estado del proyecto"
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

        <div style={{ marginTop: '20px' }}>
          <button className="BotonesEditarCrear" onClick={handleCrearProyecto} >
            Crear Proyecto
          </button>
          <button className="BotonesEditarCrear" onClick={() => window.history.back()}>
            Regresar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CrearProyecto;

