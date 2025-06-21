import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const AdminRoute = () => {
    const { user, isAdmin, loading } = useAuth();
  
    if (loading) return <div>Loading...</div>;
    if (!user) return <Navigate to="/login" replace />;
    return isAdmin ? <Outlet /> : <Navigate to="/" replace />;
  };

export default AdminRoute;