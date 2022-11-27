import { updateEmail } from 'firebase/auth';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../config/firebase-config';
import { UserContext } from '../authentication/UserContext';

function EmailChange() {
    const navigate = useNavigate();

    const [user, setUser] = useContext(UserContext);
    const [userEmailInput, setUserEmailInput] = useState('');
    const [showChangeEmail, setShowChangeEmail] = useState(false);
    const [isEmailValid, setIsEmailValid] = useState(true);

    const changeUserEmail = () => {
        if (userEmailInput)
            updateEmail(auth.currentUser, userEmailInput).catch((error) => {
                setShowChangeEmail(false);
            });
    };
    const validateEmail = () => {
        {
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmailInput)) {
                changeUserEmail();
            } else setIsEmailValid(false);
        }
    };
    return (
        <div id="email-change-container">
            {showChangeEmail ? (
                <>
                    <input
                        type="text"
                        id="email-change-input"
                        className="account-manage-item"
                        placeholder="Podaj nowy email"
                        value={userEmailInput}
                        onChange={(e) => {
                            setUserEmailInput(e.target.value);
                            setIsEmailValid(true);
                        }}
                    />
                    <button
                        className="account-manage-item"
                        id="email-change-confirm"
                        onClick={validateEmail}>
                        {isEmailValid ? 'Zatwierdź email' : 'Błędny email'}
                    </button>
                </>
            ) : (
                <button
                    className="account-manage-item"
                    onClick={(e) => {
                        if (!user.recentylyLoggedIn) {
                            navigate('/re-authenticate');
                        } else setShowChangeEmail(true);
                    }}>
                    Zmień e-mail
                </button>
            )}
        </div>
    );
}
export default EmailChange;
