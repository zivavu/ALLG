import { signOut } from 'firebase/auth';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { PlusSignSVG, UserSVG } from '../../assets/svg.jsx';
import { auth } from '../../config/firebase-config';
import { UserContext } from '../../pages/authentication/UserContext';
import './header.css';

const SiteHeader = () => {
    const [user, setUser] = useContext(UserContext);
    const logoutUser = async () => {
        try {
            await signOut(auth).then(setUser({ uid: '', displayName: '' }));
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <header id="site-header">
            <Link to="/" id="header-logo" title="Ogłoszenia ALLG">
                <div id="logo">
                    <span className="first-logo-part">A</span>
                    <span className="first-logo-part l-letter-logo">L</span>
                    <span className=" first-logo-part l-letter-logo">L</span>
                    <span>G</span>
                </div>
            </Link>
            <nav id="header-nav">
                <button onClick={logoutUser}></button>
                <Link
                    to="/profile"
                    className="nav-element nav-link"
                    id="nav-profile"
                    title="Twoje Konto">
                    <UserSVG />
                    <span>Twoje konto</span>
                </Link>
                <Link to="/new-advert">
                    <button id="add-advertisements-button">
                        <span>Dodaj ogłoszenie</span>
                    </button>
                </Link>
            </nav>
        </header>
    );
};
export default SiteHeader;
