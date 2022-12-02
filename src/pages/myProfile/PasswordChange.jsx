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
            } catch {
                navigate('/error/Nie udało się zmienić hasła');
            }
    };
    //lets user see the password change input box
    useEffect(() => {
        if (user.recentylyLoggedIn) {
            setShowChangePassword(true);
        }
    }, [user]);

    const validatePassword = () => {
        if (userPasswordInput.length > 8) {
            updateUserPassword();
        } else setIsPasswordValid(false);
    };

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
                        type="password"
                        id="password-change-input"
                        className="account-manage-item"
                        placeholder="Podaj nowe hasło"
                        value={userPasswordInput}
                        onInput={(e) => {
                            setUserPasswordInput(e.target.value);
                            setIsPasswordValid(true);
                        }}
                    />
                    <button
                        className="account-manage-item data-change-confirm-btn"
                        id="password-change-confirm"
                        onClick={validatePassword}>
                        {isPasswordValid ? 'Zatwierdź hasło' : 'Min 8 znaków'}
                    </button>
                </>
            )}
        </div>
    );
}

export default PasswordChange;
