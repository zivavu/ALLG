import { createUserWithEmailAndPassword, GoogleAuthProvider } from 'firebase/auth';
import { useState } from 'react';
import { auth } from '../../../config/firebase-config';
import userLoginSchema from '../../../schemas/userLoginFormSchema';
import userRegisterSchema from '../../../schemas/userRegisterFormSchema';
import AuthForm from './AuthForm';
import './AuthSection.css';
import LogInWithGoogleBtn from './LogInWithGoogle';

function AuthSection() {
    const [user, setUser] = useState();

    const registerUser = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password).then(
                (userCredential) => {
                    setUser(userCredential.user);
                }
            );
        } catch (error) {
            console.log(error.message);
        }
    };

    const login = async () => {};

    const logout = async () => {};

    const submitUserRegistration = (e) => {
        e.preventDefault();
        registerUser();
    };

    const submitUserLogIn = (e) => {
        e.preventDefault();
        login();
    };

    const [visibleAuthContainer, setVisibleAuthContainer] = useState('login');
    return (
        <div id="auth-container">
            <div id="auth-option-chose-container">
                <button
                    className={
                        visibleAuthContainer === 'login'
                            ? `auth-option-button selected`
                            : `auth-option-button`
                    }
                    onClick={(e) => {
                        setVisibleAuthContainer('login');
                    }}>
                    Logowanie
                </button>
                <button
                    className={
                        visibleAuthContainer === 'register'
                            ? `auth-option-button selected`
                            : `auth-option-button`
                    }
                    onClick={() => {
                        setVisibleAuthContainer('register');
                    }}>
                    Rejestracja
                </button>
            </div>

            {visibleAuthContainer === 'login' ? (
                <div id="auth-login-container" className="auth-login-screen">
                    <AuthForm
                        type="login"
                        onSubmit={submitUserLogIn}
                        schema={userLoginSchema}
                    />
                    <LogInWithGoogleBtn setUser={setUser} />
                </div>
            ) : null}

            {visibleAuthContainer === 'register' ? (
                <div id="auth-register-container" className="auth-login-screen">
                    <AuthForm
                        type="register"
                        onSubmit={submitUserRegistration}
                        schema={userRegisterSchema}
                    />
                    <LogInWithGoogleBtn setUser={setUser} />
                </div>
            ) : null}
        </div>
    );
}
export default AuthSection;
