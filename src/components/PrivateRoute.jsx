import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function PrivateRoute({ children, allowedRoles }) {
  const { user, rol, loading } = useAuth();

   if (loading) {
      return (
        <Box className="Cargando">
          <CircularProgress />
        </Box>
      );
    }

  if (!user) return <Navigate to="/login" />;

  if (!allowedRoles.includes(rol)) {
    return <Navigate to="/Home" />;
  }

  return children;
}
