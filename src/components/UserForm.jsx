// src/components/UserForm.jsx
import { useState, useEffect } from "react";
import './CSS/UserForm.css';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { auth, db } from '../services/firebase'; 
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, updateDoc } from 'firebase/firestore';


const UserForm = ({ onSubmit, initialData = {}, isEditing }) => {
  const [formData, setFormData] = useState({
    nombres: "",
    apellidos: "",
    identificacion: "",
    correo: "",
    contraseña: "",
    rol: "estudiante",
    institucion: "",
    grado: ""
  });

  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      setFormData({
        ...initialData,
        contraseña: "" // Limpia la contraseña al editar
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Limpia grado si se cambia a un rol distinto
    if (name === "rol" && value !== "estudiante") {
      setFormData(prev => ({ ...prev, rol: value, grado: "" }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);

    // Solo limpia si es creación
    if (!isEditing) {
      setFormData({
        nombres: "",
        apellidos: "",
        identificacion: "",
        correo: "",
        contraseña: "",
        rol: "estudiante",
        institucion: "",
        grado: ""
      });
    }
  };
  
  if (!formData) {
    return (
      <Box className="Cargando">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="user-form">
      <input name="nombres" placeholder="Nombres" value={formData.nombres} onChange={handleChange} required />
      <input name="apellidos" placeholder="Apellidos" value={formData.apellidos} onChange={handleChange} required />
      <input name="identificacion" placeholder="Identificación" value={formData.identificacion} onChange={handleChange} required />
      <input name="correo" placeholder="Correo" type="email" value={formData.correo} onChange={handleChange} required />
      <input name="contraseña" placeholder="Contraseña" type="password" value={formData.contraseña} onChange={handleChange} required />
      
      <select name="rol" value={formData.rol} onChange={handleChange} required>
        <option className="opciones" value="estudiante">Estudiante</option>
        <option className="opciones" value="docente">Docente</option>
        <option className="opciones" value="coordinador">Coordinador</option>
      </select>
      
      <input name="institucion" placeholder="Institución" value={formData.institucion} onChange={handleChange} required />
      
      {formData.rol === "estudiante" && (
        <input name="grado" placeholder="Grado" value={formData.grado} onChange={handleChange} required />
      )}
      
      <button type="submit">{isEditing ? "Actualizar" : "Crear"} Usuario</button>
    </form>
  );
};

export default UserForm;
