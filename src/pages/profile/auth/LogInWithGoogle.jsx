import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    linkWithPopup,
    signInWithPopup,
} from 'firebase/auth';
import React from 'react';
import { auth } from '../../../config/firebase-config';
function LoginWithGoogleBtn() {
    const googleProvider = new GoogleAuthProvider();

    const loginWithGoogle = () => {
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const user = result.user;
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <>
            <span>Zaloguj się z Google</span>
            <button className="login-with-google-btn" onClick={loginWithGoogle}></button>
        </>
    );
}
export default LoginWithGoogleBtn;
