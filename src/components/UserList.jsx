// src/components/UserList.jsx
import { useEffect, useState } from "react";
import { createUser, getUsers, updateUser, deleteUser } from "../services/userService";
import UserForm from "./UserForm";

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
    await updateUser(editingUser.id, user);
    setEditingUser(null);
    fetchUsers();
  };

  const handleDelete = async (id) => {
    await deleteUser(id);
    fetchUsers();
  };

  return (
    <div>
      <h2>Usuarios</h2>
      <UserForm
        onSubmit={editingUser ? handleUpdate : handleCreate}
        initialData={editingUser || undefined}
        isEditing={!!editingUser}
      />
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.nombres} - {user.correo}
            {user.rol} - {user.rol}
            <button onClick={() => setEditingUser(user)}>Editar</button>
            <button onClick={() => handleDelete(user.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
