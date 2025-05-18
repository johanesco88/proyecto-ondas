// src/components/UserList.jsx
import { useEffect, useState } from "react";
import { createUser, getUsers, updateUser, deleteUser } from "../services/userService";
import UserForm from "./UserForm";
import '../App.css';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  const fetchUsers = async () => {
    const data = await getUsers();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreate = async (user) => {
    await createUser(user);
    fetchUsers();
  };

  const handleUpdate = async (user) => {
    await updateUser(editingUser._id, user); // Asegúrate que usas el campo correcto, puede ser .id o ._id
    setEditingUser(null);
    fetchUsers();
  };

  const handleDelete = async (id) => {
    await deleteUser(id);
    fetchUsers();
  };

  return (
    <div>
       <div className="user-section">
    <h2 className="title-center">Usuarios</h2>
  </div>
      <UserForm
        onSubmit={editingUser ? handleUpdate : handleCreate}
        initialData={editingUser || undefined}
        isEditing={!!editingUser}
      />

<ul className="user-list">
  {users.map((user, index) => (
    <li key={user._id} className="user-item">
      <div className="user-info">
        <strong>{user.nombres} {user.apellidos}</strong><br />
        ID: {user.identificacion} | Correo: {user.correo}<br />
        Rol: {user.rol} {user.rol === 'estudiante' && `| Grado: ${user.grado}`}<br />
        Institución: {user.institucion}
      </div>
      <div className="user-buttons">
        <button
          className="edit-btn"
          onClick={() => setEditingUser(user)}
        >
          Editar
        </button>
        <button
          className="delete-btn"
          onClick={() => handleConfirmDelete(user._id)}
        >
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
