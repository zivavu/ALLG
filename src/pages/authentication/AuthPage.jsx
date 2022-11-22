import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
} from 'firebase/auth';
import { useContext, useState } from 'react';
import { auth } from '../../config/firebase-config';
import userLoginSchema from '../../schemas/userLoginFormSchema';
import userRegisterSchema from '../../schemas/userRegisterFormSchema';
import AuthForm from './AuthForm';
import './AuthSection.css';
import LogInWithGoogleBtn from './LogInWithGoogle';
import { UserContext } from './UserContext';

function AuthSection() {
    const [user, setUser] = useContext(UserContext);
    const [isLoading, setLoading] = useState(false);

    const registerUser = async (email, password, displayName) => {
        try {
            setLoading(true);
            await createUserWithEmailAndPassword(auth, email, password).then(
                (userCredential) => {
                    setUser(userCredential.user);
                    updateProfile(auth.currentUser, {
                        displayName: displayName,
                    })
                        .then(() => {
                            console.log('name has been set');
                        })
                        .catch((error) => {
                            console.log('couldnt set the name');
                        });
                }
            );
        } catch (error) {
            console.log(error.message);
        }
        setLoading(false);
    };

    async function loginUser(email, password) {
        setLoading(true);
        try {
            return await signInWithEmailAndPassword(auth, email, password).then(
                (userCredential) => {
                    setUser(userCredential.user);
                }
            );
        } catch (error) {
            console.log(error.message);
        }
        setLoading(false);
    }

    const logoutUser = async () => {
        try {
            await signOut(auth).then(setUser({ uid: '', displayName: '' }));
        } catch (error) {
            console.log(error.message);
        }
    };

    const submitUserRegistration = (e) => {
        registerUser(e.email, e.password, e.displayName);
    };

    const submitUserLogIn = (e) => {
        loginUser(e.email, e.password);
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
                        isDisabled={isLoading}
                        onSubmit={submitUserLogIn}
                        schema={userLoginSchema}
                    />
                    <LogInWithGoogleBtn />
                </div>
            ) : null}

            {visibleAuthContainer === 'register' ? (
                <div id="auth-register-container" className="auth-login-screen">
                    <AuthForm
                        type="register"
                        isDisabled={isLoading}
                        onSubmit={submitUserRegistration}
                        schema={userRegisterSchema}
                    />
                    <LogInWithGoogleBtn />
                </div>
            ) : null}
            <button onClick={logoutUser}>Wyloguj</button>
        </div>
    );
}
export default AuthSection;
