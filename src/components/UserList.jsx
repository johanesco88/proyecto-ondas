// src/components/UserList.jsx
import { useEffect, useState } from "react";
import { createUser, getUsers, updateUser, deleteUser } from "../services/userService";
import UserForm from "./UserForm";
import '../App.css';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreate = async (user) => {
    try {
      await createUser(user);
      fetchUsers();
    } catch (error) {
      console.error("Error al crear usuario:", error);
    }
  };

  const handleUpdate = async (user) => {
    if (!editingUser?.id) {
      console.error("ID del usuario para editar no encontrado");
      return;
    }
    try {
      await updateUser(editingUser.id, user);
      setEditingUser(null);
      fetchUsers();
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      fetchUsers();
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
    }
  };

  const handleConfirmDelete = (id) => {
    if (window.confirm("¿Estás seguro que quieres eliminar este usuario?")) {
      handleDelete(id);
    }
  };

  return (
    <div>
      <div className="user-section">
        <h2 className="title-center">Usuarios</h2>
      </div>

      <UserForm
  key={editingUser ? editingUser.id : "new"}
  onSubmit={editingUser ? handleUpdate : handleCreate}
  initialData={editingUser || undefined}
  isEditing={!!editingUser}
/>

      <ul className="user-list">
        {users.map((user) => (
          <li key={user.id} className="user-item">
            <div className="user-info">
              <strong>{user.nombres} {user.apellidos}</strong><br />
              ID: {user.identificacion} | Correo: {user.correo}<br />
              Rol: {user.rol} {user.rol === 'estudiante' && `| Grado: ${user.grado}`}<br />
              Institución: {user.institucion}
            </div>
            <div className="user-buttons">
              <button className="edit-btn" onClick={() => setEditingUser(user)}>
                Editar
              </button>
              <button className="delete-btn" onClick={() => handleConfirmDelete(user.id)}>
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
