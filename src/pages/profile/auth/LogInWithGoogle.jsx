import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    linkWithPopup,
    signInWithPopup,
} from 'firebase/auth';
import React from 'react';
import { auth } from '../../../config/firebase-config';
function LoginWithGoogleBtn({ setUser }) {
    const googleProvider = new GoogleAuthProvider();

    const loginWithGoogle = () => {
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                setUser(result.user);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <>
            <button className="login-with-google-btn" onClick={loginWithGoogle}></button>
        </>
    );
}
export default LoginWithGoogleBtn;
