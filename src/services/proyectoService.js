// src/services/proyectoService.js
import { getFirestore, collection, getDocs, doc, deleteDoc, updateDoc, addDoc } from "firebase/firestore";
import { db } from "../services/firebase";

export const crearProyecto = async (proyecto) => {
  try {
    const docRef = await addDoc(collection(db, "proyectos"), proyecto);
    return docRef.id;  // Retorna el ID del proyecto creado
  } catch (error) {
    console.error("Error al crear el proyecto:", error);
    throw new Error(error.message);
  }
};


export const obtenerProyectos = async () => {
  try {
    const snapshot = await getDocs(collection(db, "proyectos"));
    const proyectos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return proyectos;
  } catch (error) {
    console.error("Error al obtener proyectos:", error);
    throw new Error(error.message);
  }
};


export const actualizarProyecto = async (id, proyectoActualizado) => {
  try {
    const proyectoRef = doc(db, "proyectos", id);
    await updateDoc(proyectoRef, proyectoActualizado);
  } catch (error) {
    console.error("Error al actualizar el proyecto:", error);
    throw new Error(error.message);
  }
};

export const eliminarProyecto = async (id) => {
  try {
    const proyectoRef = doc(db, "proyectos", id);
    await deleteDoc(proyectoRef);
  } catch (error) {
    console.error("Error al eliminar el proyecto:", error);
    throw new Error(error.message);
  }
};




export const asignarIntegrante = async (idProyecto, nuevoIntegrante) => {
  try {
    const proyectoRef = doc(db, "proyectos", idProyecto);
    await updateDoc(proyectoRef, {
      integrantes: arrayUnion(nuevoIntegrante)  // { usuarioId, rol }
    });
  } catch (error) {
    console.error("Error al asignar integrante:", error);
    throw new Error(error.message);
  }
};






export const agregarAvance = async (idProyecto, indexObjetivo, nuevoAvance) => {
  try {
    const proyectoRef = doc(db, "proyectos", idProyecto);
    const proyectoSnap = await getDoc(proyectoRef);

    if (!proyectoSnap.exists()) throw new Error("Proyecto no encontrado");

    const proyectoData = proyectoSnap.data();
    const objetivos = proyectoData.objetivos || [];

    if (!objetivos[indexObjetivo]) throw new Error("Objetivo no existe");

    // Añadir el avance al objetivo correspondiente
    objetivos[indexObjetivo].avances = objetivos[indexObjetivo].avances || [];
    objetivos[indexObjetivo].avances.push(nuevoAvance);

    await updateDoc(proyectoRef, { objetivos });
  } catch (error) {
    console.error("Error al agregar avance:", error);
    throw new Error(error.message);
  }
};





export const cambiarEstadoProyecto = async (idProyecto, nuevoEstado, observacion) => {
  try {
    const proyectoRef = doc(db, "proyectos", idProyecto);
    const proyectoSnap = await getDoc(proyectoRef);

    if (!proyectoSnap.exists()) throw new Error("Proyecto no encontrado");

    const fechaActual = new Date().toISOString();
    const estadoActual = {
      estado: nuevoEstado,
      fecha: fechaActual,
      observacion
    };

    await updateDoc(proyectoRef, {
      estado_actual: nuevoEstado,
      historial_estados: arrayUnion(estadoActual)
    });
  } catch (error) {
    console.error("Error al cambiar estado del proyecto:", error);
    throw new Error(error.message);
  }
};




export const buscarProyectos = async (campo, valor) => {
  try {
    const proyectosRef = collection(db, "proyectos");
    const q = query(proyectosRef, where(campo, "==", valor));
    const snapshot = await getDocs(q);

    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error al buscar proyectos:", error);
    throw new Error(error.message);
  }
};





/**
 * Agrega un nuevo objetivo al arreglo de objetivos de un proyecto.
 * @param {string} idProyecto - ID del proyecto en Firestore
 * @param {Object} nuevoObjetivo - Objeto con la descripción del objetivo
 */
export const agregarObjetivo = async (idProyecto, nuevoObjetivo) => {
  try {
    const proyectoRef = doc(db, "proyectos", idProyecto);
    const proyectoSnap = await getDoc(proyectoRef);

    if (!proyectoSnap.exists()) throw new Error("Proyecto no encontrado");

    const proyectoData = proyectoSnap.data();
    const objetivos = proyectoData.objetivos || [];

    // Asegúrate de que el nuevo objetivo tenga un array de avances vacío
    const objetivoConAvances = {
      ...nuevoObjetivo,
      avances: [] // Inicializar vacío
    };

    objetivos.push(objetivoConAvances);

    await updateDoc(proyectoRef, { objetivos });
  } catch (error) {
    console.error("Error al agregar objetivo:", error);
    throw new Error(error.message);
  }
};



/**
 * Edita la descripción de un objetivo por su índice.
 * @param {string} idProyecto - ID del proyecto en Firestore
 * @param {number} indiceObjetivo - Índice del objetivo a editar
 * @param {string} nuevaDescripcion - Nueva descripción del objetivo
 */
export const editarObjetivo = async (idProyecto, indiceObjetivo, nuevaDescripcion) => {
  try {
    const proyectoRef = doc(db, "proyectos", idProyecto);
    const proyectoSnap = await getDoc(proyectoRef);

    if (!proyectoSnap.exists()) throw new Error("Proyecto no encontrado");

    const proyectoData = proyectoSnap.data();
    const objetivos = proyectoData.objetivos || [];

    if (indiceObjetivo < 0 || indiceObjetivo >= objetivos.length) {
      throw new Error("Índice de objetivo inválido");
    }

    objetivos[indiceObjetivo].descripcion = nuevaDescripcion;

    await updateDoc(proyectoRef, { objetivos });
  } catch (error) {
    console.error("Error al editar objetivo:", error);
    throw new Error(error.message);
  }
};



/**
 * Elimina un objetivo por su índice.
 * @param {string} idProyecto - ID del proyecto en Firestore
 * @param {number} indiceObjetivo - Índice del objetivo a eliminar
 */
export const eliminarObjetivo = async (idProyecto, indiceObjetivo) => {
  try {
    const proyectoRef = doc(db, "proyectos", idProyecto);
    const proyectoSnap = await getDoc(proyectoRef);

    if (!proyectoSnap.exists()) throw new Error("Proyecto no encontrado");

    const proyectoData = proyectoSnap.data();
    const objetivos = proyectoData.objetivos || [];

    if (indiceObjetivo < 0 || indiceObjetivo >= objetivos.length) {
      throw new Error("Índice de objetivo inválido");
    }

    objetivos.splice(indiceObjetivo, 1); // Elimina el objetivo

    await updateDoc(proyectoRef, { objetivos });
  } catch (error) {
    console.error("Error al eliminar objetivo:", error);
    throw new Error(error.message);
  }
};





/**
 * Agrega un avance a un objetivo específico de un proyecto.
 * @param {string} idProyecto - ID del proyecto
 * @param {number} indiceObjetivo - Índice del objetivo al que se agrega el avance
 * @param {Object} avance - Objeto con los datos del avance
 * @param {string} avance.estudianteId
 * @param {string} avance.descripcion
 * @param {Array<string>} avance.documentos - URLs o rutas de documentos
 * @param {Array<string>} avance.fotos - URLs o rutas de fotos
 */
export const agregarAvanceAObjetivo = async (
  idProyecto,
  indiceObjetivo,
  avance
) => {
  try {
    const proyectoRef = doc(db, "proyectos", idProyecto);
    const proyectoSnap = await getDoc(proyectoRef);

    if (!proyectoSnap.exists()) throw new Error("Proyecto no encontrado");

    const proyectoData = proyectoSnap.data();
    const objetivos = proyectoData.objetivos || [];

    if (indiceObjetivo < 0 || indiceObjetivo >= objetivos.length) {
      throw new Error("Índice de objetivo inválido");
    }

    const nuevoAvance = {
      estudianteId: avance.estudianteId,
      fecha: new Date().toISOString(), // o Timestamp.now() si prefieres Firebase Timestamp
      descripcion: avance.descripcion,
      documentos: avance.documentos || [],
      fotos: avance.fotos || [],
    };

    // Agrega el avance al array de avances del objetivo específico
    objetivos[indiceObjetivo].avances = objetivos[indiceObjetivo].avances || [];
    objetivos[indiceObjetivo].avances.push(nuevoAvance);

    // Guarda de nuevo el array actualizado
    await updateDoc(proyectoRef, { objetivos });

  } catch (error) {
    console.error("Error al agregar avance:", error);
    throw new Error(error.message);
  }
};



/**
 * Asigna uno o varios integrantes (estudiantes/docentes) a un proyecto.
 * @param {string} idProyecto - ID del proyecto
 * @param {Array} nuevosIntegrantes - Arreglo de objetos con { usuarioId, rol }
 */
export const asignarIntegrantesAProyecto = async (idProyecto, nuevosIntegrantes) => {
  try {
    const proyectoRef = doc(db, "proyectos", idProyecto);
    const proyectoSnap = await getDoc(proyectoRef);

    if (!proyectoSnap.exists()) throw new Error("Proyecto no encontrado");

    const proyectoData = proyectoSnap.data();
    const integrantesActuales = proyectoData.integrantes || [];

    // Evita duplicados: solo agrega si el usuarioId no está ya
    const idsActuales = integrantesActuales.map(int => int.usuarioId);
    const integrantesFiltrados = nuevosIntegrantes.filter(
      int => !idsActuales.includes(int.usuarioId)
    );

    const integrantesActualizados = [...integrantesActuales, ...integrantesFiltrados];

    await updateDoc(proyectoRef, {
      integrantes: integrantesActualizados,
    });

  } catch (error) {
    console.error("Error al asignar integrantes:", error);
    throw new Error(error.message);
  }
};