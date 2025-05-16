import React, { useState } from "react";
import { registrarUsuario, iniciarSesion, iniciarSesionConGoogle } from "../services/authService";
import { useNavigate } from "react-router-dom";
import "../App.css"; // Importa el archivo de estilos

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [identificacion, setIdentificacion] = useState("");
  const [institucion, setInstitucion] = useState("");
  const [grado, setGrado] = useState(""); // Solo si el rol es estudiante
  const [rol, setRol] = useState("estudiante"); // Default
  const [isLogin, setIsLogin] = useState(true); // Si es login o registro
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        // Iniciar sesión
        await iniciarSesion(email, password);
        navigate("/home");
      } else {
        // Registrar usuario
        const userData = { nombres, apellidos, identificacion, correo: email, rol, institucion, grado };
        await registrarUsuario(email, password, userData);
        navigate("/home");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await iniciarSesionConGoogle();
      navigate("/home");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2>{isLogin ? "Iniciar Sesión" : "Registrar Usuario"}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input-field"
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input-field"
          />
          {!isLogin && (
            <>
              <input
                type="text"
                placeholder="Nombres"
                value={nombres}
                onChange={(e) => setNombres(e.target.value)}
                required
                className="input-field"
              />
              <input
                type="text"
                placeholder="Apellidos"
                value={apellidos}
                onChange={(e) => setApellidos(e.target.value)}
                required
                className="input-field"
              />
              <input
                type="text"
                placeholder="Identificación"
                value={identificacion}
                onChange={(e) => setIdentificacion(e.target.value)}
                required
                className="input-field"
              />
              <input
                type="text"
                placeholder="Institución"
                value={institucion}
                onChange={(e) => setInstitucion(e.target.value)}
                required
                className="input-field"
              />
              {rol === "estudiante" && (
                <input
                  type="text"
                  placeholder="Grado"
                  value={grado}
                  onChange={(e) => setGrado(e.target.value)}
                  required
                  className="input-field"
                />
              )}
            </>
          )}
          <button type="submit" className="btn btn-login">
            {isLogin ? "Iniciar Sesión" : "Registrar"}
          </button>
        </form>
        {error && <p className="error-message">{error}</p>}
        <div className="flex flex-col items-center mt-4">
          <button
            onClick={handleGoogleLogin}
            className="btn btn-google"
          >
            Iniciar sesión con Google
          </button>
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="switch-auth"
          >
            {isLogin ? "¿No tienes cuenta? Regístrate" : "¿Ya tienes cuenta? Inicia sesión"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
