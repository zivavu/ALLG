import { useFormik } from 'formik';
import userDataSchema from '../../../schemas/userAuthFormSchema';

const AuthForm = ({ type }) => {
    return (
        <form className="auth-form">
            <input
                type="text"
                id="email-input"
                className="auth-input"
                name="login-email"
                placeholder="Podaj Email"
            />
            <input
                type="password"
                id="password-input"
                className="auth-input"
                name="login-password"
                placeholder="Podaj Hasło"
            />
            {type === 'register' ? (
                <input
                    type="password"
                    id="password-input"
                    className="auth-input"
                    name="confirm-password"
                    placeholder="Powtórz Hasło"
                />
            ) : null}
            <input
                type="submit"
                className="auth-submit"
                value={type === 'login' ? 'Zaloguj się' : 'Zarejestruj się'}
            />
        </form>
    );
};
export default AuthForm;
