// src/components/UserForm.jsx
import { useState } from "react";
import '../App.css';

const UserForm = ({ onSubmit, initialData = { nombre: "", correo: "" }, isEditing }) => {
  const [formData, setFormData] = useState({
    nombres: "",
    apellidos: "",
    identificacion: "",
    correo: "",
    contraseña: "",
    rol: "estudiante",
    institucion: "",
    grado: "",
    ...initialData
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
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
  };

  return (
    <form onSubmit={handleSubmit} className="user-form">
    <input name="nombres" placeholder="Nombres" value={formData.nombres} onChange={handleChange} required />
    <input name="apellidos" placeholder="Apellidos" value={formData.apellidos} onChange={handleChange} required />
    <input name="identificacion" placeholder="Identificación" value={formData.identificacion} onChange={handleChange} required />
    <input name="correo" placeholder="Correo" type="email" value={formData.correo} onChange={handleChange} required />
    <input name="contraseña" placeholder="Contraseña" type="password" value={formData.contraseña} onChange={handleChange} required />
    <select name="rol" value={formData.rol} onChange={handleChange} required>
      <option value="estudiante">Estudiante</option>
      <option value="docente">Docente</option>
      <option value="coordinador">Coordinador</option>
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
