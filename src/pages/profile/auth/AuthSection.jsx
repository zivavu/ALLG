import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    linkWithPopup,
    signInWithPopup,
} from 'firebase/auth';
import { useState } from 'react';
import { auth } from '../../../config/firebase-config';
import AuthForm from './AuthForm';
import './AuthSection.css';

function AuthSection() {
    let user;
    const googleProvider = new GoogleAuthProvider();

    const registerUser = async () => {
        try {
            user = await createUserWithEmailAndPassword();
        } catch (error) {
            console.log(error.message);
        }
    };
    const login = async () => {};

    const logout = async () => {};

    const loginWithGoogle = () => {
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                user = result.user;
            })
            .catch((error) => {
                console.log(error);
            });
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
                    <AuthForm type="login" />
                    <button onClick={loginWithGoogle}>Zaloguj</button>
                </div>
            ) : null}

            {visibleAuthContainer === 'register' ? (
                <div id="auth-register-container" className="auth-login-screen">
                    <AuthForm type="register" />
                    <button onClick={loginWithGoogle}>Zaloguj</button>
                </div>
            ) : null}
        </div>
    );
}
export default AuthSection;
