import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import {
  obtenerProyectos,
  obtenerUsuarios,
} from "../services/proyectoService";
import "./CSS/VerProyecto.css";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import autoTable from 'jspdf-autotable'; // Asegúrate de instalar jspdf-autotable


const VerProyecto = () => {
  const { id } = useParams();
  const [proyecto, setProyecto] = useState(null);
  const [usuarios, setUsuarios] = useState([]);
  const componenteRef = useRef(); // Para seleccionar el div a exportar como PDF



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


  const generarPDF = () => {
    if (!proyecto) return;

    const pdf = new jsPDF();
    const margenX = 10;
    let posY = 10;

    // Título
    pdf.setFontSize(16);
    pdf.text(`Informe del Proyecto: ${proyecto.titulo}`, margenX, posY);
    posY += 10;

    // Datos generales
    pdf.setFontSize(12);
    pdf.text(`Área: ${proyecto.area}`, margenX, posY);
    posY += 7;
    pdf.text(`Institución: ${proyecto.institucion}`, margenX, posY);
    posY += 7;
    pdf.text(`Presupuesto: $${proyecto.presupuesto}`, margenX, posY);
    posY += 7;
    pdf.text(`Cronograma: ${proyecto.cronograma}`, margenX, posY);
    posY += 7;

    const docente = usuarios.find(u => u.id === proyecto.docenteId);
    pdf.text(`Docente: ${docente ? docente.nombres + ' ' + docente.apellidos : 'No asignado'}`, margenX, posY);
    posY += 10;

    // Integrantes
    const integrantes = proyecto.integrantes?.map(i => {
      const u = usuarios.find(u => u.id === i.idUsuario);
      return [u?.nombres + ' ' + u?.apellidos || 'Desconocido'];
    });

    if (integrantes?.length) {
      autoTable(pdf, {
        startY: posY,
        head: [['Integrantes']],
        body: integrantes,
      });
      posY = pdf.lastAutoTable.finalY + 10;
    }

    // Objetivos
    const objetivos = proyecto.objetivos?.map(o => [o.descripcion]);

    if (objetivos?.length) {
      autoTable(pdf, {
        startY: posY,
        head: [['Objetivos']],
        body: objetivos,
      });
      posY = pdf.lastAutoTable.finalY + 10;
    }

    // Avances
    const avances = proyecto.avances?.map(a => {
      const estudiante = usuarios.find(u => u.id === a.estudianteId);
      const objetivo = proyecto.objetivos.find(o => o.id === a.objetivoId);
      return [
        estudiante?.nombres + ' ' + estudiante?.apellidos || 'Desconocido',
        objetivo?.descripcion || 'No encontrado',
        a.descripcion,
        new Date(a.fecha).toLocaleString(),
      ];
    });

    if (avances?.length) {
      autoTable(pdf, {
        startY: posY,
        head: [['Estudiante', 'Objetivo', 'Descripción', 'Fecha']],
        body: avances,
        styles: { fontSize: 8 },
      });
      posY = pdf.lastAutoTable.finalY + 10;
    }

    // Estados
    const estados = proyecto.historialEstados?.map(e => [
      e.estado,
      new Date(e.fecha).toLocaleDateString(),
      e.observaciones,
    ]);

    if (estados?.length) {
      autoTable(pdf, {
        startY: posY,
        head: [['Estado', 'Fecha', 'Observaciones']],
        body: estados,
        styles: { fontSize: 9 },
      });
    }

    const fileName = `informe_proyecto_${proyecto.titulo}.pdf`;
    pdf.save(fileName);
  };



  if (!proyecto) {
    return (
      <Box className="Cargando">
        <CircularProgress />
      </Box>
    );
  }

  const obtenerNombreEstudiante = (id) => {
    const usuario = usuarios.find((u) => u.id === id);
    return usuario ? `${usuario.nombres} ${usuario.apellidos}` : "Desconocido";
  };

  const obtenerDescripcionObjetivo = (id) => {
    const objetivo = proyecto?.objetivos?.find((o) => o.id === id);
    return objetivo ? objetivo.descripcion : "Objetivo no encontrado";
  };

  const obtenerNombreDocente = (id) => {
    const docente = usuarios.find((u) => u.id === id);
    return docente ? `${docente.nombres} ${docente.apellidos}` : "Docente no asignado";
  };


  return (
    <div className="contenedor-proyecto-ver" ref={componenteRef}>
      <button className="boton-pdf" onClick={generarPDF}>📄 Exportar a PDF</button>
      <div className="proyecto-informe">
        <h2 className="proyecto-titulo">{proyecto.titulo}</h2>

        <div className="proyecto-detalles">
          <p className="detalle-item"><strong>Área:</strong> {proyecto.area}</p>
          <p className="detalle-item"><strong>Cronograma:</strong> {proyecto.cronograma}</p>
          <p className="detalle-item"><strong>Presupuesto:</strong> ${proyecto.presupuesto}</p>
          <p className="detalle-item"><strong>Institución:</strong> {proyecto.institucion}</p>
          <p className="detalle-item">
            <strong>Docente:</strong> {obtenerNombreDocente(proyecto.docenteId)}
          </p>

          <div className="detalle-item">
            <strong>Integrantes:</strong>
            <ul className="lista-integrantes">
              {proyecto.integrantes?.map((integrante, idx) => {
                const usuario = usuarios.find(u => u.id === integrante.idUsuario);
                return (
                  <li className="item-integrante" key={idx}>
                    {usuario ? `${usuario.nombres} ${usuario.apellidos}` : "Integrante no encontrado"}
                  </li>
                );
              })}
            </ul>

          </div>

          <div className="detalle-item">
            <strong>Objetivos:</strong>
            <ul className="lista-objetivos">
              {proyecto.objetivos?.map((o, idx) => (
                <li className="item-objetivo" key={idx}>{o.descripcion}</li>
              ))}
            </ul>
          </div>

          <div className="detalle-item">
            <strong>Avances del Proyecto:</strong>
            <ul className="lista-estados">
              {proyecto.avances?.map((a, idx) => (
                <li className="item-estado" key={idx}>
                  <strong>Por:</strong> {obtenerNombreEstudiante(a.estudianteId)}<br />
                  <strong>Objetivo:</strong> {obtenerDescripcionObjetivo(a.objetivoId)}<br />
                  <strong>Descripción:</strong> {a.descripcion}<br />
                  <strong>Fecha:</strong> {new Date(a.fecha).toLocaleString()}<br />
                  {a.archivoUrl && (
                    <span>⎙ <a href={a.archivoUrl} target="_blank" rel="noopener noreferrer">Ver archivo</a></span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="detalle-item">
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
          </div>
        </div>
      </div>
    </div>

  );
};


export default VerProyecto;
