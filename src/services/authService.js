import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, updateProfile, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "./firebase";
import { doc, setDoc, getDoc } from "firebase/firestore"; // Importa getDoc


export const registrarUsuario = async (email, password, userData) => {
  try {
    // Crea un usuario con correo y contraseña
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Actualiza el perfil del usuario con los datos (nombres, apellidos, etc.)
    await updateProfile(user, {
      displayName: `${userData.nombres} ${userData.apellidos}`,
    });

    // Guarda los datos adicionales en Firestore
    const userRef = doc(db, "usuarios", user.uid); // Guardamos los datos del usuario usando su UID
    await setDoc(userRef, {
      nombres: userData.nombres,
      apellidos: userData.apellidos,
      identificacion: userData.identificacion,
      correo: userData.correo,
      rol: userData.rol,
      institucion: userData.institucion,
      grado: userData.grado, // Solo si el rol es 'estudiante'
      creadoEn: new Date(),
    });

    return user;
  } catch (error) {
    console.error("Error al registrar usuario:", error.message);
    throw new Error(error.message);
  }
};



export const iniciarSesion = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    return user;
  } catch (error) {
    console.error("Error al iniciar sesión:", error.message);
    throw new Error(error.message);
  }
};


export const iniciarSesionConGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Verifica si el usuario ya tiene datos adicionales en Firestore
    const userRef = doc(db, "usuarios", user.uid);
    const userSnap = await getDoc(userRef); // Usa getDoc para obtener el documento

    if (!userSnap.exists()) {
      // Si no existen datos del usuario, puedes guardarlos en Firestore
      const userData = {
        nombres: user.displayName.split(' ')[0],
        apellidos: user.displayName.split(' ').slice(1).join(' '),
        correo: user.email,
        rol: "estudiante", // Asigna un rol por defecto
        creadoEn: new Date(),
      };
      await setDoc(userRef, userData);
    }
    return user;
  } catch (error) {
    console.error("Error al iniciar sesión con Google:", error);
    throw error;
  }
};
