import { signOut } from 'firebase/auth';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../config/firebase-config';
import { UserContext } from '../authentication/UserContext';
import EmailChange from './EmailChange';
import PasswordChange from './PasswordChange';
import ProfileInfo from './ProfileInfo';

const ProfileControlPanel = () => {
    const navigate = useNavigate();

    const [user, setUser] = useContext(UserContext);
    const [emailWasChanged, setEmailWasChanged] = useState(false);
    const [passwordWasChanged, setPasswordWasChanged] = useState(false);

    //used only as visual representation of real current user email on email change
    const [currentEmail, setCurrentEmail] = useState('');

    const logoutUser = async () => {
        try {
            await signOut(auth).then(setUser({ uid: '', displayName: '' }));
        } catch (error) {
            navigate('/error/Wystąpił-problem-przy-wylogowywaniu');
        }
    };

    return (
        <section id="profile-section">
            <div id="profile-container">
                <ProfileInfo emailValue={emailWasChanged ? currentEmail : user.email} />
                <div id="account-manage-container">
                    <button id="log-out-button" className="account-manage-item" onClick={logoutUser}>
                        Wyloguj się
                    </button>
                    {user.providerData[0].providerId === 'password' ? (
                        <EmailChange
                            emailWasChanged={emailWasChanged}
                            setEmailWasChanged={setEmailWasChanged}
                            setCurrentEmail={setCurrentEmail}
                        />
                    ) : null}
                    {user.providerData[0].providerId === 'password' ? (
                        <PasswordChange
                            passwordWasChanged={passwordWasChanged}
                            setPasswordWasChanged={setPasswordWasChanged}
                        />
                    ) : null}
                </div>
            </div>
        </section>
    );
};
export default ProfileControlPanel;
