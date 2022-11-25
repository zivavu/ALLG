import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../pages/authentication/UserContext';
import AdvertElement from './AdvertElement';
import './advertsSection.css';

function AdvertsSection({ getAdvertsHandler }) {
    const [advertsData, setAdvertsData] = useState([]);
    const [user, setUser] = useContext(UserContext);

    useEffect(() => {
        getAdvertsHandler(setAdvertsData, user);
    }, []);

    return (
        <section id="home-adverts-section">
            <div id="adverts-list-container">
                {advertsData.map((advert) => (
                    <AdvertElement key={advert.uid} advert={advert} />
                ))}
            </div>
        </section>
    );
}
export default AdvertsSection;
