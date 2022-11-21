const AuthForm = ({ submitValue }) => {
    return (
        <form className="auth-form">
            <input
                className="auth-input"
                type="text"
                name="login-email"
                id="email-input"
                placeholder="Podaj Email"
            />
            <input
                className="auth-input"
                type="password"
                name="login-password"
                id="password-input"
                placeholder="Podaj Hasło"
            />
            <input type="submit" className="auth-submit" value={submitValue} />
        </form>
    );
};
export default AuthForm;
