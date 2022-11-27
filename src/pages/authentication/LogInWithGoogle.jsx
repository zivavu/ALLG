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
            <button className="login-with-google-btn" onClick={loginWithGoogle}></button>
        </>
    );
}
export default LoginWithGoogleBtn;
