// src/components/UserForm.jsx
import { useState } from "react";
import '../App.css';

const UserForm = ({ onSubmit, initialData = { nombre: "", correo: "" }, isEditing }) => {
  const [formData, setFormData] = useState(initialData);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ nombre: "", correo: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="nombre" placeholder="Nombre" value={formData.nombre} onChange={handleChange} required />
      <input name="correo" placeholder="Correo" value={formData.correo} onChange={handleChange} required />
      <input name="rol" placeholder="rol" value={formData.rol} onChange={handleChange} required />
      <button type="submit">{isEditing ? "Actualizar" : "Crear"} Usuario</button>
    </form>
  );
};

export default UserForm;
