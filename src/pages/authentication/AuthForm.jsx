import { useFormik } from 'formik';
import FormValidationErrorMessage from '../../components/FormValidationErrorMessage';
const AuthForm = ({ type, onSubmit, schema, isDisabled, mainError }) => {
    const { values, errors, handleBlur, handleChange, handleSubmit, touched } = useFormik(
        {
            initialValues: {
                displayName: '',
                email: '',
                password: '',
                confirmPassword: '',
            },
            validationSchema: schema,
            onSubmit,
        }
    );

    return (
        <form className="auth-form" onSubmit={handleSubmit}>
            {type === 'register' ? (
                <>
                    {errors.displayName && touched.displayName ? (
                        <FormValidationErrorMessage error={errors.displayName} />
                    ) : null}
                    <input
                        type="text"
                        id="display-name-input"
                        className="auth-input"
                        name="displayName"
                        value={values.displayName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        autoComplete="off"
                        autoCorrect="off"
                        placeholder="Podaj Imię"
                    />
                </>
            ) : null}
            {errors.email && touched.email ? (
                <FormValidationErrorMessage error={errors.email} />
            ) : null}
            <input
                type="text"
                id="email-input"
                className="auth-input"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="off"
                autoCorrect="off"
                placeholder="Podaj Email"
            />

            {errors.password && touched.password ? (
                <FormValidationErrorMessage error={errors.password} />
            ) : null}
            <input
                type="password"
                id="password-input"
                className="auth-input"
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="off"
                autoCorrect="off"
                placeholder="Podaj Hasło"
            />

            {type === 'register' ? (
                <>
                    {errors.confirmPassword && touched.confirmPassword ? (
                        <FormValidationErrorMessage error={errors.confirmPassword} />
                    ) : null}
                    <input
                        type="password"
                        id="password-input"
                        className="auth-input"
                        name="confirmPassword"
                        value={values.confirmPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        autoComplete="off"
                        autoCorrect="off"
                        placeholder="Powtórz Hasło"
                    />
                </>
            ) : null}
            <input
                disabled={isDisabled}
                type="submit"
                className="auth-submit"
                value={type === 'login' ? 'Zaloguj się' : 'Zarejestruj się'}
            />
            {mainError ? (
                <FormValidationErrorMessage error={mainError} main={true} />
            ) : null}
        </form>
    );
};
export default AuthForm;
