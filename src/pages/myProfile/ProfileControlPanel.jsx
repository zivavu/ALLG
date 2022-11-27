import { signOut, updateEmail } from 'firebase/auth';
import { useContext, useEffect, useState } from 'react';
import { auth } from '../../config/firebase-config';
import { UserContext } from '../authentication/UserContext';
import EmailChange from './EmailChange';
import ProfileInfo from './ProfileInfo';

const ProfileControlPanel = () => {
    const [user, setUser] = useContext(UserContext);

    const logoutUser = async () => {
        try {
            await signOut(auth).then(setUser({ uid: '', displayName: '' }));
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <section id="profile-section">
            <div id="profile-container">
                <ProfileInfo />
                <div id="account-manage-container">
                    <button
                        id="log-out-button"
                        className="account-manage-item"
                        onClick={logoutUser}>
                        Wyloguj się
                    </button>
                    <EmailChange />
                </div>
            </div>
        </section>
    );
};
export default ProfileControlPanel;
