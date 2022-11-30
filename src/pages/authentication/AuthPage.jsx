import {
    createUserWithEmailAndPassword,
    EmailAuthProvider,
    reauthenticateWithCredential,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { auth, db } from '../../config/firebase-config';
import userLoginSchema from '../../schemas/userLoginFormSchema';
import userRegisterSchema from '../../schemas/userRegisterFormSchema';
import AuthForm from './AuthForm';
import './AuthPage.css';
import LogInWithGoogleBtn from './LogInWithGoogle';
import { UserContext } from './UserContext';

function AuthPage({ type }) {
    const navigate = useNavigate();

    const [user, setUser] = useContext(UserContext);
    const [isLoading, setLoading] = useState(false);
    const [mainError, setMainError] = useState();

    const registerUser = async (email, password, displayName) => {
        try {
            setLoading(true);
            setMainError('');
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            setUser(userCredential.user);
            await setDoc(doc(db, 'users', userCredential.user.uid), {
                watched: [],
                adverts: [],
                displayName: displayName,
            });
            await updateProfile(auth.currentUser, {
                displayName: displayName,
            });
        } catch (error) {
            setMainError('Jest już konto z takim adresem email');
        } finally {
            setLoading(false);
        }
    };

    async function loginUser(email, password) {
        setLoading(true);
        setMainError('');
        try {
            return await signInWithEmailAndPassword(auth, email, password).then(
                (userCredential) => {
                    setUser(userCredential.user);
                }
            );
        } catch (error) {
            setMainError('Nie znaleźliśmy takiego użytkownika');
        }
        setLoading(false);
    }
    async function reauthUser(email, passowrd) {
        setLoading(true);
        setMainError('');
        const providedCredential = EmailAuthProvider.credential(email, passowrd);
        try {
            await reauthenticateWithCredential(user, providedCredential).then(() => {
                setUser({ ...user, recentylyLoggedIn: true });
                navigate('/my-profile');
            });
        } catch (error) {
            setMainError('Wprowadziłeś złe dane');
        }
        setLoading(false);
    }

    const submitUserRegistration = (e) => {
        registerUser(e.email, e.password, e.displayName);
    };

    const submitUserLogIn = (e) => {
        if (type === 'auth') loginUser(e.email, e.password);
        else reauthUser(e.email, e.password);
    };

    const [visibleAuthContainer, setVisibleAuthContainer] = useState('login');
    return (
        <div id="auth-page-container">
            <div id="auth-container">
                <div id="auth-option-chose-container">
                    {/* Change type(login/register) of auth  */}
                    <button
                        className={
                            visibleAuthContainer === 'login'
                                ? `auth-option-button selected`
                                : `auth-option-button`
                        }
                        onClick={(e) => {
                            setMainError('');
                            setVisibleAuthContainer('login');
                        }}>
                        {type === 'auth' ? 'Logowanie' : 'Potwierdź tożsamość'}
                    </button>

                    {/* If type of auth is reauth shows only options same as with login */}
                    {type === 'reAuth' ? null : (
                        <button
                            className={
                                visibleAuthContainer === 'register'
                                    ? `auth-option-button selected`
                                    : `auth-option-button`
                            }
                            onClick={() => {
                                setMainError('');
                                setVisibleAuthContainer('register');
                            }}>
                            Rejestracja
                        </button>
                    )}
                </div>

                {visibleAuthContainer === 'login' ? (
                    <div id="auth-login-container" className="auth-login-screen">
                        <AuthForm
                            type="login"
                            isDisabled={isLoading}
                            onSubmit={submitUserLogIn}
                            schema={userLoginSchema}
                            mainError={mainError}
                            setMainError={setMainError}
                        />
                        <LogInWithGoogleBtn setLoading={setLoading} />
                    </div>
                ) : null}

                {visibleAuthContainer === 'register' ? (
                    <div id="auth-register-container" className="auth-login-screen">
                        <AuthForm
                            type="register"
                            isDisabled={isLoading}
                            onSubmit={submitUserRegistration}
                            schema={userRegisterSchema}
                            mainError={mainError}
                            setMainError={setMainError}
                        />
                        <LogInWithGoogleBtn />
                    </div>
                ) : null}
            </div>
        </div>
    );
}
export default AuthPage;
