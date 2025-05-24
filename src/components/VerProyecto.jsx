import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  obtenerProyectos,
  obtenerUsuarios,
} from "../services/proyectoService";
import "./CSS/VerProyecto.css";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const VerProyecto = () => {
  const { id } = useParams();
  const [proyecto, setProyecto] = useState(null);


  useEffect(() => {
    const fetchProyecto = async () => {
      const todos = await obtenerProyectos();
      const encontrado = todos.find((p) => p.id === id);
      if (encontrado) setProyecto(encontrado);
    };
    const fetchUsuarios = async () => {
      const lista = await obtenerUsuarios();
      setUsuarios(lista);
    };
    fetchProyecto();
    fetchUsuarios();
  }, [id]);

  
    if (!proyecto) {
    return (
      <Box className="Cargando">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div className="proyecto-informe">
  <h2 className="proyecto-titulo">{proyecto.titulo}</h2>

  <div className="proyecto-detalles">
    <p className="detalle-item"><strong>Área:</strong> {proyecto.area}</p>
    <p className="detalle-item"><strong>Cronograma:</strong> {proyecto.cronograma}</p>
    <p className="detalle-item"><strong>Presupuesto:</strong> ${proyecto.presupuesto}</p>
    <p className="detalle-item"><strong>Institución:</strong> {proyecto.institucion}</p>
    <p className="detalle-item"><strong>Docente:</strong> {proyecto.docenteId}</p>

    <p className="detalle-item">
      <strong>Integrantes:</strong>
      <ul className="lista-integrantes">
        {proyecto.integrantes?.map((i, idx) => (
          <li className="item-integrante" key={idx}>{i.nombre}</li>
        ))}
      </ul>
    </p>

    <p className="detalle-item">
      <strong>Objetivos:</strong>
      <ul className="lista-objetivos">
        {proyecto.objetivos?.map((o, idx) => (
          <li className="item-objetivo" key={idx}>{o.descripcion}</li>
        ))}
      </ul>
    </p>

    <p className="detalle-item">
      <strong>Estado(s):</strong>
      <ul className="lista-estados">
        {proyecto.historialEstados?.map((estado, idx) => (
          <li className="item-estado" key={idx}>
            <strong>{estado.estado}</strong> - {new Date(estado.fecha).toLocaleDateString()}
            <br />
            <em>{estado.observaciones}</em>
          </li>
        ))}
      </ul>
    </p>
  </div>
</div>

  );
};

export default VerProyecto;
