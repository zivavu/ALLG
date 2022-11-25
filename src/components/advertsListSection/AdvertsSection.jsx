import { useEffect, useState } from 'react';
import AdvertElement from './AdvertElement';
import './advertsSection.css';

function AdvertsSection({ getAdvertsHandler }) {
    const [advertsData, setAdvertsData] = useState([]);

    useEffect(() => {
        getAdvertsHandler(setAdvertsData);
    }, []);
    console.log(advertsData);

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
