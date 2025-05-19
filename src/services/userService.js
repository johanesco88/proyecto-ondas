// src/services/userService.js
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../services/firebase";

const usersCollection = collection(db, "usuarios");

// CREATE
export const createUser = async (user) => {
  if (!user) throw new Error("No se proporcionó información del usuario");
  const docRef = await addDoc(usersCollection, user);
  return docRef.id;
};

// READ
export const getUsers = async () => {
  const snapshot = await getDocs(usersCollection);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  }));
};

// UPDATE
export const updateUser = async (id, updatedUser) => {
  if (!id || !updatedUser) {
    throw new Error("ID o datos inválidos para actualización");
  }
  const userDoc = doc(db, "usuarios", id);
  await updateDoc(userDoc, updatedUser);
};

// DELETE
export const deleteUser = async (id) => {
  if (!id) throw new Error("ID no proporcionado para eliminación");
  const userDoc = doc(db, "usuarios", id);
  await deleteDoc(userDoc);
};
