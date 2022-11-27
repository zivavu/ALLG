import { GoogleAuthProvider, signInWithPopup, updateProfile } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import React, { useContext } from 'react';
import { auth, db } from '../../config/firebase-config';
import { UserContext } from './UserContext';

function LoginWithGoogleBtn({ setLoading }) {
    const [user, setUser] = useContext(UserContext);
    const googleProvider = new GoogleAuthProvider();
    const loginWithGoogle = async () => {
        setLoading(true);
        try {
            const result = await signInWithPopup(auth, googleProvider);
            setUser(result.user);
            const userDocRef = doc(db, 'users', result.user.uid);
            const userSnap = await getDoc(userDocRef);

            //handle new user
            if (!userSnap.exists())
                await Promise.all([
                    setDoc(userDocRef, {
                        watched: [],
                        adverts: [],
                        displayName: 'GoogleUser',
                    }),

                    updateProfile(auth.currentUser, {
                        displayName: 'GoogleUser',
                    }),
                ]);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <img
                className="login-with-google-btn"
                src="src/assets/btn_google_signin_light_normal_web@2x.png"
                alt="login with google"
                onClick={loginWithGoogle}></img>
        </>
    );
}
export default LoginWithGoogleBtn;
