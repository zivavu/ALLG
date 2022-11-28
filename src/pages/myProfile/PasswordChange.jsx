import { updatePassword } from 'firebase/auth';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../config/firebase-config';
import { UserContext } from '../authentication/UserContext';

function PasswordChange({ passwordWasChanged, setPasswordWasChanged }) {
    const navigate = useNavigate();

    const [user, setUser] = useContext(UserContext);
    const [userPasswordInput, setUserPasswordInput] = useState('');
    const [showChangePassword, setShowChangePassword] = useState(false);
    const [isPasswordValid, setIsPasswordValid] = useState(true);

    const updateUserPassword = () => {
        if (userPasswordInput)
            try {
                updatePassword(auth.currentUser, userPasswordInput).then(() => {
                    setShowChangePassword(false);
                    setPasswordWasChanged(true);
                });
            } catch (error) {
                console.log(error.message);
            }
    };
    useEffect(() => {
        if (user.recentylyLoggedIn) {
            setShowChangePassword(true);
        }
    }, [user]);

    return (
        <div id="password-change-container">
            {!showChangePassword ? (
                <button
                    className="account-manage-item"
                    disabled={passwordWasChanged}
                    onClick={() => {
                        if (!user.recentylyLoggedIn) {
                            navigate('/re-authenticate');
                        } else setShowChangePassword(true);
                    }}>
                    {passwordWasChanged ? 'Sukces!' : 'Zmień hasło'}
                </button>
            ) : (
                <>
                    <input
                        type="text"
                        id="password-change-input"
                        className="account-manage-item"
                        placeholder="Podaj nowe hasło"
                        value={userPasswordInput}
                        onInput={(e) => {
                            setUserPasswordInput(e.target.value);
                        }}
                    />
                    <button
                        className="account-manage-item data-change-confirm-btn"
                        id="password-change-confirm"
                        onClick={updateUserPassword}>
                        {isPasswordValid ? 'Zatwierdź hasło' : 'Błędne hasło'}
                    </button>
                </>
            )}
        </div>
    );
}

export default PasswordChange;
