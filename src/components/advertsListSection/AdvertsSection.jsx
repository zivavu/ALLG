import { useEffect, useState } from 'react';
import AdvertElement from './AdvertElement';
import './advertsSection.css';

function AdvertsSection({ getAdvertsHandler }) {
    const [advertsData, setAdvertsData] = useState([]);

    useEffect(() => {
        getAdvertsHandler(setAdvertsData);
    }, []);

    return (
        <section id="home-adverts-section">
            <div id="adverts-list-container">
                {advertsData.map((advert) => (
                    <AdvertElement key={advert.id} advert={advert} />
                ))}
            </div>
        </section>
    );
}
export default AdvertsSection;
