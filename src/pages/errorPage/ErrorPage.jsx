import { Link, useParams } from 'react-router-dom';
import './error.css';

const ErrorPage = () => {
    const { error } = useParams();
    let errorMessage;
    if (!error) errorMessage = 'Ta strona nie istnieje';
    else errorMessage = error.split('-').join(' ');
    return (
        <div className="error-page">
            <div className="error-container">
                <div className="error-message">{errorMessage}</div>
                <Link to="/" className="error-home-link error-page-link">
                    Wróć do domu
                </Link>
                <a
                    href="https://github.com/zivavu/ALLG/issues/new"
                    target="_blank"
                    className="add-issue error-page-link">
                    Stwórz problem na GitHubi'e
                </a>
                <a href="mailto:zivavu@gmail.com" className="add-issue error-page-link">
                    Napisz do mnie bezpośrednio
                </a>
            </div>
        </div>
    );
};

export default ErrorPage;
