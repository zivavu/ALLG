import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import React from 'react';
import { auth, db } from '../../config/firebase-config';
function LoginWithGoogleBtn({ setUser }) {
    const googleProvider = new GoogleAuthProvider();

    const loginWithGoogle = async () => {
        try {
            result = await signInWithPopup(auth, googleProvider);
            await setDoc(doc(db, 'users', result.user.uid), {
                watched: [],
                adverts: [],
            });
            setUser(result.user);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <button className="login-with-google-btn" onClick={loginWithGoogle}></button>
        </>
    );
}
export default LoginWithGoogleBtn;
