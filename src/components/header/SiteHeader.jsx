import { Link } from 'react-router-dom';
import './header.css';
import { HeartSVG, PlusSignSVG, UserSVG } from './svg.jsx';

const SiteHeader = () => {
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
                <Link
                    to="/profile/steared"
                    className="nav-element nav-link"
                    id="nav-steared"
                    title="Obserwowane ogłoszenia">
                    <HeartSVG />
                    <span>Obserwowane</span>
                </Link>
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
