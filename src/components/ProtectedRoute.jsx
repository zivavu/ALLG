import { Outlet } from 'react-router-dom';
import AuthPage from '../pages/authentication/AuthPage';

const ProtectedRoute = ({ isUserAuthed }) => {
    if (isUserAuthed) {
        return <Outlet />;
    } else {
        return <AuthPage type="auth" />;
    }
};
export default ProtectedRoute;
