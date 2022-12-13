import { Outlet } from 'react-router-dom';
import AuthPage from '../pages/authentication/AuthPage';

const ProtectedRoute = ({ user }) => {
    if (!user || user.uid === '') {
        return <AuthPage type="auth" />;
    } else {
        return <Outlet />;
    }
};
export default ProtectedRoute;
