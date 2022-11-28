import { updateEmail } from 'firebase/auth';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../config/firebase-config';
import { UserContext } from '../authentication/UserContext';

function EmailChange({ emailWasChanged, setEmailWasChanged, setCurrentEmail }) {
    const navigate = useNavigate();

    const [user, setUser] = useContext(UserContext);
    const [userEmailInput, setUserEmailInput] = useState('');
    const [showChangeEmail, setShowChangeEmail] = useState(false);
    const [isEmailValid, setIsEmailValid] = useState(true);

    const updateUserEmail = () => {
        if (userEmailInput)
            try {
                updateEmail(auth.currentUser, userEmailInput).then(() => {
                    setShowChangeEmail(false);
                    setEmailWasChanged(true);
                    setCurrentEmail(userEmailInput);
                });
            } catch (error) {
                console.log(error.message);
            }
    };
    const validateEmail = () => {
        {
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmailInput)) {
                updateUserEmail();
            } else setIsEmailValid(false);
        }
    };

    useEffect(() => {
        if (user.recentylyLoggedIn) {
            setShowChangeEmail(true);
        }
    }, [user]);

    return (
        <div id="email-change-container">
            {!showChangeEmail ? (
                <button
                    className="account-manage-item"
                    disabled={emailWasChanged}
                    onClick={() => {
                        if (!user.recentylyLoggedIn) {
                            navigate('/re-authenticate');
                        } else setShowChangeEmail(true);
                    }}>
                    {emailWasChanged ? 'Sukces!' : 'Zmień e-mail'}
                </button>
            ) : (
                <>
                    <input
                        type="text"
                        id="email-change-input"
                        className="account-manage-item"
                        placeholder="Podaj nowy email"
                        value={userEmailInput}
                        onInput={(e) => {
                            setUserEmailInput(e.target.value);
                            setIsEmailValid(true);
                        }}
                    />
                    <button
                        className="account-manage-item data-change-confirm-btn"
                        id="email-change-confirm"
                        onClick={validateEmail}>
                        {isEmailValid ? 'Zatwierdź email' : 'Błędny email'}
                    </button>
                </>
            )}
        </div>
    );
}
export default EmailChange;
