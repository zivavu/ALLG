import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../pages/authentication/UserContext';
import AdvertElement from './AdvertElement';
import './advertsSection.css';

function AdvertsSection({ getAdvertsHandler, header }) {
    const [advertsData, setAdvertsData] = useState([]);
    const [user, setUser] = useContext(UserContext);

    useEffect(() => {
        getAdvertsHandler(setAdvertsData, user);
    }, []);

    return (
        <section id="home-adverts-section">
            <div id="adverts-list-container">
                <div className="adverts-list-header">
                    <h3>{advertsData[0] ? header : null}</h3>
                </div>
                <div id="adverts-list">
                    {advertsData.map((advert) => (
                        <AdvertElement key={advert.id} advert={advert} />
                    ))}
                </div>
            </div>
        </section>
    );
}
export default AdvertsSection;
