import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function PrivateRoute({ children, allowedRoles }) {
  const { user, rol, loading } = useAuth();

  if (loading) return <div>Cargando...</div>;

  if (!user) return <Navigate to="/login" />;

  if (!allowedRoles.includes(rol)) {
    return <Navigate to="/Home" />;
  }

  return children;
}
