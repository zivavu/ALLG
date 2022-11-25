import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import React from 'react';
import { auth, db } from '../../config/firebase-config';
function LoginWithGoogleBtn({ setUser }) {
    const googleProvider = new GoogleAuthProvider();

    const loginWithGoogle = () => {
        signInWithPopup(auth, googleProvider)
            .then((result) => {
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
