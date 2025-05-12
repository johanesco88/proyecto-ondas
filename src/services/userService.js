// src/services/userService.js
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../services/firebase";

const usersCollection = collection(db, "usuarios");

// CREATE
export const createUser = async (user) => {
  const docRef = await addDoc(usersCollection, user);
  return docRef.id;
};

// READ
export const getUsers = async () => {
  const snapshot = await getDocs(usersCollection);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// UPDATE
export const updateUser = async (id, updatedUser) => {
  const userDoc = doc(db, "usuarios", id);
  await updateDoc(userDoc, updatedUser);
};

// DELETE
export const deleteUser = async (id) => {
  const userDoc = doc(db, "usuarios", id);
  await deleteDoc(userDoc);
};
